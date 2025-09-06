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
                    element.innerText = translations[key];
                }
            }

            // Translate all elements with data-key
            document.querySelectorAll('.translate').forEach(el => {
                const key = el.getAttribute('data-key');
                if (translations[key]) {
                    el.innerText = translations[key];
                }
            });
        });
    } else if (lang === 'en') {
        localStorage.setItem('lang', 'en');
        window.location.reload(); // Resets to original English content
    }
}

// Load language from localStorage or default to French
window.onload = function() {
    const lang = localStorage.getItem('lang') || 'fr';
    if (lang === 'fr') {
        loadLanguage('fr');
    } else {
        // If English, do nothing (original content is English)
        localStorage.setItem('lang', 'en');
    }
}