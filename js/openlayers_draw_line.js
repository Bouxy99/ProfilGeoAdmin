// action à effectuer lors du clic sur la carte
map.on('click', function (evt) {
    // Supression de la ligne precedente
    vectorLine.clear();
    // Ajout de la nouvelle ligne
    list_coord.push(evt.coordinate);
    let line_profil = new ol.geom.LineString(list_coord);
    let featureLine = new ol.Feature({
        geometry: line_profil
    });

    // Creation de la couche representant la ligne
    vectorLine = new ol.source.Vector({});
    vectorLine.addFeature(featureLine);
    let vectorLineLayer = new ol.layer.Vector({
        source: vectorLine,
        style: new ol.style.Style({
            fill: new ol.style.Fill({ color: '#eb4034', weight: 4 }),
            stroke: new ol.style.Stroke({ color: '#eb4034', width: 4 })
        })
    });
    // Ajout a la carte
    map.addLayer(vectorLineLayer);

    // Creation de la geometrie GeoJSON de la ligne pour utilisation dans l'API
    geom_json = new ol.format.GeoJSON().writeGeometry(line_profil, {
        dataProjection: 'EPSG:2056', featureProjection: 'EPSG:2056', decimals: 3
    });

    // Changer style bouton generer profil
    if (list_coord.length > 1) {
        $("#btn_generate_profil").removeClass("btn-secondary")
        $("#btn_generate_profil").addClass("btn-success")
    };
});