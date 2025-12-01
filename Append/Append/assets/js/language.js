    // language.js - improved: toggles the info boxes and applies translations

    // Show/hide the bilingual info boxes (keeps collapsible state closed when switching)
    function showInfoForLang(lang) {
    const enBox = document.getElementById("info-en");
    const frBox = document.getElementById("info-fr");
    const enContent = document.getElementById("infoContentEn");
    const frContent = document.getElementById("infoContentFr");

    if (enBox && frBox && enContent && frContent) {
        if (lang === 'fr') {
        enBox.style.display = "none";
        frBox.style.display = "block";
        } else {
        enBox.style.display = "block";
        frBox.style.display = "none";
        }
        // Close both collapsible contents when switching so toggle works predictably
        enContent.classList.remove("open");
        frContent.classList.remove("open");
    } else {
        // If boxes don't exist, no-op (prevents errors)
        // console.warn("Info boxes not found; skipping showInfoForLang.");
    }
    }

    // Main loader for French translations
    function loadLanguage(lang) {
    if (lang === 'fr') {
        localStorage.setItem('lang', 'fr');

        fetch('./lang/fr.json')
        .then(response => response.json())
        .then(translations => {
            // Translate by ID (for unique elements)
            for (const key in translations) {
            const element = document.getElementById(key);
            if (element) {
                // Use innerHTML for elements that may contain markup; otherwise innerText is OK.
                // If your translations are plain text, innerText is safe. To support <strong> tags, use innerHTML.
                element.innerHTML = translations[key];
            }
            }

            // Translate all elements with data-key
            document.querySelectorAll('.translate').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[key]) {
                el.innerHTML = translations[key];
            }
            });

            // Show french info box and hide english one
            showInfoForLang('fr');
        })
        .catch(err => {
            console.error("Failed to load French translations:", err);
            // still show French box if language set to fr (best effort)
            showInfoForLang('fr');
        });

    } else if (lang === 'en') {
        // Save preference
        localStorage.setItem('lang', 'en');

        // Restore original (English) content. We assume the original English text is in the HTML source.
        // If you have an 'en.json' and want to reapply via JS, you can fetch and apply it here similarly.
        // Show english info box and hide french one
        showInfoForLang('en');
    }
    }

    // On page load: restore saved language (default to 'en' if not set)
    window.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('lang') || 'fr'; // your previous behavior used 'fr' default
    if (saved === 'fr') {
        loadLanguage('fr');
    } else {
        // ensure english UI is shown
        loadLanguage('en');
    }
    });