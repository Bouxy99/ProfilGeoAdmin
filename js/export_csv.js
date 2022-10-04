// Fonction d'export du profil actuel (format : distance,est,nord,altitude)
// Inspiration : https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
function CSVExport() {
    // Exporter le profil si au minimum deux points
    if (list_coord.length > 1 && profil_generate === true) {
        // Preparation du CSV
        let csvContent = 'distance;est;nord;altitude\r\n';
        // Iteration sur les points
        liste_profil.forEach(function(pt){
            let row = `${pt.dist};${pt.easting};${pt.northing};${pt.alts.DTM25}`;
            csvContent += row + '\r\n';
        });

        // Export du CSV
        var pom = document.createElement('a');
        var blob = new Blob([csvContent],{type: 'text/csv;charset=utf-8;'});
        var url = URL.createObjectURL(blob);
        pom.href = url;
        pom.setAttribute('download', 'profil.csv');
        pom.click();
    };
};