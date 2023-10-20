import swal from "../views/layout/plugins/sweetalert2/sweetalert2.all";

// requete pour l'ajout du fournisseur dans la base de données: storeFournisseur
$("#addFournisseurButton").on("click", () => {
  $("#addFournisseurButton").attr("disabled", true);
  const inputEdit = $("#addFournisseur").find("input");
  const selects = $("#addFournisseur").find("select");
  const description = $("#addFournisseur textarea[name=description]").val();
  console.log(selects);
  let data = {};
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  for (let j = 0; j < selects.length; j++) {
    const select = selects[j];
    if (select.name) {
      data[select.name] = select.value;
    }
  }
  data["description"] = description;
  $.ajax({
    url: "/fournisseurs/storeFournisseur",
    method: "POST",
    dataType: "json",
    data: { data },
    success: function (data) {
      if (data.status == "success") {
        swal.fire("Succès!", data.message, "success");
        const timer = setInterval(() => {
          window.location.replace("/fournisseurs");
          clearInterval(timer);
        }, 1500);
        $("#addFournisseurButton").attr("disabled", true);
      } else {
        swal.fire("Erreur!", data.message, "error");
        $("#addFournisseurButton").removeAttr("disabled");
      }
    },
    error: function (error) {
      console.log(error);
      $("#addFournisseurButton").removeAttr("disabled");
    },
  });
});
// requete pour modifier le fournisseur dans la base de données: updateFournisseur
$("#editFournisseurButton").on("click", () => {
  $("#editFournisseurButton").attr("disabled", true);
  const inputEdit = $("#editFournisseur").find("input");
  const selects = $("#editFournisseur").find("select");
  const description = $("#editFournisseur textarea[name=description]").val();
  console.log(selects);
  let data = {};
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  for (let j = 0; j < selects.length; j++) {
    const select = selects[j];
    if (select.name) {
      data[select.name] = select.value;
    }
  }
  data["description"] = description;
  const fournisseurId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
  $.ajax({
    url: "/fournisseurs/updateFournisseur/" + fournisseurId,
    method: "POST",
    dataType: "json",
    data: { data },
    success: function (data) {
      if (data.status == "success") {
        swal.fire("Succès!", data.message, "success");
        const timer = setInterval(() => {
          window.location.replace("/fournisseurs");
          clearInterval(timer);
        }, 1500);
        $("#editFournisseurButton").attr("disabled", true);
      } else {
        swal.fire("Erreur!", data.message, "error");
        $("#editFournisseurButton").removeAttr("disabled");
      }
    },
    error: function (error) {
      console.log(error);
      $("#addFournisseurButton").removeAttr("disabled");
    },
  });
});

// requete pour l'ajout de la categorie dans la base de données: storeFournisseurCategorie
$("#addFournisseurCategorieButton").on("click", () => {
  $("#addFournisseurCategorieButton").attr("disabled", true);
  const inputEdit = $("#addFournisseurCategorie").find("input");
  let data = {};
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  $.ajax({
    url: "/fournisseurs/storeFournisseurCategorie",
    method: "POST",
    dataType: "json",
    data: { data },
    success: function (data) {
      if (data.status == "success") {
        swal.fire("Succès!", data.message, "success");
        const timer = setInterval(() => {
          window.location.replace("/fournisseurs/secteurActivite");
          clearInterval(timer);
        }, 1500);
        $("#addFournisseurCategorieButton").attr("disabled", true);
      } else {
        swal.fire("Erreur!", data.message, "error");
        $("#addFournisseurCategorieButton").removeAttr("disabled");
      }
    },
    error: function (error) {
      console.log(error);
      $("#addFournisseurCategorieButton").removeAttr("disabled");
    },
  });
});
// requete pour modifier le fournisseur dans la base de données: updateFournisseurCategorie
$("#editFournisseurCategorieButton").on("click", () => {
  $("#editFournisseurCategorieButton").attr("disabled", true);
  const inputEdit = $("#editFournisseurCategorie").find("input");
  let data = {};
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
  const fournisseurId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
  $.ajax({
    url: "/fournisseurs/updateFournisseurCategorie/" + fournisseurId,
    method: "POST",
    dataType: "json",
    data: { data },
    success: function (data) {
      if (data.status == "success") {
        swal.fire("Succès!", data.message, "success");
        const timer = setInterval(() => {
          window.location.replace("/fournisseurs/secteurActivite");
          clearInterval(timer);
        }, 1500);
        $("#editFournisseurCategorieButton").attr("disabled", true);
      } else {
        swal.fire("Erreur!", data.message, "error");
        $("#editFournisseurCategorieButton").removeAttr("disabled");
      }
    },
    error: function (error) {
      console.log(error);
      $("#editFournisseurButton").removeAttr("disabled");
    },
  });
});
