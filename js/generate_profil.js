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
    
        // Generation des donnees pour le graphique
        [data,layout] = processProfilData(liste_profil)
    
        // Creation du graphique
        Plotly.newPlot('profil', data, layout);

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
    profil.forEach(function(pt){
        mnt_x.push(pt.dist)
        mnt_y.push(pt.alts.DTM25)
    });

    // Recherches du points min et max pour un meilleur ajustement de la vue du graphique
    let min_y = Math.min.apply(null, mnt_y);
    let max_y = Math.max.apply(null, mnt_y);
    let diff_y = max_y-min_y;

    // Creation de la ligne du graphique
    var mnt = {
        x: mnt_x,
        y: mnt_y,
        name: 'MNT',
        mode: 'lines+markers',
        line: {
            color: 'rgb(80, 173, 81)',
            width: 2
        },
        marker: {
            size: 4,
        },
        fill: 'tozeroy',
    };
    var data = [mnt];

    // Creation de la mise en page du graphique
    var layout = {
        title: 'Profil altimétrique du terrain - swissALTI3D ©swisstopo',
        xaxis: {
            title: 'Distance [m]',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Altitude [m]',
            showline: false,
            range: [min_y-diff_y*0.2, max_y+diff_y*0.2]
        }
    };
    return [data,layout]
}