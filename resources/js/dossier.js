import swal from "../views/layout/plugins/sweetalert2/sweetalert2.all";
const toastrMin = require("../views/layout/plugins/toastr/toastr.min");

$("#createDossier select[name=assignations]").select2();

$("#createDossierButton").on("click", function () {
  swal
    .fire({
      title: "Etes-vous sûr?",
      text: "Vous etes sur le point de créer le dossier!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je crée!",
      cancelButtonText: "Non, j'annule",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const assign = $("#createDossier select[name=assignation]").val();
        const assigns = $("#createDossier select[name=assignations]").val();
        const title = $("#createDossier #title").val();
        const message = $("#createDossier #message").val();
        if (!title) {
          $("#createDossier #title").addClass("is-invalid");
          return;
        } else {
          $("#createDossier #title").removeClass("is-invalid");
        }
        if (!message) {
          $("#createDossier #message").addClass("is-invalid");
          return;
        } else {
          $("#createDossier #message").removeClass("is-invalid");
        }
        $.ajax({
          url: "/dossier/storeDossier",
          method: "POST",
          dataType: "json",
          data: { assign, assigns, dossierTitle: title, message },
          success: function (data) {
            if (data.status === "success") {
              swal.fire("Succès!", data.message, "success");
              const timer = setInterval(() => {
                window.location.replace("/dossiers");
                clearInterval(timer);
              }, 1500);
            } else {
              swal.fire("Erreur!", data.message, "error");
              // const timer = setInterval(() => {
              //   window.location.replace("/dossiers");
              //   clearInterval(timer);
              // }, 1500);
            }
          },
          error: function (error) {
            console.log(error);
          },
        });
      }
    });
});

// ajouter le detail du dossier sur la liste sur le view addDossier
$("#addDossierInArray").on("click", function () {
  const inputEdit = $("#addDossierDetail").find("input");
  console.log("ok");
  let response = "<tr>";
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    console.log(`${input.value}-${input.name}`);
    if (input.value == "") {
      $(`#addDossierDetail input[name=${input.name}]`).addClass("is-invalid");
      return;
    }
    response += "<td fromInputName=" + input.name + ">" + input.value + "</td>";
    input.value = "";
  }
  const idGenerate = Date.now().toString();
  response +=
    "<button class='btn btn-danger btn-sm' id=" +
    idGenerate +
    "-" +
    "deleteElement" +
    " onclick='deleteElement(" +
    idGenerate +
    ")'><i class='fa fa-minus'></i></button></td></tr>";
  $("#addDossierList").append(response);
});

// ajouter le detail du projet commande sur la liste sur le view addProjetCommande
$("#addProjetCommandeBtn").on("click", function () {
  const inputFind = $("#addProjetCommandeList").find("input");
  const textAreaFind = $("#addProjetCommandeList textarea[name=observation]");
  let response = "<tr>";
  for (let i = 0; i < inputFind.length; i++) {
    const input = inputFind[i];
    if (input.value == "") {
      $(`#addProjetCommandeList input[name=${input.name}]`).addClass(
        "is-invalid"
      );
      return;
      // return;
    } else {
      $(`#addProjetCommandeList input[name=${input.name}]`).hasClass(
        "is-invalid"
      )
        ? $(`#addProjetCommandeList input[name=${input.name}]`).removeClass(
            "is-invalid"
          )
        : null;
    }
    response += "<td fromInputName=" + input.name + ">" + input.value + "</td>";
    // input.value = "";
    if (i + 1 == inputFind.length) {
      const textArea = $("textarea#observation");
      if (textArea.val() == "") {
        $(textArea).addClass("is-invalid");
        return;
      } else {
        $(textArea).hasClass("is-invalid")
          ? $(textArea).removeClass("is-invalid")
          : null;
      }
      response += "<td fromInputName='observation'>" + textArea.val() + "</td>";
    }
    console.log(`${input.name}-${input.value}`);
  }
  const idGenerate = Date.now().toString();
  response +=
    "<td><button class='btn btn-secondary mr-2' id=" +
    idGenerate +
    "-" +
    "editElement" +
    " onclick='editProjetCommandeElement(" +
    idGenerate +
    ")'><i class='fa fa-pen'></i></button><button class='btn btn-danger' id=" +
    idGenerate +
    "-" +
    "deleteElement" +
    " onclick='deleteElement(" +
    idGenerate +
    ")'><i class='fa fa-minus'></i></button></td></tr>";
  $("#projetCommandeList").append(response);
  $("#addProjetCommandeList").find("input").val("");
  $("textarea#observation").val("");
});

// requete pour l'ajout du dossier dans la base de données: storeDossier
$("#addDossierButton").on("click", () => {
  const trFind = $("#addDossierList").find("tr");
  const entitle = $("#addDossier input[name=title]").val();
  const arrayToSend = [];
  for (let j = 0; j < trFind.length; j++) {
    const tr = trFind[j];
    const tdFind = $(tr).find("td[fromInputName]");
    arrayToSend.push({
      designation: tdFind[0].innerHTML,
      nombre: tdFind[1].innerHTML,
      unite: tdFind[2].innerHTML,
      quantite: tdFind[3].innerHTML,
    });
    // console.log($(tr).find("td[fromInputName]"));
  }
  $.ajax({
    url: "/dossier/storeDossier",
    method: "POST",
    dataType: "json",
    data: { arrayToSend, dossierTitle: entitle },
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
});

// requete pour l'ajout du projet dans la base de données: storeProjetCommande
$("#addProjetCommandeButton").on("click", function () {
  $(this).attr("disabled", true);
  const idDossierDetail = $(this).attr("idDossierDetail");
  const trFind = $("#projetCommandeList").find("tr");
  const inputRadioFind = $("#addProjetCommande input[type=radio]");
  const personneAvertir = $("#personneAvertir").val();
  const infoChantier = $("#infoChantier").val();
  const dateEmission = $("#dateEmission").val();
  if (!dateEmission) {
    return $("#dateEmission").addClass("is-invalid");
  }
  const checkChoosen = [];
  for (let t = 0; t < inputRadioFind.length; t++) {
    const inputRadio = inputRadioFind[t];
    if (inputRadio.checked) {
      checkChoosen.push(inputRadio.attributes["ref"].value);
      console.log(inputRadio.attributes["ref"].value);
    }
  }
  // const entitle = $("#addDossier input[name=title]").val();
  const arrayToSend = [];
  for (let j = 0; j < trFind.length; j++) {
    const tr = trFind[j];
    const tdFind = $(tr).find("td[fromInputName]");
    arrayToSend.push({
      ref_post_budget: tdFind[0].innerHTML,
      numeroRef: tdFind[1].innerHTML,
      designationAffectation: tdFind[2].innerHTML,
      quantiteDemande: tdFind[3].innerHTML,
      // montantEstime: tdFind[4].innerHTML,
      // niveauStockMagasin: tdFind[5].innerHTML,
      observation: tdFind[4].innerHTML,
    });
    // console.log($(tr).find("td[fromInputName]"));
  }
  $.ajax({
    url: `/dossier/projetCommande/storeProjetCommande/${idDossierDetail}`,
    method: "POST",
    dataType: "json",
    data: {
      arrayToSend,
      dateEmission,
      infoChantier,
      personneAvertir,
      checkChoosen,
    },
    success: function (data) {
      console.log(data);
      $(this).removeAttr("disabled");
      if (data.status == "success") {
        swal.fire("Succès!", "Succès!", "success");
        window.location.replace('/dossier/projetCommande/' + data.dataResponse.id_dossier_detail);
      } else {
        swal.fire("Erreur!", `${data.message}`, "error");
      }
      // toastrMin.success("Success.", "Success", {
      //   positionClass: "toast-top-right",
      //   duration: 5000,
      //   style: "info",
      // });
      // const timer = setInterval(() => {
      //   javascript: history.back();
      //   window.location.reload();
      //   clearInterval(timer);
      // }, 1500);
    },
    error: function (error) {
      console.log(error);
      $(this).removeAttr("disabled");
      swal.fire("Erreur!", `Erreur!`, "error");
    },
  });
});

// ajouter le detail du projet commande sur la liste sur le view editDossier
$("#addDossierInArrayInEdit").on("click", function () {
  const inputEdit = $("#editDossierDetailAdding").find("input");
  if ($(this).text() == "Ajouter") {
    newElementInEdit(inputEdit);
  } else {
    const buttonEdit = $("#editDossierDetailAdding").find("button");
    let idTrToEdit = "0";
    let resetAttr = null;
    for (let j = 0; j < buttonEdit.length; j++) {
      const btn = buttonEdit[j];
      if (btn.attributes["idTr"]) {
        idTrToEdit = btn.attributes["idTr"].value;
        resetAttr = () => {
          btn.removeAttribute("idTr");
          $(this).text("Ajouter");
          inputEdit.val("");
        };
      }
    }
    editElementExistingInEdit(inputEdit, idTrToEdit, resetAttr);
  }
});
const newElementInEdit = (inputEdit) => {
  const idGenerate = Date.now().toString();
  let response = "<tr idDetail=" + idGenerate + "-new" + ">";
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    // console.log(`${input.value}-${input.name}`);
    if (input.value == "") {
      $(`#editDossierDetailAdding input[name=${input.name}]`).addClass(
        "is-invalid"
      );
      return;
    }
    response += "<td fromInputName=" + input.name + ">" + input.value + "</td>";
    input.value = "";
  }
  response +=
    "<td><button class='btn btn-secondary btn-sm mr-2' id=" +
    idGenerate +
    "-" +
    "editElement" +
    " onclick='editElementForDossierEditing(" +
    idGenerate +
    ")'><i class='fa fa-pen'></i></button><button class='btn btn-danger btn-sm' id=" +
    idGenerate +
    "-" +
    "deleteElement" +
    " onclick='deleteElement(" +
    idGenerate +
    ")'><i class='fa fa-minus'></i></button></td></tr>";
  $("#editDossierList").append(response);
};

const editElementExistingInEdit = (inputEdit, idTr, cb) => {
  // let response = "<tr idDetail=" +idTr+ ">";
  const trFind = $("tbody").find("tr");
  let valueInput = {};
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    // console.log(`${input.value}-${input.name}`);
    if (input.value == "") {
      $(`#editDossierDetailAdding input[name=${input.name}]`).addClass(
        "is-invalid"
      );
      return;
    }
    valueInput[input.name] = input.value;
  }
  for (let j = 0; j < trFind.length; j++) {
    const tr = trFind[j];
    if (tr.attributes["idDetail"].value == idTr) {
      const tdF = $(tr).find("td");
      for (let h = 0; h < tdF.length; h++) {
        const td = tdF[h];
        if (td.attributes["fromInputName"]) {
          td.innerHTML = valueInput[td.attributes["fromInputName"].value];
        }
      }
    } else if (tr.attributes["idDetail"].value == `${idTr}-new`) {
      const tdF = $(tr).find("td");
      for (let h = 0; h < tdF.length; h++) {
        const td = tdF[h];
        if (td.attributes["fromInputName"]) {
          td.innerHTML = valueInput[td.attributes["fromInputName"].value];
        }
      }
    }
  }
  cb();
};

// ajouter le detail du projet commande sur la liste sur le view editDossier
$("#addProjetCommandeEditBtn").on("click", function () {
  const inputEdit = $("#editProjetCommandeList").find("input");
  if ($(this).text() != "Modifier") {
    newElementInEditProjet(inputEdit);
  } else {
    // const buttonEdit = $("#editDossierDetailAdding").find("button");
    let idTrToEdit = "0";
    let resetAttr = null;
    if ($("#addProjetCommandeEditBtn").attr("idTr")) {
      idTrToEdit = $("#addProjetCommandeEditBtn").attr("idTr");
      resetAttr = () => {
        $("#addProjetCommandeEditBtn").removeAttr("idTr");
        $(this).text("Ajouter sur la liste");
        inputEdit.val("");
        $("#editProjetCommandeList textarea[name=observation]").val("");
      };
    }
    editElementExistingInEditProjet(inputEdit, idTrToEdit, resetAttr);
  }
});
const newElementInEditProjet = (inputEdit) => {
  const idGenerate = Date.now().toString();
  let response = "<tr idDetail=" + idGenerate + "-new" + ">";
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    // console.log(`${input.value}-${input.name}`);
    if (input.value == "") {
      $(`#editProjetCommandeList input[name=${input.name}]`).addClass(
        "is-invalid"
      );
      return;
    }
    response += "<td fromInputName=" + input.name + ">" + input.value + "</td>";
    input.value = "";
  }
  if ($(`#editProjetCommandeList textarea[name=observation]`).val()) {
    response +=
      "<td fromInputName='observation'>" +
      $(`#editProjetCommandeList textarea[name=observation]`).val() +
      "</td>";
    $(`#editProjetCommandeList textarea[name=observation]`).val("");
  } else {
    response += "<td fromInputName='observation'></td>";
  }
  response +=
    "<td><button class='btn btn-secondary btn-sm mr-2' id=" +
    idGenerate +
    "-" +
    "editElement" +
    " onclick='editElementForProjetEditing(" +
    idGenerate +
    ")'><i class='fa fa-pen'></i></button><button class='btn btn-danger btn-sm' id=" +
    idGenerate +
    "-" +
    "deleteElement" +
    " onclick='deleteElement(" +
    idGenerate +
    ")'><i class='fa fa-minus'></i></button></td></tr>";
  $("#projetCommandeEditList").append(response);
};

const editElementExistingInEditProjet = (inputEdit, idTr, cb) => {
  // let response = "<tr idDetail=" +idTr+ ">";
  const trFind = $("tbody").find("tr");
  let valueInput = {};
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    // console.log(`${input.value}-${input.name}`);
    if (input.value == "") {
      $(`#editProjetCommandeList input[name=${input.name}]`).addClass(
        "is-invalid"
      );
      return;
    }
    valueInput[input.name] = input.value;
  }
  valueInput["observation"] = $(
    "#editProjetCommandeList textarea[name=observation]"
  ).val();
  for (let j = 0; j < trFind.length; j++) {
    const tr = trFind[j];
    if (tr.attributes["idDetail"].value == idTr) {
      const tdF = $(tr).find("td");
      for (let h = 0; h < tdF.length; h++) {
        const td = tdF[h];
        if (td.attributes["fromInputName"]) {
          td.innerHTML = valueInput[td.attributes["fromInputName"].value];
        }
      }
    } else if (tr.attributes["idDetail"].value == `${idTr}-new`) {
      const tdF = $(tr).find("td");
      for (let h = 0; h < tdF.length; h++) {
        const td = tdF[h];
        if (td.attributes["fromInputName"]) {
          td.innerHTML = valueInput[td.attributes["fromInputName"].value];
        }
      }
    }
  }
  cb();
};

$("#resetInputProjetCommande").on("click", function () {
  const inputEdit = $("#addProjetCommandeList").find("input");
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    input.value = "";
  }
  $("#addProjetCommandeBtn").attr("idTr")
    ? $("#addProjetCommandeBtn").removeAttr("idTr")
    : null;
});

$("#resetDossierInArray").on("click", function () {
  const inputEdit = $("#addDossierDetail").find("input");
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    input.value = "";
  }
});

$("#resetInputProjetCommande").on("click", function () {
  const inputEdit = $("#editProjetCommandeList").find("input");
  for (let i = 0; i < inputEdit.length; i++) {
    const input = inputEdit[i];
    input.value = "";
  }
  $("#editProjetCommandeList textarea").val("");
  $("#addProjetCommandeEditBtn").removeAttr("idTr");
  $("#addProjetCommandeEditBtn").text("Ajouter sur la liste");
});

$("#confirmEditDossierButton").on("click", function () {
  swal
    .fire({
      title: "Etes-vous sûr?",
      text: "Vous etes sur le point de modifier ce dossier!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je modifie!",
      cancelButtonText: "Non, j'annule",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $(this).attr("disabled", true);
        const trFind = $("#editDossierList").find("tr");
        const entitle = $("#editDossier input[name=title]").val();
        const arrayToSend = [];
        const arrayNew = [];
        for (let j = 0; j < trFind.length; j++) {
          const tr = trFind[j];
          const tdFind = $(tr).find("td[fromInputName]");
          if (tr.attributes["idDetail"].value.split("-").length > 1) {
            arrayNew.push({
              designation: tdFind[0].innerHTML,
              unite: tdFind[1].innerHTML,
              quantite: tdFind[2].innerHTML,
            });
          } else {
            arrayToSend.push({
              id: tr.attributes["idDetail"].value,
              designation: tdFind[0].innerHTML,
              unite: tdFind[1].innerHTML,
              quantite: tdFind[2].innerHTML,
            });
          }
          // console.log($(tr).find("td[fromInputName]"));
        }
        console.log(window.location.pathname);
        const idDossier =
          window.location.pathname.split("/")[
            window.location.pathname.split("/").length - 1
          ];
        // console.log(idDossier);
        $.ajax({
          url: `/dossier/editStoreDossier/${idDossier}`,
          method: "POST",
          dataType: "json",
          data: { arrayToSend, arrayNew, dossierTitle: entitle },
          success: function (data) {
            console.log(data);
            if(data.status === "success") {
              swal.fire("Succès!", data.message, "success");
              const timer = setInterval(() => {
                window.location.replace("/dossiers");
                clearInterval(timer);
              }, 1500);
            } else {
              swal.fire("Erreurr!", 'Erreur pendant la modification', "error");
            }
          },
          error: function (error) {
            console.log(error);
            $(this).removeAttr("disabled");
            swal.fire("Erreurr!", 'Erreur pendant la modification', "error");
          },
        });
      }
    });
});

$("#confirmEditProjetButton").on("click", function () {
  // $(this).attr("disabled", true);
  const idProjetCommande = $(this).attr("idProjetCommandeDetail");
  const trFind = $("#projetCommandeEditList").find("tr");
  const inputRadioFind = $("#editProjetCommandeHeader input[type=radio]");
  const personneAvertir = $("#personneAvertir").val();
  // const personneAvertir2 = $("#personneAvertir2").val();
  // const personneAvertir = personneAvertir1
  //   ? `${personneAvertir1}${personneAvertir2 ? `;${personneAvertir2}` : ""}`
  //   : `${personneAvertir2}`;
  const infoChantier = $("#infoChantier").val();
  const dateEmission = $("#dateEmission").val();
  if (!dateEmission) {
    swal.fire("Erreur!", "Veuillez remplir les champs au dessus!", "error");
    return $("#dateEmission").addClass("is-invalid");
  }
  const checkChoosen = [];
  for (let t = 0; t < inputRadioFind.length; t++) {
    const inputRadio = inputRadioFind[t];
    if (inputRadio.checked) {
      checkChoosen.push(inputRadio.attributes["ref"].value);
      // console.log(inputRadio.attributes["ref"].value);
    }
  }
  if (checkChoosen.length == 0 || checkChoosen.length == 1) {
    swal.fire("Erreur!", "Veuillez faire le choix!", "error");
    return;
  }
  const arrayToSend = [];
  const arrayNew = [];
  for (let j = 0; j < trFind.length; j++) {
    const tr = trFind[j];
    const tdFind = $(tr).find("td[fromInputName]");
    if (tr.attributes["idDetail"].value.split("-").length > 1) {
      arrayNew.push({
        ref_post_budget: tdFind[0].innerHTML,
        numeroRef: tdFind[1].innerHTML,
        designationAffectation: tdFind[2].innerHTML,
        quantiteDemande: tdFind[3].innerHTML,
        observation: tdFind[4].innerHTML,
      });
    } else {
      arrayToSend.push({
        id: tr.attributes["idDetail"].value,
        ref_post_budget: tdFind[0].innerHTML,
        numeroRef: tdFind[1].innerHTML,
        designationAffectation: tdFind[2].innerHTML,
        quantiteDemande: tdFind[3].innerHTML,
        observation: tdFind[4].innerHTML,
      });
    }
    // console.log($(tr).find("td[fromInputName]"));
  }
  const idDossier =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  swal
    .fire({
      title: "Etes-vous sûr?",
      text: "Cette action va modifier les informations existantes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, enregistre!",
      cancelButtonText: "Non, j'annule",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `/dossier/projetCommande/storeEditProjetCommande/${idDossier}`,
          method: "POST",
          dataType: "json",
          data: {
            arrayToSend,
            arrayNew,
            personneAvertir,
            checkChoosen,
            dateEmission,
            infoChantier,
            idProjetCommande,
          },
          success: function (data) {
            // console.log('success', data);
            if (data.status == "success") {
              toastrMin.success("Success.", "Success", {
                positionClass: "toast-top-right",
                duration: 5000,
                style: "info",
              });
              const timer = setInterval(() => {
                window.location.replace('/dossier/projetCommande/'+ data.dataResponse.id_dossier_detail);
                clearInterval(timer);
              }, 1500);
            }
          },
          error: function (error) {
            // console.log(error);
            $(this).removeAttr("disabled");
            toastrMin.error("Erreur.", "Erreur", {
              positionClass: "toast-top-right",
              duration: 5000,
              style: "info",
            });
          },
        });
      }
    });
});

$("#confirmAddingPriceDossierButton").on("click", function () {
  // $(this).attr("disabled", true);
  const trFind = $("#addPriceDossierList").find("tr");
  const inputFiles = $("#addFileDiv input[name=fileDossier]").val();
  const arrayToSend = [];
  for (let j = 0; j < trFind.length; j++) {
    const tr = trFind[j];
    const tdFind = $(tr).find("td[fromInputName]");
    arrayToSend.push({
      id: tr.attributes["idDetail"].value,
      designation: tdFind[0].innerHTML,
      nombre: tdFind[1].innerHTML,
      unite: tdFind[2].innerHTML,
      quantite: tdFind[3].innerHTML,
      prixUnitaireHTVA: $(tdFind[4]).children().val(),
      prixTotalHTVA: $(tdFind[5]).children().val(),
    });
  }
  // console.log(arrayToSend);
  const idDossier =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  $.ajax({
    url: `/dossier/addPriceDossier/${idDossier}`,
    method: "POST",
    dataType: "json",
    data: { arrayToSend, inputFiles },
    success: function (data) {
      console.log(data);
      swal.fire("Succès!", "Validé.", "success");
      const timer = setInterval(() => {
        window.location.replace('/dossier/detail/'+ idDossier);
        clearInterval(timer);
      }, 1500);
    },
    error: function (error) {
      console.log(error);
      // $(this).removeAttr("disabled");
      swal.fire("Erreur!", "Validé.", "error");
    },
  });
});

$("input#InputPrixUnitaireHTVA").on("keyup", function (e) {
  const quantite = $(this).parent().parent().find("td[fromInputName=quantite]");
  const calc = parseInt(quantite.text(), 10) * $(this).val();
  const total = $(this)
    .parent()
    .parent()
    .find("td[fromInputName=prixTotalHTVA]");
  $(total).children().val(calc);
});

$("#dossierDetailConfirm").on("click", function (e) {
  const idDossier = $(this).attr("idDossier");
  swal
    .fire({
      title: "Etes-vous sûr?",
      text: "Vous etes sur le point de valider ce dossier!",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      denyButtonColor: "#A7A6A6",
      confirmButtonText: "Oui, je valide!",
      denyButtonText: `Oui, je valide le dossier et les projets de commande`,
      cancelButtonText: "Non, j'annule",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `/dossier/confirmDossier/${idDossier}`,
          method: "POST",
          dataType: "json",
          // data: { arrayToSend },
          success: function (data) {
            console.log(data);
            if (data.status == "success") {
              swal.fire("Succès!", "Validé.", "success");
              window.location.replace('/dossiers');
            } else {
              swal.fire("Erreur!", `${data.message}`, "error");
            }
            // const timer = setInterval(() => {
            //   javascript: history.back();
            //   window.location.reload()
            //   clearInterval(timer);
            // }, 1500);
          },
          error: function (error) {
            console.log(error);
            swal.fire("Erreur!", `Erreur`, "error");
          },
        });
      } else if (result.isDenied) {
        $.ajax({
          url: `/dossier/confirmDossier/${idDossier}`,
          method: "POST",
          dataType: "json",
          data: { withProject: true },
          success: function (data) {
            console.log(data);
            if (data.status == "success") {
              swal.fire("Succès!", "Validé.", "success");
              window.location.replace('/dossiers');
            } else {
              swal.fire("Erreur!", `${data.message}`, "error");
            }
            // const timer = setInterval(() => {
            //   javascript: history.back();
            //   window.location.reload()
            //   clearInterval(timer);
            // }, 1500);
          },
          error: function (error) {
            console.log(error);
            swal.fire("Erreur!", `Erreur`, "error");
          },
        });
      }
    });

  // console.log($(this).attr('idDossier'));
});

$("#dossierDetailRefuse").on("click", function (e) {
  const idDossier = $(this).attr("idDossier");
  swal
    .fire({
      title: "Etes-vous sûr?",
      text: "Vous etes sur le point de décliner ce dossier!",
      icon: "warning",
      showCancelButton: true,
      // showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      denyButtonColor: "#A7A6A6",
      confirmButtonText: "Oui, je décline!",
      // denyButtonText: `Oui, je valide le dossier et les projets de commande`,
      cancelButtonText: "Non, j'annule",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `/dossier/denieDossier/${idDossier}`,
          method: "POST",
          dataType: "json",
          // data: { arrayToSend },
          success: function (data) {
            console.log(data);
            if (data.status == "success") {
              swal.fire("Succès!", data.message, "success");
              window.location.replace('/dossiers');
            } else {
              swal.fire("Erreur!", `${data.message}`, "error");
            }
            // const timer = setInterval(() => {
            //   javascript: history.back();
            //   window.location.reload()
            //   clearInterval(timer);
            // }, 1500);
          },
          error: function (error) {
            console.log(error);
            swal.fire("Erreur!", `Erreur`, "error");
          },
        });
      } else if (result.isDenied) {
        $.ajax({
          url: `/dossier/confirmDossier/${idDossier}`,
          method: "POST",
          dataType: "json",
          data: { withProject: true },
          success: function (data) {
            console.log(data);
            if (data.status == "success") {
              swal.fire("Succès!", "Validé.", "success");
            } else {
              swal.fire("Erreur!", `${data.message}`, "error");
            }
            // const timer = setInterval(() => {
            //   javascript: history.back();
            //   window.location.reload()
            //   clearInterval(timer);
            // }, 1500);
          },
          error: function (error) {
            console.log(error);
            swal.fire("Erreur!", `Erreur`, "error");
          },
        });
      }
    });

  // console.log($(this).attr('idDossier'));
});
