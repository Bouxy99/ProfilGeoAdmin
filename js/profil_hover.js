// Affichage d'un point sur la carte lorsque la souris est sur le graphique
myPlot.on('plotly_hover', function(_,data){

    // Recuperation des donnees du profil
    x = data.points[0].x;
    est = dict_pt[x].easting;
    nord = dict_pt[x].northing;

    // Creation du point OL
    vectorPoint.clear();
    let featurePoint = new ol.Feature({
        geometry: new ol.geom.Point([est, nord])
    });
    vectorPoint.addFeature(featurePoint);
    map.getView().setCenter([est, nord])
});