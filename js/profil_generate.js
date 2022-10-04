// Fonction de generation de profil
function generateProfil() {
    // Creer le profil si au minimum deux points
    if (list_coord.length > 1) {
        // Creer l'url avec les variables definies
        let url = `https://api3.geo.admin.ch/rest/services/profile.json?geom=${geom_json}&sr=2056&nb_points=${nb_points}`;

        // Execution de la requete a l'API
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        liste_profil = JSON.parse(xmlHttp.responseText);

        $("#profil").show();

        // Creation du profil
        processProfilData(liste_profil)

        // Permet l'export CSV
        profil_generate = true
        $("#btn_export_csv").removeClass("btn-secondary")
        $("#btn_export_csv").addClass("btn-primary")
    };
};

// Fonction de modification des donnees recues
function processProfilData(profil) {
    let mnt_x = [];
    let mnt_y = [];

    // Remplissage des listes x et y
    profil.forEach(function (pt) {
        mnt_x.push(pt.dist);
        mnt_y.push(pt.alts.DTM25);
        dict_pt[pt.dist] = {'easting':pt.easting, 'northing':pt.northing};
    });

    // Calcul de la longueur et recherche de la plus forte pente
    long_reli = 0;
    pente_max_p = 0;
    pente_max_deg = 0;
    for (let i of Object.keys(mnt_x)) {
        if (i > 0) {
            let diff_x = mnt_x[i] - mnt_x[i - 1];
            let diff_y = mnt_y[i] - mnt_y[i - 1];
            let long = Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2));
            long_reli += long;
            // Test de la pente
            if (Math.abs(pente_max_p) < ((diff_y / diff_x) * 100)) {
                pente_max_p = ((diff_y / diff_x) * 100);
                pente_max_deg = (180 * Math.atan(diff_y / diff_x) / Math.PI);
            }
        };
    };

    // Recherches du points min et max pour un meilleur ajustement de la vue du graphique
    let min_y = Math.min.apply(null, mnt_y);
    let max_y = Math.max.apply(null, mnt_y);
    let diff_y = max_y - min_y;

    // Creation de la ligne du graphique
    data = [{
        x: mnt_x, y: mnt_y, name: 'MNT',
        hovertemplate: '%{y:.1f} m',
        mode: 'lines+markers', marker: { size: 4 },
        line: { color: '#ff0000', width: 2 },
        fill: 'tozeroy'
        
    }],
    layout = {
        hovermode: 'x unified',
        title: 'Profil altimétrique du terrain - swissALTI3D ©swisstopo',
        xaxis: { title: 'Distance [m]', showgrid: false, zeroline: false, hovertemplate: 'A',},
        yaxis: { title: 'Altitude [m]', showline: false, range: [min_y - diff_y * 0.2, max_y + diff_y * 0.2] }
    };
        
    Plotly.newPlot('profil', data, layout);
    myPlot = $('#profil');

    // Ajout des informations dans le tableau
    let long_plan = mnt_x.at(-1);
    let denivele = (mnt_y.at(-1) - mnt_y[0]);
    let pente_moy_p = ((denivele / long_plan) * 100);
    let pente_moy_deg = (180 * Math.atan(denivele / long_plan) / Math.PI);

    $('#long_reli').text(`${long_reli.toFixed(1)} m`);
    $('#long_plan').text(`${long_plan} m`);
    $('#alti_dep').text(`${mnt_y[0]} m`);
    $('#alti_arr').text(`${mnt_y.at(-1)} m`);
    $('#denivele').text(`${denivele.toFixed(1)} m`);
    $('#pente_moy').text(`${pente_moy_p.toFixed(1)} % | ${pente_moy_deg.toFixed(1)} °`);
    $('#alti_min').text(`${min_y} m`);
    $('#alti_max').text(`${max_y} m`);
    $('#pente_max').text(`${pente_max_p.toFixed(1)} % | ${pente_max_deg.toFixed(1)} °`);

    $('#apres_gen_profil').show();

    // Supprimer le text (Pas de profil genere)
    $('.avant_gen_profil').hide();
}