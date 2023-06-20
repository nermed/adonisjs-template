import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProjetCommandesController {
  async index({ params, view }: HttpContextContract) {
    const dossier = (
      await Database.from("dossiers")
        .select(
          "dossiers.*",
          "dossier_details.id as detail_id",
          "dossier_details.*"
        )
        .leftJoin(
          "dossier_details",
          "dossier_details.id_dossier",
          "dossiers.id"
        )
        .where("dossier_details.id", params.id)
        .groupBy("dossiers.id")
    ).find((res) => res.detail_id == params.id);
    console.log(dossier);
    const projetCommande = await (
      await Database.from("projet_commandes").where(
        "id_dossier_detail",
        params.id
      )
    ).find((res) => res.id_dossier_detail == params.id);
    let projetCommandeDetails: any[] = [];
    let projetCommandeValidations: any;
    let projetCommandeMessages: any[] = [];
    if (projetCommande) {
      projetCommandeDetails = await Database.from(
        "projet_commande_details"
      ).where("id_projet_commande", projetCommande.id);
      projetCommandeValidations = await (
        await Database.from("projet_commande_validations").where(
          "id_projet_commande",
          projetCommande.id
        )
      ).find((res) => res.id_projet_commande == projetCommande.id);
      projetCommandeMessages = await Database.from("projet_commande_messages")
        .select(
          "projet_commande_messages.*",
          "users.username",
          "dossier_details.designation"
        )
        .leftJoin(
          "projet_commandes",
          "projet_commandes.id",
          "projet_commande_messages.id_projet_commande"
        )
        .leftJoin(
          "dossier_details",
          "dossier_details.id",
          "projet_commandes.id_dossier_detail"
        )
        .leftJoin("users", "users.id", "projet_commande_messages.created_by")
        .where("id_projet_commande", projetCommande.id);
    }
    return view.render("pages/projetCommandes/projetCommandeList", {
      title: "Projet de Commande",
      dossier,
      projetCommande,
      projetCommandeDetails,
      projetCommandeValidations,
      projetCommandeMessages,
      params,
    });
  }

  async addProjetCommande({
    bouncer,
    params,
    response,
    session,
    view,
  }: HttpContextContract) {
    if (await bouncer.denies("document_add_project")) {
      session.flash({ success: "Vous n'avez pas le droit!" });
      return response.redirect().back();
    }
    const projetCommande = await Database.from("projet_commandes").where(
      "id_dossier_detail",
      params.id
    );
    const dossier_detail = await (
      await Database.from("dossier_details").where("id", params.id)
    ).find((res) => res.id == params.id);
    return view.render("pages/projetCommandes/addProjetCommande", {
      title: "Ajouter un projet de Commande",
      projetCommande,
      dossier_detail,
      params,
    });
  }

  async editProjetCommande({
    bouncer,
    params,
    response,
    session,
    view,
  }: HttpContextContract) {
    if (await bouncer.denies("document_add_project")) {
      session.flash({ success: "Vous n'avez pas le droit!" });
      return response.redirect().back();
    }
    const projetCommande = await (
      await Database.from("projet_commandes").where("id", params.id)
    ).find((res) => res.id == params.id);
    let details: any[] = [];
    if (projetCommande) {
      details = await Database.from("projet_commande_details").where(
        "id_projet_commande",
        projetCommande.id
      );
    }

    return view.render("pages/projetCommandes/editProjetCommande", {
      title: "Modifier le projet de Commande",
      projetCommande,
      details,
      params,
    });
  }

  async storeProjetCommande({ auth, request, params }: HttpContextContract) {
    const {
      arrayToSend,
      checkChoosen,
      dateEmission,
      infoChantier,
      personneAvertir1,
      personneAvertir2,
    } = request.all();
    const userId = auth.user?.id;
    const projetCommande = await Database.table("projet_commandes")
      .returning("id")
      .insert({
        id_dossier_detail: params.id,
        date_emission: dateEmission,
        info_chantier: infoChantier,
        traitement: checkChoosen[0],
        origineProjet: checkChoosen[1],
        personneAvertir: `${personneAvertir1};${personneAvertir2}`,
        created_by: userId,
      });
    if (projetCommande) {
      for (let i = 0; i < arrayToSend.length; i++) {
        const detail = arrayToSend[i];
        await Database.table("projet_commande_details")
          .returning("id")
          .insert({
            id_projet_commande: projetCommande,
            ...detail,
            created_by: userId,
          });
      }
      await Database.table("projet_commande_validations").insert({
        id_projet_commande: projetCommande,
        serviceDemandeur: "2",
        dispoBudgetaire: "2",
        directionFondsRoutier: "2",
        dtr: "2",
        dgArb: "2",
      });
    }
    return { status: "success", message: "Succès!" };
  }
  async storeEditProjetCommande({
    auth,
    request,
  }: HttpContextContract) {
    const {
      arrayToSend,
      arrayNew,
      checkChoosen,
      dateEmission,
      infoChantier,
      personneAvertir,
      idProjetCommande,
    } = request.all();
    const userId = auth.user?.id;
    const projetCommande = await Database.from("projet_commandes")
      .where("id", idProjetCommande)
      .update({
        date_emission: dateEmission,
        info_chantier: infoChantier,
        traitement: checkChoosen[0],
        origineProjet: checkChoosen[1],
        personneAvertir: personneAvertir ? personneAvertir : "",
      });
    if (projetCommande) {
      if (arrayToSend) {
        for (let i = 0; i < arrayToSend.length; i++) {
          const detail = arrayToSend[i];
          await Database.from("projet_commande_details")
            .where("id", detail.id)
            .update({
              ref_post_budget: detail.ref_post_budget,
              numeroRef: detail.numeroRef,
              designationAffectation: detail.designationAffectation,
              quantiteDemande: detail.quantiteDemande,
              montantEstime: detail.montantEstime,
              niveauStockMagasin: detail.niveauStockMagasin,
              observation: detail.observation,
            });
        }
      }
      if (arrayNew) {
        for (let i = 0; i < arrayNew.length; i++) {
          const detailNew = arrayNew[i];
          await Database.table("projet_commande_details").insert({
            ...detailNew,
            created_by: userId,
          });
        }
      }
    }
    return { status: "success", message: "Success" };
  }

  async confirmProjetCommande({
    auth,
    bouncer,
    request,
    params,
  }: HttpContextContract) {
    const { type, choice, message } = request.all();
    const dossier = await (
      await Database.from("projet_commandes")
        .leftJoin(
          "dossier_details",
          "dossier_details.id",
          "projet_commandes.id_dossier_detail"
        )
        .leftJoin("dossiers", "dossiers.id", "dossier_details.id_dossier")
        .select(
          "dossiers.id as id_dossier",
          "dossiers.*",
          "dossier_details.id as id_dossier_detail",
          "projet_commandes.id as id_projet_commande"
        )
        .where("projet_commandes.id", params.id)
    ).find((res) => res.id_projet_commande == params.id);
    switch (type) {
      case "service_demandeur": {
        if (
          (await bouncer.allows("document_validate_service_demande")) ||
          choice == "renvoie"
        ) {
          const validation = await (
            await Database.from("projet_commande_validations").where(
              "id_projet_commande",
              params.id
            )
          ).find((res) => res.id_projet_commande == params.id);
          if (validation) {
            await Database.from("projet_commande_validations")
              .where("id_projet_commande", params.id)
              .update({
                serviceDemandeur: choice == "validate" ? "1" : "0",
              });
            return {
              status: "success",
              message: "Validation effectuée avec le succès!",
            };
          } else {
            await Database.table("projet_commande_validations").insert({
              id_projet_commande: params.id,
              serviceDemandeur: choice == "validate" ? "1" : "0",
              dispoBudgetaire: "2",
              directionFondsRoutier: "2",
              dtr: "2",
              dgArb: "2",
            });
            return {
              status: "success",
              message: "Validation effectuée avec le succès!",
            };
          }
        } else {
          return {
            status: "error",
            message: "Vous n'avez pas le droit de valider à cette place!",
          };
        }
      }
      case "dispo_budgetaire": {
        if (
          (await bouncer.allows(
            "document_validate_disponibilite_budgetaire"
          )) ||
          choice == "renvoie"
        ) {
          await Database.from("projet_commande_validations")
            .where("id_projet_commande", params.id)
            .update({
              dispoBudgetaire:
                choice == "validate" ? "1" : choice == "renvoie" ? "2" : "0",
            });
          if (message) {
            await Database.table("projet_commande_messages").insert({
              id_projet_commande: params.id,
              message,
              created_by: auth.user?.id,
              reference: dossier.assigned_to,
            });
          }

          return {
            status: "success",
            message: "Validation effectuée avec le succès!",
          };
        } else {
          return {
            status: "error",
            message: "Vous n'avez pas le droit de valider à cette place!",
          };
        }
      }
      case "dfr": {
        if (
          (await bouncer.allows("document_validate_fonds_routier")) ||
          choice == "renvoie"
        ) {
          // const validation = await (
          //   await Database.from("projet_commande_validations").where(
          //     "id_projet_commande",
          //     params.id
          //   )
          // ).find((res) => res.id_projet_commande == params.id);
          await Database.from("projet_commande_validations")
            .where("id_projet_commande", params.id)
            .update({
              directionFondsRoutier:
                choice == "validate" ? "1" : choice == "renvoie" ? "2" : "0",
            });
          if (message) {
            await Database.table("projet_commande_messages").insert({
              id_projet_commande: params.id,
              message,
              created_by: auth.user?.id,
              reference: dossier.assigned_to,
            });
          }
          return {
            status: "success",
            message: "Validation effectuée avec le succès!",
          };
        } else {
          return {
            status: "error",
            message: "Vous n'avez pas le droit de valider à cette place!",
          };
        }
      }
      case "dtr": {
        if (
          (await bouncer.allows("document_validate_direction")) ||
          choice == "renvoie"
        ) {
          // const validation = await (
          //   await Database.from("projet_commande_validations").where(
          //     "id_projet_commande",
          //     params.id
          //   )
          // ).find((res) => res.id_projet_commande == params.id);
          await Database.from("projet_commande_validations")
            .where("id_projet_commande", params.id)
            .update({
              dtr: choice == "validate" ? "1" : choice == "renvoie" ? "2" : "0",
            });
          if (message) {
            await Database.table("projet_commande_messages").insert({
              id_projet_commande: params.id,
              message,
              created_by: auth.user?.id,
              reference: dossier.assigned_to,
            });
          }
          return {
            status: "success",
            message: "Validation effectuée avec le succès!",
          };
        } else {
          return {
            status: "error",
            message: "Vous n'avez pas le droit de valider à cette place!",
          };
        }
      }
      case "dg": {
        if (
          (await bouncer.allows("document_validate_autorisation_dg_arb")) ||
          choice == "renvoie"
        ) {
          // const validation = await (
          //   await Database.from("projet_commande_validations").where(
          //     "id_projet_commande",
          //     params.id
          //   )
          // ).find((res) => res.id_projet_commande == params.id);
          await Database.from("projet_commande_validations")
            .where("id_projet_commande", params.id)
            .update({
              dgArb:
                choice == "validate" ? "1" : choice == "renvoie" ? "2" : "0",
            });
          if (message) {
            await Database.table("projet_commande_messages").insert({
              id_projet_commande: params.id,
              message,
              created_by: auth.user?.id,
              reference: dossier.assigned_to,
            });
          }
          return {
            status: "success",
            message: "Validation effectuée avec le succès!",
          };
        } else {
          return {
            status: "error",
            message: "Vous n'avez pas le droit de valider à cette place!",
          };
        }
      }

      default:
        break;
    }
  }
}
