// Definition des variables
let list_coord = [];
let geom_json = {};
let liste_profil = [];
let vectorLine = new ol.source.Vector({});
let profil_generate = false;
let table_more_info = false;
let long_reli = 0;
let pente_max_p = 0;
let pente_max_deg = 0;

// Recuperer les valeurs definies dans HTML
let nb_points = parseFloat($('#nb_points').val());