// Definition des variables
let list_coord = [];
let geom_json = {};
let liste_profil = [];
let profil_generate = false;
let table_more_info = false;
let long_plan = 0;
let long_reli = 0;
let pente_max_p = 0;
let pente_max_deg = 0;
let dict_pt = {};

let dict_ProfilGeoAdmin = {}

// Generer un profil vide
let layout = {};
let data = [{}];
Plotly.newPlot('profil', data, layout);
let myPlot = $('#profil');
$('#profil').hide();

// Recuperer les valeurs definies dans HTML
let nb_points = parseFloat($('#nb_points').val());

// Définition des couleurs de textes et fond
let bright_color = { 'txt': 'rgb(0,0,0)', 'bg': 'rgb(255,255,255)' };
let dark_color = { 'txt': 'rgb(255,255,255)', 'bg': 'rgb(56,56,56)' };
let colors = {};
let classes = {};