function getSiteLanguageFallbackOrder(lang) {
    const fallbackOrder = [lang];

    if (lang === 'ln') {
        fallbackOrder.push('fr');
    }

    if (lang !== 'en') {
        fallbackOrder.push('en');
    }

    if (lang !== 'de') {
        fallbackOrder.push('de');
    }

    if (lang !== 'it') {
        fallbackOrder.push('it');
    }

    return fallbackOrder;
}

function getLanguageVariantSignature(element) {
    const normalizedClassName = Array.from(element.classList)
        .filter(function(className) {
            return !className.includes('--');
        })
        .sort()
        .join(' ');

    return [element.tagName, normalizedClassName].join('|');
}

function syncLangAttributesFromDataLang() {
    document.querySelectorAll('[data-lang]').forEach(function(element) {
        const elementLanguage = element.getAttribute('data-lang');

        if (!isSupportedSiteLanguage(elementLanguage)) {
            return;
        }

        if (element.getAttribute('lang') !== elementLanguage) {
            element.setAttribute('lang', elementLanguage);
        }
    });
}

function applyLanguageVariantsForParent(parent, fallbackOrder) {
    let currentGroup = [];
    let currentSignature = '';
    let currentLanguages = new Set();

    function flushCurrentGroup() {
        if (!currentGroup.length) {
            return;
        }

        const chosenVariant = fallbackOrder
            .map(function(language) {
                return currentGroup.find(function(candidate) {
                    return candidate.getAttribute('data-lang') === language;
                });
            })
            .find(Boolean) || currentGroup[0];

        currentGroup.forEach(function(candidate) {
            const isChosenVariant = candidate === chosenVariant;

            candidate.hidden = !isChosenVariant;
            candidate.style.display = isChosenVariant ? '' : 'none';
            candidate.setAttribute('aria-hidden', String(!isChosenVariant));
        });

        currentGroup = [];
        currentSignature = '';
        currentLanguages = new Set();
    }

    Array.from(parent.children).forEach(function(child) {
        if (!child.hasAttribute('data-lang')) {
            return;
        }

        const childLanguage = child.getAttribute('data-lang');
        const childSignature = getLanguageVariantSignature(child);

        if (currentGroup.length && (childSignature !== currentSignature || currentLanguages.has(childLanguage))) {
            flushCurrentGroup();
        }

        currentGroup.push(child);
        currentSignature = childSignature;
        currentLanguages.add(childLanguage);
    });

    flushCurrentGroup();
}