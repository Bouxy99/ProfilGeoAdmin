// Definition des variables
let list_coord = [];
let geom_json = {};
let liste_profil = [];
let vectorLine = new ol.source.Vector({});
let profil_generate = false;

// Recuperer les valeurs definies dans HTML
let nb_points = parseFloat($('#nb_points').val());