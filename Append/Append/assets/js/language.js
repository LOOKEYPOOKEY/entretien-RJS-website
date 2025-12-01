// language.js - improved: cache original English text, apply French translations, restore English

(function () {
    // Cache of original (English) HTML for keys so we can restore when switching back
    const originalContent = {};

    // Show/hide the bilingual info boxes (keeps collapsible state closed when switching)
    function showInfoForLang(lang) {
        const enBox = document.getElementById('info-en');
        const frBox = document.getElementById('info-fr');
        const enContent = document.getElementById('infoContentEn');
        const frContent = document.getElementById('infoContentFr');

        if (enBox && frBox && enContent && frContent) {
            if (lang === 'fr') {
                enBox.style.display = 'none';
                frBox.style.display = 'block';
            } else {
                enBox.style.display = 'block';
                frBox.style.display = 'none';
            }
            // Close both collapsible contents when switching so toggle works predictably
            enContent.classList.remove('open');
            frContent.classList.remove('open');
        }
    }

    // Helper: apply translations object to the page (keys -> html)
    function applyTranslations(translations) {
        // Apply translations for elements with matching IDs
        for (const key in translations) {
            if (!Object.prototype.hasOwnProperty.call(translations, key)) continue;
            const el = document.getElementById(key);
            if (el) {
                el.innerHTML = translations[key];
            }
        }

        // Apply translations for elements marked with .translate and a data-key
        document.querySelectorAll('.translate').forEach((el) => {
            const key = el.getAttribute('data-key');
            if (key && translations[key]) {
                el.innerHTML = translations[key];
            }
        });
    }

    // Helper: cache original English content for keys present in translations or data-key elements
    function cacheOriginalForKeys(keys) {
        // Cache elements by id
        keys.forEach((key) => {
            const el = document.getElementById(key);
            if (el && !(key in originalContent)) originalContent[key] = el.innerHTML;
        });

        // Cache elements with data-key attributes that match any key
        document.querySelectorAll('.translate').forEach((el) => {
            const key = el.getAttribute('data-key');
            if (key && keys.includes(key) && !(key in originalContent)) originalContent[key] = el.innerHTML;
        });
    }

    // Restore original English content from cache
    function restoreOriginal() {
        for (const key in originalContent) {
            if (!Object.prototype.hasOwnProperty.call(originalContent, key)) continue;
            const elById = document.getElementById(key);
            if (elById) {
                elById.innerHTML = originalContent[key];
                continue;
            }
            // Fallback: check translate elements for matching data-key
            document.querySelectorAll('.translate').forEach((el) => {
                if (el.getAttribute('data-key') === key) el.innerHTML = originalContent[key];
            });
        }
    }

    // Main loader
    function loadLanguage(lang) {
        if (lang === 'fr') {
            localStorage.setItem('lang', 'fr');

            fetch('./lang/fr.json')
                .then((response) => response.json())
                .then((translations) => {
                    const keys = Object.keys(translations);
                    // Cache original English text for keys we'll replace
                    cacheOriginalForKeys(keys);

                    applyTranslations(translations);

                    showInfoForLang('fr');
                })
                .catch((err) => {
                    console.error('Failed to load French translations:', err);
                    showInfoForLang('fr');
                });

            return;
        }

        if (lang === 'en') {
            localStorage.setItem('lang', 'en');
            // Restore any cached English content
            restoreOriginal();
            showInfoForLang('en');
        }
    }

    // On page load: restore saved language (default to 'en' if not set)
    window.addEventListener('DOMContentLoaded', function () {
        const saved = localStorage.getItem('lang') || 'en';
        if (saved === 'fr') {
            loadLanguage('fr');
        } else {
            loadLanguage('en');
        }
    });

    // Expose loader to global scope (buttons call loadLanguage)
    window.loadLanguage = loadLanguage;
})();