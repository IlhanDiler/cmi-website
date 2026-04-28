function getCookieConsentTranslations() {
    if (!window.cookieConsentTranslations || typeof window.cookieConsentTranslations !== 'object') {
        return null;
    }

    return window.cookieConsentTranslations;
}

let cookieConsentMutationObserver = null;
let cookieConsentClosePersistenceInitialized = false;
let cookieConsentCheckboxBridgeInitialized = false;
let cookieConsentVendorLoaderRequested = false;

const cookieConsentDialogSelector = '#cookiescript_injected_wrapper, #cookiescript_injected_fsd, #cookiescript_injected, #cookiescript_fsd_wrapper';
const cookieConsentVendorScriptId = 'cookie-consent-vendor-script';
const cookieConsentVendorScriptUrl = 'https://cdn.cookie-script.com/s/e2339902bc70c6b4887f38770587d9d3.js';
const cookieConsentCookieName = 'CookieScriptConsent';
const cookieConsentPromptSessionKey = 'cookieConsentPromptShown';

function setCookieConsentText(selector, text) {
    document.querySelectorAll(selector).forEach(function(node) {
        node.textContent = text;
    });
}

function setCookieConsentHtml(selector, html, plainText) {
    document.querySelectorAll(selector).forEach(function(node) {
        node.innerHTML = html;
        if (node.hasAttribute('data-cs-i18n-read')) {
            node.setAttribute('data-cs-i18n-read', plainText || node.textContent.trim());
        }
    });
}

function setCookieConsentAttribute(selector, attribute, value) {
    document.querySelectorAll(selector).forEach(function(node) {
        node.setAttribute(attribute, value);
    });
}

function getCookieConsentCookieValue() {
    const cookiePrefix = cookieConsentCookieName + '=';
    const matchingCookie = document.cookie.split(';').map(function(part) {
        return part.trim();
    }).find(function(part) {
        return part.indexOf(cookiePrefix) === 0;
    });

    if (!matchingCookie) {
        return null;
    }

    return matchingCookie.slice(cookiePrefix.length);
}

function getPersistedCookieConsentState() {
    const cookieValue = getCookieConsentCookieValue();
    if (!cookieValue) {
        return null;
    }

    try {
        return JSON.parse(decodeURIComponent(cookieValue));
    } catch (error) {
        return null;
    }
}

function hasPersistedCookieConsentChoiceInCookie() {
    const persistedState = getPersistedCookieConsentState();
    return Boolean(persistedState && (persistedState.action === 'accept' || persistedState.action === 'reject'));
}

function shouldLoadCookieConsentVendor() {
    if (window.CookieScript || document.getElementById(cookieConsentVendorScriptId)) {
        return false;
    }

    if (hasPersistedCookieConsentChoiceInCookie()) {
        return true;
    }

    try {
        if (window.sessionStorage.getItem(cookieConsentPromptSessionKey) === '1') {
            return false;
        }

        window.sessionStorage.setItem(cookieConsentPromptSessionKey, '1');
        return true;
    } catch (error) {
        return true;
    }
}

function ensureCookieConsentVendorLoaded() {
    if (cookieConsentVendorLoaderRequested || !shouldLoadCookieConsentVendor()) {
        return;
    }

    const scriptParent = document.body || document.head || document.documentElement;
    if (!scriptParent) {
        return;
    }

    const vendorScript = document.createElement('script');
    vendorScript.id = cookieConsentVendorScriptId;
    vendorScript.type = 'text/javascript';
    vendorScript.charset = 'UTF-8';
    vendorScript.src = cookieConsentVendorScriptUrl;
    vendorScript.addEventListener('load', scheduleCookieConsentLanguageUpdate);

    scriptParent.appendChild(vendorScript);
    cookieConsentVendorLoaderRequested = true;
}

function hasPersistedCookieConsentChoice() {
    if (!window.CookieScript || !window.CookieScript.instance || typeof window.CookieScript.instance.currentState !== 'function') {
        return hasPersistedCookieConsentChoiceInCookie();
    }

    const state = window.CookieScript.instance.currentState();
    return Boolean(state && (state.action === 'accept' || state.action === 'reject'));
}

function persistCookieConsentOnClose(event) {
    if (!(event.target instanceof Element)) {
        return;
    }

    if (!event.target.closest('#cookiescript_close') || hasPersistedCookieConsentChoice()) {
        return;
    }

    if (!window.CookieScript || !window.CookieScript.instance) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation();
    }

    if (typeof window.CookieScript.instance.rejectAllAction === 'function') {
        window.CookieScript.instance.rejectAllAction();
    }
}

function initCookieConsentClosePersistence() {
    if (cookieConsentClosePersistenceInitialized) {
        return;
    }

    document.addEventListener('click', persistCookieConsentOnClose, true);
    cookieConsentClosePersistenceInitialized = true;
}

function bridgeCookieConsentCheckboxClick(event) {
    if (!(event.target instanceof Element)) {
        return;
    }

    if (event.target.closest('label[for^="cookiescript_category_"]') ||
        event.target.closest('.cookiescript_checkbox_input')) {
        return;
    }

    const checkboxShell = event.target.closest('.cookiescript_checkbox .mdc-checkbox');
    if (!checkboxShell) {
        return;
    }

    const input = checkboxShell.querySelector('.cookiescript_checkbox_input');
    if (!(input instanceof HTMLInputElement) || input.disabled) {
        return;
    }

    event.preventDefault();
    input.click();
    input.focus();
}

function initCookieConsentCheckboxBridge() {
    if (cookieConsentCheckboxBridgeInitialized) {
        return;
    }

    document.addEventListener('click', bridgeCookieConsentCheckboxClick, true);
    cookieConsentCheckboxBridgeInitialized = true;
}

function updateCookieConsentLanguage() {
    if (!document.getElementById('cookiescript_injected_wrapper') &&
        !document.getElementById('cookiescript_injected_fsd') &&
        !document.getElementById('cookiescript_badge')) {
        return;
    }

    const translations = getCookieConsentTranslations();
    if (!translations) {
        return;
    }

    const language = getCurrentSiteLanguage();
    const labels = translations[language] || translations.de;

    if (!labels) {
        return;
    }

    setCookieConsentAttribute(cookieConsentDialogSelector, 'aria-label', labels.dialogLabel);
    setCookieConsentAttribute('#cookiescript_badge', 'aria-label', labels.badgeLabel);
    setCookieConsentAttribute('#cookiescript_close', 'aria-label', labels.closeLabel);

    setCookieConsentText('#cookiescript_header, .cookiescript_fsd_title', labels.header);
    setCookieConsentHtml('#cookiescript_description [data-cs-desc-box="true"], .cookiescript_fsd_description [data-cs-desc-box="true"]', labels.descriptionHtml, labels.descriptionText);

    setCookieConsentText('label[for="cookiescript_category_strict"] .cookiescript_checkbox_text, [data-fsd-category="strict"] .cookiescript_fsd__category_name', labels.categories.strict);
    setCookieConsentText('label[for="cookiescript_category_performance"] .cookiescript_checkbox_text, [data-fsd-category="performance"] .cookiescript_fsd__category_name', labels.categories.performance);
    setCookieConsentText('label[for="cookiescript_category_targeting"] .cookiescript_checkbox_text, [data-fsd-category="targeting"] .cookiescript_fsd__category_name', labels.categories.targeting);
    setCookieConsentText('label[for="cookiescript_category_functionality"] .cookiescript_checkbox_text, [data-fsd-category="functionality"] .cookiescript_fsd__category_name', labels.categories.functionality);

    setCookieConsentText('[data-fsd-category="strict"] .cookiescript_category_description', labels.categoryDescriptions.strict);
    setCookieConsentText('[data-fsd-category="performance"] .cookiescript_category_description', labels.categoryDescriptions.performance);
    setCookieConsentText('[data-fsd-category="targeting"] .cookiescript_category_description', labels.categoryDescriptions.targeting);
    setCookieConsentText('[data-fsd-category="functionality"] .cookiescript_category_description', labels.categoryDescriptions.functionality);

    setCookieConsentText('#cookiescript_save', labels.buttons.save);
    setCookieConsentText('#cookiescript_accept', labels.buttons.accept);
    setCookieConsentText('#cookiescript_reject', labels.buttons.reject);

    setCookieConsentText('span[data-cs-show-title="cookie-script"]', labels.details.show);
    setCookieConsentText('span[data-cs-hide-title="cookie-script"]', labels.details.hide);
    setCookieConsentText('[data-cs-cookies-open-text]', labels.details.openCookies);
    setCookieConsentText('[data-cs-cookies-close-text]', labels.details.closeCookies);
    setCookieConsentText('#cookiescript_badgetext', labels.details.badge);

    setCookieConsentText('#cookiescript_declaration', labels.tabs.declaration);
    setCookieConsentText('#cookiescript_aboutcookies', labels.tabs.about);

    setCookieConsentText('th[data-cs-report-name="true"]', labels.table.name);
    setCookieConsentText('th[data-cs-report-expiration="true"]', labels.table.expiration);
    setCookieConsentText('th[data-cs-report-description="true"]', labels.table.description);
    setCookieConsentText('[data-cs-report-vendor="true"]', labels.table.provider);
    setCookieConsentText('[data-cs-report-domain="true"]', labels.table.domain);

    setCookieConsentHtml('#cookiescript_aboutwrap > span[data-cs-i18n-text]', labels.about.introHtml, labels.about.introText);
    setCookieConsentHtml('#cookiescript_aboutwrap > div > span[data-cs-i18n-text]', labels.about.adsHtml);
    setCookieConsentText('[data-cs-consent-key-box="cookie-script"] > span[data-cs-i18n-text]', labels.about.consentId);

    if (typeof syncStaticContentAccessibility === 'function') {
        syncStaticContentAccessibility();
    }
}

const requestCookieConsentLanguageUpdate = createAnimationFrameScheduler(updateCookieConsentLanguage);

function scheduleCookieConsentLanguageUpdate() {
    requestCookieConsentLanguageUpdate();
}

function initCookieConsentLanguageSync() {
    ensureCookieConsentVendorLoaded();
    initCookieConsentClosePersistence();
    initCookieConsentCheckboxBridge();

    if (cookieConsentMutationObserver || !document.body) {
        scheduleCookieConsentLanguageUpdate();
        return;
    }

    cookieConsentMutationObserver = new MutationObserver(function(mutations) {
        const hasCookieConsentMutation = mutations.some(function(mutation) {
            return Array.from(mutation.addedNodes).some(function(node) {
                if (!(node instanceof HTMLElement)) {
                    return false;
                }

                return node.id === 'cookiescript_injected_wrapper' ||
                    node.id === 'cookiescript_injected_fsd' ||
                    node.id === 'cookiescript_badge' ||
                    Boolean(node.querySelector('#cookiescript_injected_wrapper, #cookiescript_injected_fsd, #cookiescript_badge'));
            });
        });

        if (hasCookieConsentMutation) {
            scheduleCookieConsentLanguageUpdate();
        }
    });

    cookieConsentMutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('CookieScriptLoaded', scheduleCookieConsentLanguageUpdate);
    window.addEventListener('load', scheduleCookieConsentLanguageUpdate);
    scheduleCookieConsentLanguageUpdate();
}