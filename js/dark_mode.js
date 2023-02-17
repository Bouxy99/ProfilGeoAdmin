
// Appliquer le mode sombre
// Inspiration : https://stackoverflow.com/questions/18880890/how-do-i-toggle-an-elements-class-in-pure-javascript

// Fonction de changement des classes
function toggleClass(els, className) {
    for (let element of els) {
        element.classList.toggle(className);
    };
};
function toggleDarkMode() {
    toggleClass(document.getElementsByTagName("body"), 'dark_mode_bg');
    toggleClass(document.getElementsByTagName("h1"), 'dark_mode_text');
    toggleClass(document.getElementsByTagName("label"), 'dark_mode_text');
    toggleClass(document.getElementsByTagName("h5"), 'dark_mode_text');
    toggleClass(document.getElementsByTagName("th"), 'dark_mode_text');
    toggleClass(document.getElementsByTagName("td"), 'dark_mode_text');

    // Profil
    if (dict_ProfilGeoAdmin['color-mod'] == 'dark') {
        colors = dark_color;
        classes = { 'txt': 'dark_mode_text', 'bg': 'dark_mode_bg' };
    } else {
        colors = bright_color;
        classes = { 'txt': '', 'bg': '' };
    }
    generateProfil();
};

// Evenement lorsque le switch est touché
const checkbox = document.getElementById('switch_dark_mode')
checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        dict_ProfilGeoAdmin['color-mod'] = 'dark';
    } else {
        dict_ProfilGeoAdmin['color-mod'] = 'bright';
    };
    toggleDarkMode();
    saveLocalStorage();
});

// Appliquer le mode sombre si activé lors de la dernière session
function applyColorMod() {
    if (dict_ProfilGeoAdmin['color-mod'] == 'dark') {
        toggleDarkMode();
        document.getElementById("switch_dark_mode").checked = true;
    };
};