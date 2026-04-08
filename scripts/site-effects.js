function revealOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    const observer = new window.IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(function(element) {
        observer.observe(element);
    });
}

function initShapeParallax() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) {
        return;
    }

    if (document.body.dataset.shapeParallaxInit === 'true') {
        return;
    }

    document.body.dataset.shapeParallaxInit = 'true';

    const syncShapeParallax = createAnimationFrameScheduler(function() {
        const scrolled = getViewportScrollTop();
        shapes.forEach(function(shape, index) {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    syncShapeParallax();
    window.addEventListener('scroll', syncShapeParallax, { passive: true });
}

function updateYearsPassed() {
    const yearsPassedEl = document.getElementById('yearsPassed');
    if (!yearsPassedEl) {
        return;
    }

    yearsPassedEl.textContent = new Date().getFullYear() - 1981;
}