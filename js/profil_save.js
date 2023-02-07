// Fonction d'enregistrement du profil
function saveProfil() {
    if (profil_generate) {
        date = Date.now();
        dict_ProfilGeoAdmin['profils'][date] = { 'dist': long_plan, 'geom': geom_json };
        saveLocalStorage();
    };

    updateListProfil();
};

// Fonction de mise à jour de la liste des profils
function updateListProfil() {

    $("#tbody_profil_save").empty();

    liste_profil = dict_ProfilGeoAdmin['profils'];

    // Test pour voir si des éléments sont sauvgardés
    if (Object.keys(liste_profil).length > 0) {

        // Iteration sur les éléments du dictionnaire
        for (let i of Object.keys(liste_profil)) {

            // Formatage de la date
            date = new Date(parseInt(i));
            dateString = date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear() + " " + date.getUTCHours() + ":" + date.getUTCMinutes();

            // https://stackoverflow.com/a/13999956/17248158
            $('#table_profil_save tbody').append(`<tr>
            <th scope="row">${dateString}</th>
            <td>${liste_profil[i]['dist']} m</td>
            <td style="width:5%"><button type="button" class="btn btn-primary btn-sm" aria-haspopup="true" aria-expanded="false" onclick="loadProfil(${i})"><i class="fa fa-eye"></i></button></td>
            <td style="width:5%"><button type="button" class="btn btn-danger btn-sm" aria-haspopup="true" aria-expanded="false" onclick="deleteSavedProfil(${i})"><i class="fa fa-trash"></i></button></td>
            </tr>`);

        };

        // Supprimer le text (Pas de profil enregistré)
        $('#apres_save_profil').show();
        $('#avant_save_profil').hide();

    };
};

// Supression d'un profil enregistré
function deleteSavedProfil(id) {

    delete dict_ProfilGeoAdmin['profils'][id];

    // Mise à jour du localstorage et de la liste
    saveLocalStorage();
    updateListProfil();
};

// Charger un profil enregistré
function loadProfil(id) {
    // Vider la carte
    clearMap();

    // Recuperer la géometrie et dessiner le profil
    coordinates = dict_ProfilGeoAdmin['profils'][id]['geom']['coordinates'];
    list_coord = [...coordinates];
    drawLineMap(list_coord);

    // Generer le profil et ouvrir l'onglet
    $('[href="#tab_profil"]').tab('show');
    generateProfil();

    // Zoomer sur l'étendu du profil
    map.getView().fit(line_profil['extent_']);
    view.setZoom(view.getZoom()-0.5)
};