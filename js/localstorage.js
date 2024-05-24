// Chargement du localstorage
function loadLocalStorage() {
    dict_ProfilGeoAdmin = JSON.parse(localStorage.getItem('ProfilGeoAdmin_dict'));

    // Création si pas encore existant
    if (!dict_ProfilGeoAdmin) {
        dict_ProfilGeoAdmin = {
            'profils': {},
            'color-mod': 'bright'
        }
    };

    updateListProfil();
    applyColorMod();
};

// Fonction d'enregistrement dans le localstorage
function saveLocalStorage() {
    let dict = JSON.stringify(dict_ProfilGeoAdmin)
    localStorage.setItem('ProfilGeoAdmin_dict', dict);
};

loadLocalStorage();