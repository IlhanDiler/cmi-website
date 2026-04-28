function minimizeGallerySectionGap() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) {
        return;
    }

    let nextSection = heroBg;
    while (nextSection && nextSection.nextElementSibling && nextSection.nextElementSibling.nodeType !== 1) {
        nextSection = nextSection.nextElementSibling;
    }
    nextSection = nextSection && nextSection.nextElementSibling;
    if (nextSection) {
        nextSection.style.marginTop = '0';
    }
}

function fitChristmetteImg() {
    const christmetteImg = document.querySelector('.christmette-img-tall');
    if (!christmetteImg) {
        return;
    }

    if (window.innerWidth <= 600) {
        christmetteImg.style.width = '100vw';
        christmetteImg.style.height = 'auto';
        christmetteImg.style.objectFit = 'cover';
        christmetteImg.style.display = 'block';
        christmetteImg.style.margin = '0 auto';
        return;
    }

    christmetteImg.style.width = '';
    christmetteImg.style.height = '';
    christmetteImg.style.objectFit = '';
    christmetteImg.style.display = '';
    christmetteImg.style.margin = '';
}

function initHeroLayout() {
    const heroBg = document.querySelector('.hero-bg');
    const christmetteImg = document.querySelector('.christmette-img-tall');

    if (!heroBg && !christmetteImg) {
        return;
    }

    minimizeGallerySectionGap();
    fitChristmetteImg();

    if (document.body.dataset.heroLayoutRuntimeInit === 'true') {
        return;
    }

    document.body.dataset.heroLayoutRuntimeInit = 'true';

    const syncHeroLayout = createAnimationFrameScheduler(function() {
        minimizeGallerySectionGap();
        fitChristmetteImg();
    });

    window.addEventListener('resize', syncHeroLayout);
}