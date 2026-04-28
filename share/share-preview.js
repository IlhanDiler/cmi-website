const COPY_FEEDBACK_DURATION_MS = 2200;
const DEFAULT_REDIRECT_DELAY_MS = 8000;

function fallbackCopyText(value) {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "readonly");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);

    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (!copied) {
        throw new Error("Copy command failed");
    }
}

async function copyTextToClipboard(value) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(value);
        return;
    }

    fallbackCopyText(value);
}

function setButtonLabel(button, label) {
    button.textContent = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
}

function setStatus(statusElement, message, state) {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message || "";

    if (state) {
        statusElement.dataset.state = state;
        return;
    }

    delete statusElement.dataset.state;
}

function formatRedirectHint(template, secondsRemaining) {
    return template.replace(/\{seconds\}/g, String(secondsRemaining));
}

function bindRedirectBehavior(container) {
    const redirectUrl = container.dataset.shareRedirectUrl;
    if (!redirectUrl) {
        return;
    }

    const redirectDelaySeconds = Number.parseInt(container.dataset.shareRedirectDelay || "", 10);
    const redirectDelayMs = Number.isFinite(redirectDelaySeconds) && redirectDelaySeconds > 0
        ? redirectDelaySeconds * 1000
        : DEFAULT_REDIRECT_DELAY_MS;
    const redirectTemplate = container.dataset.shareRedirectTemplate || "Automatic redirect in {seconds} seconds.";
    const redirectPausedLabel = container.dataset.shareRedirectPaused || "Redirect paused.";
    const hintElement = container.querySelector("[data-share-redirect-hint]");
    let redirectPaused = false;
    let redirectTimerId = null;
    let countdownTimerId = null;
    let deadline = Date.now() + redirectDelayMs;

    const updateCountdown = () => {
        if (!hintElement || redirectPaused) {
            return;
        }

        const remainingMs = Math.max(0, deadline - Date.now());
        const remainingSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
        hintElement.textContent = formatRedirectHint(redirectTemplate, remainingSeconds);
    };

    const pauseRedirect = () => {
        if (redirectPaused) {
            return;
        }

        redirectPaused = true;
        window.clearTimeout(redirectTimerId);
        window.clearInterval(countdownTimerId);
        if (hintElement) {
            hintElement.textContent = redirectPausedLabel;
        }
    };

    redirectTimerId = window.setTimeout(() => {
        window.location.href = redirectUrl;
    }, redirectDelayMs);

    countdownTimerId = window.setInterval(updateCountdown, 250);
    updateCountdown();

    container.addEventListener("pointerdown", pauseRedirect, { once: true });
    container.addEventListener("keydown", pauseRedirect, { once: true });
    container.addEventListener("focusin", pauseRedirect, { once: true });

    container.querySelectorAll("[data-share-copy-url]").forEach((button) => {
        button.addEventListener("click", pauseRedirect, { once: true });
    });
}

function bindCopyButton(button) {
    const defaultLabel = button.dataset.copyDefaultLabel || button.textContent.trim() || "Copy link";
    const successLabel = button.dataset.copySuccessLabel || defaultLabel;
    const failureMessage = button.dataset.copyFailedMessage || "Copying failed. Please copy the link manually.";
    const shareUrl = button.dataset.shareCopyUrl || window.location.href;
    const statusElement = button.parentElement?.querySelector("[data-share-copy-status]") || null;

    setButtonLabel(button, defaultLabel);

    button.addEventListener("click", async () => {
        window.clearTimeout(button._copyFeedbackTimerId);

        try {
            await copyTextToClipboard(shareUrl);
            setButtonLabel(button, successLabel);
            setStatus(statusElement, successLabel, "success");
        } catch (error) {
            setButtonLabel(button, defaultLabel);
            setStatus(statusElement, failureMessage, "error");
        }

        button._copyFeedbackTimerId = window.setTimeout(() => {
            setButtonLabel(button, defaultLabel);
            setStatus(statusElement, "", "");
        }, COPY_FEEDBACK_DURATION_MS);
    });
}

document.querySelectorAll("[data-share-redirect-url]").forEach(bindRedirectBehavior);
document.querySelectorAll("[data-share-copy-url]").forEach(bindCopyButton);