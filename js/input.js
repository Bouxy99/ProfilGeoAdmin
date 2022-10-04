// Mise a jour du nombre de points pour le profil
function updateNbPoints(input) {
    nb_points = parseFloat(input.value);
};

// Reinitialiser le profil et la carte
function resetProfil() {
    // Vider le profil
    $("#profil").html("");

    // Empecher l'export CSV
    profil_generate = false;
    $("#btn_export_csv").removeClass("btn-primary")
    $("#btn_export_csv").addClass("btn-secondary")
    $("#btn_generate_profil").removeClass("btn-success")
    $("#btn_generate_profil").addClass("btn-secondary")

    // Vider la carte
    list_coord = [];
    vectorLine.clear();
};