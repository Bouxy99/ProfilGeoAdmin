// Action à effectuer lors du clic sur la carte
map.on('click', function (evt) {
    // Supression de la ligne precedente
    vectorLine.clear();
    // Ajout de la nouvelle ligne
    list_coord.push(evt.coordinate);
    drawLineMap(list_coord);

    // Changer style bouton generer profil
    if (list_coord.length > 1) {
        $("#btn_generate_profil").removeClass("btn-secondary")
        $("#btn_generate_profil").addClass("btn-success")
    };
});

// Fonction d'affichage de la ligne sur la carte
function drawLineMap(list) {
    line_profil = new ol.geom.LineString(list);
    featureLine = new ol.Feature({
        geometry: line_profil
    });

    // Creation de la couche representant la ligne
    vectorLine.addFeature(featureLine);

    // Creation de la geometrie GeoJSON de la ligne pour utilisation dans l'API
    geom_json = new ol.format.GeoJSON().writeGeometry(line_profil, {
        dataProjection: 'EPSG:2056', featureProjection: 'EPSG:2056', decimals: 3
    });
    geom_json = JSON.parse(geom_json);
};

// Permet d'afficher le profil avant de le cliquer
let draw_line = new ol.interaction.Draw({
    type: "LineString",
    style: style_profil,
});
let draw_point = new ol.interaction.Draw({
    type: "Point",
    style: style_profil_pt,
});
map.addInteraction(draw_line);
map.addInteraction(draw_point);