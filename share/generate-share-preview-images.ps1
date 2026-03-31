Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Web

$repoRoot = Split-Path -Parent $PSScriptRoot
$shareDir = $PSScriptRoot
$outputDir = Join-Path $shareDir 'preview-images'
$statusOutputDir = Join-Path $shareDir 'status-images'

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
New-Item -ItemType Directory -Path $statusOutputDir -Force | Out-Null

function Get-RegexValue {
    param(
        [string]$Content,
        [string]$Pattern
    )

    $match = [regex]::Match($Content, $Pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($match.Success) {
        return [System.Web.HttpUtility]::HtmlDecode($match.Groups[1].Value.Trim())
    }

    return ''
}

function Get-PlainText {
    param([string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return ''
    }

    $withoutTags = [regex]::Replace($Value, '<[^>]+>', ' ')
    $decoded = [System.Web.HttpUtility]::HtmlDecode($withoutTags)
    return [regex]::Replace($decoded, '\s+', ' ').Trim()
}

function Convert-UrlToLocalPath {
    param([string]$Url)

    $uri = [Uri]$Url
    $relativePath = [Uri]::UnescapeDataString($uri.AbsolutePath.TrimStart('/')).Replace('/', '\')
    return Join-Path $repoRoot $relativePath
}

function New-RoundedRectanglePath {
    param(
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Height,
        [float]$Radius
    )

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $Radius * 2

    $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
    $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
    $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    return $path
}

function Get-WrappedLines {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [System.Drawing.Font]$Font,
        [float]$MaxWidth,
        [int]$MaxLines
    )

    $words = $Text -split '\s+'
    $lines = New-Object System.Collections.Generic.List[string]
    $current = ''

    foreach ($word in $words) {
        if ([string]::IsNullOrWhiteSpace($word)) {
            continue
        }

        $candidate = if ([string]::IsNullOrWhiteSpace($current)) { $word } else { "$current $word" }
        $size = $Graphics.MeasureString($candidate, $Font)

        if ($size.Width -le $MaxWidth) {
            $current = $candidate
            continue
        }

        if (-not [string]::IsNullOrWhiteSpace($current)) {
            $lines.Add($current)
            $current = $word
        }

        if ($lines.Count -ge $MaxLines) {
            break
        }
    }

    if ($lines.Count -lt $MaxLines -and -not [string]::IsNullOrWhiteSpace($current)) {
        $lines.Add($current)
    }

    if ($lines.Count -gt $MaxLines) {
        $lines = [System.Collections.Generic.List[string]]($lines.GetRange(0, $MaxLines))
    }

    if ($lines.Count -eq $MaxLines) {
        $remainingWords = $words.Count - (($lines -join ' ').Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries).Count)
        if ($remainingWords -gt 0) {
            $lastLine = $lines[$MaxLines - 1]
            while ($lastLine.Length -gt 3 -and $Graphics.MeasureString("$lastLine...", $Font).Width -gt $MaxWidth) {
                $lastLine = $lastLine.Substring(0, $lastLine.Length - 1).TrimEnd()
            }
            $lines[$MaxLines - 1] = "$lastLine..."
        }
    }

    return $lines
}

function Draw-TextLines {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string[]]$Lines,
        [System.Drawing.Font]$Font,
        [System.Drawing.Brush]$Brush,
        [float]$X,
        [float]$Y,
        [float]$LineHeight
    )

    for ($index = 0; $index -lt $Lines.Count; $index++) {
        $Graphics.DrawString($Lines[$index], $Font, $Brush, $X, $Y + ($index * $LineHeight))
    }
}

function New-CanvasGraphics {
    param(
        [int]$Width,
        [int]$Height
    )

    $bitmap = New-Object System.Drawing.Bitmap $Width, $Height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    return @{
        Bitmap = $bitmap
        Graphics = $graphics
    }
}

function Draw-ContainedImagePanel {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$SourceImage,
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Height,
        [float]$Radius,
        [float]$Inset,
        [System.Drawing.Color]$StartColor,
        [System.Drawing.Color]$EndColor,
        [System.Drawing.Color]$MatColor,
        [System.Drawing.Color]$BorderColor,
        [float]$BorderWidth,
        [System.Drawing.Color]$OverlayTopColor,
        [System.Drawing.Color]$OverlayBottomColor
    )

    $panelPath = New-RoundedRectanglePath -X $X -Y $Y -Width $Width -Height $Height -Radius $Radius
    $Graphics.SetClip($panelPath)

    $destinationRect = New-Object System.Drawing.RectangleF $X, $Y, $Width, $Height
    $panelBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point([int]$X, [int]$Y)),
        (New-Object System.Drawing.Point([int]($X + $Width), [int]($Y + $Height))),
        $StartColor,
        $EndColor
    )
    $Graphics.FillRectangle($panelBrush, $destinationRect)

    $coverScale = [Math]::Max($destinationRect.Width / $SourceImage.Width, $destinationRect.Height / $SourceImage.Height)
    $coverWidth = $SourceImage.Width * $coverScale
    $coverHeight = $SourceImage.Height * $coverScale
    $coverOffsetX = $destinationRect.X + (($destinationRect.Width - $coverWidth) / 2)
    $coverOffsetY = $destinationRect.Y + (($destinationRect.Height - $coverHeight) / 2)

    $backgroundAttributes = New-Object System.Drawing.Imaging.ImageAttributes
    $backgroundMatrix = New-Object System.Drawing.Imaging.ColorMatrix
    $backgroundMatrix.Matrix00 = 0.75
    $backgroundMatrix.Matrix11 = 0.75
    $backgroundMatrix.Matrix22 = 0.75
    $backgroundMatrix.Matrix33 = 0.25
    $backgroundAttributes.SetColorMatrix($backgroundMatrix)

    $Graphics.DrawImage(
        $SourceImage,
        [System.Drawing.Rectangle]::Round((New-Object System.Drawing.RectangleF $coverOffsetX, $coverOffsetY, $coverWidth, $coverHeight)),
        0,
        0,
        $SourceImage.Width,
        $SourceImage.Height,
        [System.Drawing.GraphicsUnit]::Pixel,
        $backgroundAttributes
    )

    $fitScale = [Math]::Min((($destinationRect.Width - ($Inset * 2)) / $SourceImage.Width), (($destinationRect.Height - ($Inset * 2)) / $SourceImage.Height))
    $fitWidth = $SourceImage.Width * $fitScale
    $fitHeight = $SourceImage.Height * $fitScale
    $fitOffsetX = $destinationRect.X + (($destinationRect.Width - $fitWidth) / 2)
    $fitOffsetY = $destinationRect.Y + (($destinationRect.Height - $fitHeight) / 2)

    $matBrush = New-Object System.Drawing.SolidBrush $MatColor
    $Graphics.FillRectangle($matBrush, $fitOffsetX - 10, $fitOffsetY - 10, $fitWidth + 20, $fitHeight + 20)
    $Graphics.DrawImage($SourceImage, $fitOffsetX, $fitOffsetY, $fitWidth, $fitHeight)

    $overlayBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point([int]$X, [int]$Y)),
        (New-Object System.Drawing.Point([int]$X, [int]($Y + $Height))),
        $OverlayTopColor,
        $OverlayBottomColor
    )
    $Graphics.FillRectangle($overlayBrush, $X, $Y, $Width, $Height)
    $Graphics.ResetClip()

    $borderPen = New-Object System.Drawing.Pen ($BorderColor, $BorderWidth)
    $Graphics.DrawPath($borderPen, $panelPath)

    return @{
        Path = $panelPath
        PanelBrush = $panelBrush
        BackgroundAttributes = $backgroundAttributes
        MatBrush = $matBrush
        OverlayBrush = $overlayBrush
        BorderPen = $borderPen
    }
}

function New-ShareLandscapeImage {
    param(
        [string]$OutputPath,
        [System.Drawing.Image]$SourceImage,
        [string]$Title,
        [string]$Meta,
        [string]$Description
    )

    $canvas = New-CanvasGraphics -Width 1200 -Height 630
    $bitmap = $canvas.Bitmap
    $graphics = $canvas.Graphics

    $backgroundBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point 0, 0),
        (New-Object System.Drawing.Point 1200, 630),
        ([System.Drawing.Color]::FromArgb(248, 244, 235)),
        ([System.Drawing.Color]::FromArgb(226, 238, 230))
    )
    $graphics.FillRectangle($backgroundBrush, 0, 0, 1200, 630)

    $accentBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point 0, 0),
        (New-Object System.Drawing.Point 0, 630),
        ([System.Drawing.Color]::FromArgb(16, 69, 74)),
        ([System.Drawing.Color]::FromArgb(28, 103, 92))
    )
    $accentPath = New-RoundedRectanglePath -X 36 -Y 34 -Width 660 -Height 562 -Radius 34
    $graphics.FillPath($accentBrush, $accentPath)

    $photoShadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26, 0, 0, 0))
    $graphics.FillEllipse($photoShadowBrush, 764, 534, 320, 42)

    $photoElements = Draw-ContainedImagePanel `
        -Graphics $graphics `
        -SourceImage $SourceImage `
        -X 736 -Y 56 -Width 412 -Height 518 -Radius 28 -Inset 22 `
        -StartColor ([System.Drawing.Color]::FromArgb(241, 247, 243)) `
        -EndColor ([System.Drawing.Color]::FromArgb(221, 232, 225)) `
        -MatColor ([System.Drawing.Color]::FromArgb(168, 255, 255, 255)) `
        -BorderColor ([System.Drawing.Color]::FromArgb(80, 255, 255, 255)) `
        -BorderWidth 2 `
        -OverlayTopColor ([System.Drawing.Color]::FromArgb(8, 255, 255, 255)) `
        -OverlayBottomColor ([System.Drawing.Color]::FromArgb(48, 9, 33, 37))

    $tagBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(235, 227, 244, 236))
    $tagPath = New-RoundedRectanglePath -X 76 -Y 78 -Width 214 -Height 42 -Radius 21
    $graphics.FillPath($tagBrush, $tagPath)

    $tagFont = New-Object System.Drawing.Font('Segoe UI Semibold', 14, [System.Drawing.FontStyle]::Regular)
    $graphics.DrawString('CMI OCHSENFURT', $tagFont, [System.Drawing.Brushes]::White, 96, 88)

    $titleFont = New-Object System.Drawing.Font('Georgia', 30, [System.Drawing.FontStyle]::Bold)
    $metaFont = New-Object System.Drawing.Font('Segoe UI Semibold', 16, [System.Drawing.FontStyle]::Regular)
    $descriptionFont = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)
    $footerFont = New-Object System.Drawing.Font('Segoe UI', 14, [System.Drawing.FontStyle]::Regular)

    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(244, 255, 255, 255))
    $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 225, 243, 239))
    $accentTextBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 187, 221, 209))

    $titleLines = Get-WrappedLines -Graphics $graphics -Text $Title -Font $titleFont -MaxWidth 560 -MaxLines 4
    Draw-TextLines -Graphics $graphics -Lines $titleLines -Font $titleFont -Brush $whiteBrush -X 76 -Y 150 -LineHeight 44

    $metaStartY = 150 + ($titleLines.Count * 44) + 24
    $metaLines = Get-WrappedLines -Graphics $graphics -Text $Meta -Font $metaFont -MaxWidth 540 -MaxLines 2
    Draw-TextLines -Graphics $graphics -Lines $metaLines -Font $metaFont -Brush $accentTextBrush -X 76 -Y $metaStartY -LineHeight 28

    $descriptionStartY = $metaStartY + ($metaLines.Count * 28) + 24
    $descriptionLines = Get-WrappedLines -Graphics $graphics -Text $Description -Font $descriptionFont -MaxWidth 560 -MaxLines 4
    Draw-TextLines -Graphics $graphics -Lines $descriptionLines -Font $descriptionFont -Brush $mutedBrush -X 76 -Y $descriptionStartY -LineHeight 31

    $footerPath = New-RoundedRectanglePath -X 76 -Y 512 -Width 282 -Height 44 -Radius 22
    $footerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(34, 255, 255, 255))
    $graphics.FillPath($footerBrush, $footerPath)
    $graphics.DrawString('www.cmi-ochsenfurt.de', $footerFont, $whiteBrush, 98, 523)

    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $tagFont.Dispose()
    $titleFont.Dispose()
    $metaFont.Dispose()
    $descriptionFont.Dispose()
    $footerFont.Dispose()
    $whiteBrush.Dispose()
    $mutedBrush.Dispose()
    $accentTextBrush.Dispose()
    $tagBrush.Dispose()
    $footerBrush.Dispose()
    $backgroundBrush.Dispose()
    $accentBrush.Dispose()
    $photoShadowBrush.Dispose()
    $photoElements.MatBrush.Dispose()
    $photoElements.PanelBrush.Dispose()
    $photoElements.BackgroundAttributes.Dispose()
    $photoElements.OverlayBrush.Dispose()
    $photoElements.BorderPen.Dispose()
    $accentPath.Dispose()
    $photoElements.Path.Dispose()
    $tagPath.Dispose()
    $footerPath.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
}

function New-ShareStatusImage {
    param(
        [string]$OutputPath,
        [System.Drawing.Image]$SourceImage,
        [string]$Title,
        [string]$Meta,
        [string]$Description
    )

    $canvas = New-CanvasGraphics -Width 1080 -Height 1920
    $bitmap = $canvas.Bitmap
    $graphics = $canvas.Graphics

    $backgroundBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point 0, 0),
        (New-Object System.Drawing.Point 1080, 1920),
        ([System.Drawing.Color]::FromArgb(247, 242, 232)),
        ([System.Drawing.Color]::FromArgb(214, 231, 222))
    )
    $graphics.FillRectangle($backgroundBrush, 0, 0, 1080, 1920)

    $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 19, 103, 92))
    $graphics.FillEllipse($glowBrush, -180, -60, 720, 720)
    $graphics.FillEllipse($glowBrush, 640, 1350, 520, 520)

    $photoShadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(32, 0, 0, 0))
    $graphics.FillEllipse($photoShadowBrush, 170, 1050, 740, 70)

    $photoElements = Draw-ContainedImagePanel `
        -Graphics $graphics `
        -SourceImage $SourceImage `
        -X 72 -Y 118 -Width 936 -Height 980 -Radius 54 -Inset 34 `
        -StartColor ([System.Drawing.Color]::FromArgb(240, 247, 242)) `
        -EndColor ([System.Drawing.Color]::FromArgb(221, 233, 225)) `
        -MatColor ([System.Drawing.Color]::FromArgb(182, 255, 255, 255)) `
        -BorderColor ([System.Drawing.Color]::FromArgb(92, 255, 255, 255)) `
        -BorderWidth 3 `
        -OverlayTopColor ([System.Drawing.Color]::FromArgb(10, 255, 255, 255)) `
        -OverlayBottomColor ([System.Drawing.Color]::FromArgb(56, 9, 33, 37))

    $textCardBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point 72, 1138),
        (New-Object System.Drawing.Point 72, 1808),
        ([System.Drawing.Color]::FromArgb(18, 74, 79)),
        ([System.Drawing.Color]::FromArgb(23, 101, 91))
    )
    $textCardPath = New-RoundedRectanglePath -X 72 -Y 1138 -Width 936 -Height 670 -Radius 54
    $graphics.FillPath($textCardBrush, $textCardPath)

    $tagBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(230, 227, 244, 236))
    $tagPath = New-RoundedRectanglePath -X 126 -Y 1196 -Width 290 -Height 62 -Radius 31
    $graphics.FillPath($tagBrush, $tagPath)

    $tagFont = New-Object System.Drawing.Font('Segoe UI Semibold', 24, [System.Drawing.FontStyle]::Regular)
    $graphics.DrawString('CMI OCHSENFURT', $tagFont, [System.Drawing.Brushes]::White, 156, 1211)

    $titleFont = New-Object System.Drawing.Font('Georgia', 34, [System.Drawing.FontStyle]::Bold)
    $metaFont = New-Object System.Drawing.Font('Segoe UI Semibold', 24, [System.Drawing.FontStyle]::Regular)
    $descriptionFont = New-Object System.Drawing.Font('Segoe UI', 28, [System.Drawing.FontStyle]::Regular)
    $footerFont = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Regular)

    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(244, 255, 255, 255))
    $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 225, 243, 239))
    $accentTextBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 187, 221, 209))

    $titleLines = Get-WrappedLines -Graphics $graphics -Text $Title -Font $titleFont -MaxWidth 800 -MaxLines 5
    Draw-TextLines -Graphics $graphics -Lines $titleLines -Font $titleFont -Brush $whiteBrush -X 126 -Y 1298 -LineHeight 54

    $metaStartY = 1298 + ($titleLines.Count * 54) + 26
    $metaLines = Get-WrappedLines -Graphics $graphics -Text $Meta -Font $metaFont -MaxWidth 780 -MaxLines 2
    Draw-TextLines -Graphics $graphics -Lines $metaLines -Font $metaFont -Brush $accentTextBrush -X 126 -Y $metaStartY -LineHeight 38

    $descriptionStartY = $metaStartY + ($metaLines.Count * 38) + 28
    $descriptionLines = Get-WrappedLines -Graphics $graphics -Text $Description -Font $descriptionFont -MaxWidth 794 -MaxLines 5
    Draw-TextLines -Graphics $graphics -Lines $descriptionLines -Font $descriptionFont -Brush $mutedBrush -X 126 -Y $descriptionStartY -LineHeight 44

    $footerPath = New-RoundedRectanglePath -X 126 -Y 1712 -Width 420 -Height 62 -Radius 31
    $footerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(34, 255, 255, 255))
    $graphics.FillPath($footerBrush, $footerPath)
    $graphics.DrawString('www.cmi-ochsenfurt.de', $footerFont, $whiteBrush, 157, 1729)

    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $tagFont.Dispose()
    $titleFont.Dispose()
    $metaFont.Dispose()
    $descriptionFont.Dispose()
    $footerFont.Dispose()
    $whiteBrush.Dispose()
    $mutedBrush.Dispose()
    $accentTextBrush.Dispose()
    $tagBrush.Dispose()
    $footerBrush.Dispose()
    $backgroundBrush.Dispose()
    $glowBrush.Dispose()
    $photoShadowBrush.Dispose()
    $textCardBrush.Dispose()
    $photoElements.MatBrush.Dispose()
    $photoElements.PanelBrush.Dispose()
    $photoElements.BackgroundAttributes.Dispose()
    $photoElements.OverlayBrush.Dispose()
    $photoElements.BorderPen.Dispose()
    $photoElements.Path.Dispose()
    $textCardPath.Dispose()
    $tagPath.Dispose()
    $footerPath.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
}

Get-ChildItem (Join-Path $shareDir '*.html') |
    Where-Object { $_.Name -ne 'instagram-export.html' } |
    Sort-Object Name |
    ForEach-Object {
        $html = Get-Content $_.FullName -Raw -Encoding UTF8

        $title = Get-RegexValue -Content $html -Pattern '<meta property="og:title" content="([^"]+)"'
        $description = Get-RegexValue -Content $html -Pattern '<meta(?: name="description"| property="og:description") content="([^"]+)"'
        $meta = Get-PlainText (Get-RegexValue -Content $html -Pattern '<p class="share-card__meta">(.*?)</p>')
        $heroUrl = Get-RegexValue -Content $html -Pattern '<img class="share-card__hero" src="([^"]+)"'

        if ([string]::IsNullOrWhiteSpace($heroUrl)) {
            $heroUrl = Get-RegexValue -Content $html -Pattern '<meta property="og:image" content="([^"]+)"'
        }

        $heroPath = Convert-UrlToLocalPath -Url $heroUrl
        if (-not (Test-Path $heroPath)) {
            Write-Warning "Bild nicht gefunden fuer $($_.Name): $heroPath"
            return
        }

        $outputFileName = '{0}-social.png' -f $_.BaseName
        $outputPath = Join-Path $outputDir $outputFileName

        $statusOutputFileName = '{0}-status.png' -f $_.BaseName
        $statusOutputPath = Join-Path $statusOutputDir $statusOutputFileName

        $sourceImage = [System.Drawing.Image]::FromFile($heroPath)

        try {
            New-ShareLandscapeImage -OutputPath $outputPath -SourceImage $sourceImage -Title $title -Meta $meta -Description $description
            New-ShareStatusImage -OutputPath $statusOutputPath -SourceImage $sourceImage -Title $title -Meta $meta -Description $description
        }
        finally {
            $sourceImage.Dispose()
        }

        Write-Output "Erzeugt: $outputFileName"
        Write-Output "Erzeugt: $statusOutputFileName"
    }