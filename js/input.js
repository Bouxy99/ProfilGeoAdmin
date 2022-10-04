// Mise a jour du nombre de points pour le profil
function updateNbPoints(input) {
    nb_points = parseFloat(input.value);
};

// Reinitialiser le profil et la carte
function resetProfil() {
    // Vider le profil
    $("#profil").html("");
    $('#apres_gen_profil').hide();

    // Empecher l'export CSV
    profil_generate = false;
    $("#btn_export_csv").removeClass("btn-primary")
    $("#btn_export_csv").addClass("btn-secondary")
    $("#btn_generate_profil").removeClass("btn-success")
    $("#btn_generate_profil").addClass("btn-secondary")

    // Ajouter le text (Pas de profil genere)
    $('.avant_gen_profil').show();

    // Vider la carte
    list_coord = [];
    vectorLine.clear();
    draw_line.abortDrawing()
};

// Afficher plus d'element du tableau d'informations du profil
function showMore() {
    if (!table_more_info) {
        $('.row_plus').show();
        table_more_info = true;
        $("#btn_show_more").html("Montrer moins");
    } else {
        $('.row_plus').hide();
        table_more_info = false;
        $("#btn_show_more").html("Montrer plus");
    }
};