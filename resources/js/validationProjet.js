// const swal = require("../views/layout/plugins/sweetalert2/sweetalert2.all");
import swal from "../views/layout/plugins/sweetalert2/sweetalert2.all";
const toastrMin = require("../views/layout/plugins/toastr/toastr.min");

// service demandeur
$("#validateServiceDemadeur").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({
    projetCommandeId,
    type: "service_demandeur",
    choice: "validate",
  });
});
$("#declineServiceDemadeur").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  declineFn({ projetCommandeId, type: "service_demandeur", choice: "decline" });
});

// dispo budgetaire
$("#validateDispoBudgetaire").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({
    projetCommandeId,
    type: "dispo_budgetaire",
    choice: "validate",
  });
});
$("#declineDispoBudgetaire").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  declineFn({ projetCommandeId, type: "dispo_budgetaire", choice: "decline" });
});
$("#renvoieDispoBudgetaire").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dispo_budgetaire", choice: "renvoie" });
});

// directeur de fonds routier
$("#validateDFR").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dfr", choice: "validate" });
});
$("#declineDFR").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  declineFn({ projetCommandeId, type: "dfr", choice: "decline" });
});
$("#renvoieDFR").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dfr", choice: "renvoie" });
});

// dtr
$("#validateDTR").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dtr", choice: "validate" });
});
$("#declineDTR").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  declineFn({ projetCommandeId, type: "dtr", choice: "decline" });
});
$("#renvoieDTR").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dtr", choice: "renvoie" });
});

// dg
$("#validateDG").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dg", choice: "validate" });
});
$("#declineDG").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  declineFn({ projetCommandeId, type: "dg", choice: "decline" });
});
$("#renvoieDG").on("click", function () {
  const projetCommandeId = $(this).attr("projetCommandeId");
  validateFn({ projetCommandeId, type: "dg", choice: "renvoie" });
});

const validateFn = ({ projetCommandeId, type, choice }) => {
  swal
    .fire({
      title: "Etes-vous sûr?",
      text:
        choice == "renvoie"
          ? "Vous êtes sur le point de renvoyer ce projet de commande!"
          : "Vous êtes sur le point de valider ce projet de commande!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        choice == "renvoie" ? "Oui, je renvoie" : "Oui, je valide!",
      cancelButtonText: "Non, j'annule",
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `http://127.0.0.1:3333/dossier/projetCommande/confirmProjetCommande/${projetCommandeId}`,
          method: "POST",
          dataType: "json",
          data: { type, choice },
          success: function (data) {
            console.log(data);
            if (data.status == "success") {
              swal.fire(
                "Succès!",
                choice == "renvoie" ? "Renvoie effectué" : data.message,
                "success"
              );
              setInterval(() => {
                window.location.reload();
              }, 1500);
            } else {
              swal.fire("Erreur!", `${data.message}`, "error");
            }
          },
          error: function (error) {
            console.log(error);
            swal.fire("Erreur!", `Erreur`, "error");
          },
        });
      }
    });
};

const declineFn = ({ projetCommandeId, type, choice }) => {
  swal.fire({
    title: "Veuillez indiquer la raison du déclin",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Soumettre",
    cancelButtonText: "Non, j'annule",
    showLoaderOnConfirm: true,
    preConfirm: async (message) => {
      $.ajax({
        url: `http://127.0.0.1:3333/dossier/projetCommande/confirmProjetCommande/${projetCommandeId}`,
        method: "POST",
        dataType: "json",
        data: { type, choice, message },
        success: function (data) {
          console.log(data);
          if (data.status == "success") {
            swal.fire("Succès!", "L'opération a été effectuée", "success");
            setInterval(() => {
              window.location.reload();
            }, 1500);
          } else {
            swal.fire("Erreur!", `${data.message}`, "error");
          }
        },
        error: function (error) {
          console.log(error);
          swal.fire("Erreur!", `Erreur`, "error");
        },
      });
    },
    allowOutsideClick: () => !swal.isLoading(),
  });
  // swal
  //   .fire({
  //     title: "Etes-vous sûr?",
  //     text: "Vous etes sur le point de valider ce projet de commande!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Oui, je valide!",
  //     cancelButtonText: "Non, j'annule",
  //   })
  //   .then((result) => {
  //     if (result.isConfirmed) {
  //       $.ajax({
  //         url: `http://127.0.0.1:3333/dossier/projetCommande/confirmProjetCommande/${projetCommandeId}`,
  //         method: "POST",
  //         dataType: "json",
  //         data: { type, choice },
  //         success: function (data) {
  //           console.log(data);
  //           if (data.status == "success") {
  //             swal.fire("Succès!", data.message, "success");
  //             setInterval(() => {
  //               window.location.reload();
  //             }, 1500)
  //           } else {
  //             swal.fire("Erreur!", `${data.message}`, "error");
  //           }
  //         },
  //         error: function (error) {
  //           console.log(error);
  //           swal.fire("Erreur!", `Erreur`, "error");
  //         },
  //       });
  //     }
  //   });
};
