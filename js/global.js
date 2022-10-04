// Definition des variables
let list_coord = [];
let geom_json = {};
let liste_profil = [];
let profil_generate = false;
let table_more_info = false;
let long_reli = 0;
let pente_max_p = 0;
let pente_max_deg = 0;
let dict_pt = {};

// Generer un profil vide
let layout = {};
let data = [{}];
Plotly.newPlot('profil', data, layout);
let myPlot = $('#profil');
$('#profil').hide();

// Recuperer les valeurs definies dans HTML
let nb_points = parseFloat($('#nb_points').val());