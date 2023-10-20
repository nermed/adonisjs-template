import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ModeSuivi from "App/Models/ModeSuivi";
import User from "App/Models/User";
import formatAmount from "Helpers/formatAmount";

export default class DossiersController {
  async index({ auth, request, view }: HttpContextContract) {
    // const page = request.input("page", 1);
    const userId = auth.user?.id;
    const tablename = "dossiers";
    const affectations = await Database.from(tablename)
      .leftJoin(User.table, `${User.table}.id`, `${tablename}.assigned_to`)
      .select(
        `${tablename}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
        // `"ingenieur" as ingenieur`
      )
      .where(`${tablename}.deleted_status`, "0")
      .where(`${tablename}.assigned_to`, userId)
      .where(`${tablename}.dossier_niveau`, "0")
      // .orderBy(`${tablename}.created_at`, 'desc');
    const userInGroups = await Database.from("user_to_groups").where(
      "user_id",
      userId
    );
    console.log(userInGroups);
    if (userInGroups.some((group) => group.group_id == "6")) {
      const dossiers = await this.getDossiersIngenieur(auth, request);
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    } else if (userInGroups.some((group) => group.group_id == "7")) {
      const dossiers = await this.getDossiers(request, "2");
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    } else if (userInGroups.some((group) => group.group_id == "8")) {
      const dossiers = await this.getDossiers(request, "3");
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    } else if (userInGroups.some((group) => group.group_id == "9")) {
      const dossiers = await this.getDossiers(request, "4");
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    } else if (userInGroups.some((group) => group.group_id == "13")) {
      const dossiers = await this.getDossiers(request, "5");
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    } else if (userInGroups.some((group) => group.group_id == "12")) {
      const dossiers = await this.getDossiers(request, "6");
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    } else if (userInGroups.some((group) => group.group_id == "14")) {
      const dossiers = await this.getDossiers(request, "7");
      return view.render("pages/dossiers/index", {
        title: "Dossiers",
        dossiers,
        affectations,
      });
    }
    // return view.render("pages/dossiers/index", { title: "Dossiers", dossiers });
  }
  private async getDossiers(
    // auth: HttpContextContract["auth"],
    request: HttpContextContract["request"],
    niveau: string
  ) {
    const page = request.input("page", 1);
    // const userId = auth.user?.id;
    const tablename = "dossiers";
    const dossiers = await Database.from(tablename)
      .leftJoin(User.table, `${User.table}.id`, `${tablename}.assigned_to`)
      .select(
        `${tablename}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
      )
      .where(`${tablename}.deleted_status`, "0")
      .where(`${tablename}.dossier_niveau`, niveau)
      .orderBy(`${tablename}.id`, "desc")
      .paginate(page, 10);
    return dossiers.baseUrl("/dossiers");
  }
  private async getDossiersIngenieur(
    auth: HttpContextContract["auth"],
    request: HttpContextContract["request"]
    // niveau: string
  ) {
    const page = request.input("page", 1);
    const userId = auth.user?.id;
    const tablename = "dossiers";
    const dossiers = await Database.from(tablename)
      .leftJoin(User.table, `${User.table}.id`, `${tablename}.assigned_to`)
      .select(
        `${tablename}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
        // `"ingenieur" as ingenieur`
      )
      .where(`${tablename}.deleted_status`, "0")
      .where(`${tablename}.assigned_to`, userId)
      .where(`${tablename}.dossier_niveau`, ">", "0")
      .orderBy(`${tablename}.id`, "desc")
      .paginate(page, 10);
    return dossiers.baseUrl("/dossiers");
  }
  async addDossier({ bouncer, view }: HttpContextContract) {
    if (await bouncer.allows("document_create")) {
      if (await bouncer.allows("document_create")) {
        const users = await Database.from("users")
          .leftJoin("user_to_groups", "user_to_groups.user_id", "users.id")
          .select("users.*")
          .where("user_to_groups.group_id", 6);
        return view.render("pages/dossiers/createDossier", {
          title: "Créer un dossier",
          users,
        });
      }
      return view.render("pages/dossiers/addDossier", {
        title: "Ajouter un dossier",
      });
    } else {
      console.log("ok");
      return view.render("layout/403.edge");
    }
  }
  async editDossier({ bouncer, params, response, view }: HttpContextContract) {
    // if (await bouncer.denies("document_edit")) {
    //   return response.redirect().back();
    // } else {
    const dossier = await (
      await Database.from("dossiers").select("*")
    ).find((res) => res.id == params.id);
    const details = await Database.from("dossier_details").where(
      "id_dossier",
      params.id
    );
    if (await bouncer.allows("document_add_price")) {
      return view.render("pages/dossiers/addingPriceDossier", {
        title: "Ajouter le prix",
        dossier,
        details,
        params,
      });
    } else if (await bouncer.allows("document_edit", dossier)) {
      if (dossier.dossier_niveau == "2") {
        return response.redirect().back();
      } else {
        return view.render("pages/dossiers/editDossier", {
          title: "Modifier le dossier",
          dossier,
          details,
          params,
        });
      }
    } else {
      return response.redirect().back();
    }
    // }
  }
  async seeAssignByIngenieur({ auth, request, view }: HttpContextContract) {
    const page = request.input("page", 1);
    const userId = auth.user?.id;
    const tablename = "dossiers";
    const dossiers = await Database.from(tablename)
      .leftJoin(User.table, `${User.table}.id`, `${tablename}.assigned_to`)
      .select(
        `${tablename}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
        // `"ingenieur" as ingenieur`
      )
      .where(`${tablename}.deleted_status`, "0")
      .where(`${tablename}.assigned_to`, userId)
      .where(`${tablename}.dossier_niveau`, "0")
      .paginate(page, 10);
    dossiers.baseUrl("/dossiers");
    return view.render("pages/dossiers/affectationsByIngenieur", {
      title: "Affectations",
      dossiers,
    });
  }
  async storeDossier({ auth, request }: HttpContextContract) {
    const { assign, assigns, dossierTitle, message } = request.all();
    const userId = auth.user?.id;
    // Ws.io.emit("new:dossier", { assign, assigns });
    const data = {
      title: dossierTitle,
      assigned_to: assign,
      assigned_to_others: assigns && assigns.length > 0 ? assigns.join(";") : '',
      message: message,
      dossier_niveau: "0",
      created_by: userId,
    };
    const dossier = await Database.table("dossiers")
      .returning("id")
      .insert(data);
    if (dossier) {
      await Database.table(ModeSuivi.table).insert({
        reference: "Création du dossier",
        details: { id: dossier[0], ...data },
        created_by: userId,
      });
      return {
        status: "success",
        message: "Le dossier a été créé avec succès!",
      };
    } else {
      return {
        status: "error",
        message: "Erreur pendant la création! Veuillez réessayer encore!",
      };
    }
  }
  async editStoreDossier({ auth, params, request }: HttpContextContract) {
    const { arrayToSend, arrayNew, dossierTitle } = request.all();
    const details = await Database.from("dossier_details").where(
      "id_dossier",
      params.id
    );
    if (details.length > 0) {
      details.forEach(async (detail) => {
        const findDetail = arrayToSend.find((arr: any) => arr.id == detail.id);
        if (findDetail) {
          await Database.from("dossier_details")
            .where("id", findDetail.id)
            .update({
              designation: findDetail.designation,
              nombre: 0,
              unite: findDetail.unite,
              quantite: findDetail.quantite,
            });
        } else {
          const projetCommande = await Database.from("projet_commandes").where(
            "id_dossier_detail",
            detail.id
          );
          if (projetCommande.length > 0) {
            projetCommande.forEach(async (commande) => {
              await Database.from("projet_commande_details")
                .where("id_projet_commande", commande.id)
                .delete();
            });
            await Database.from("projet_commandes")
              .where("id_dossier_detail", detail.id)
              .delete();
          }
          await Database.from("dossier_details")
            .where("id", detail.id)
            .delete();
        }
      });
    }
    if (arrayNew) {
      arrayNew.forEach(async (item: any) => {
        await Database.table("dossier_details").insert({
          id_dossier: params.id,
          nombre: 0,
          ...item,
        });
      });
    } else {
    }
    const dossier = await (
      await Database.from("dossiers").where("id", params.id)
    ).find((res) => res.id == params.id);
    await Database.from("dossiers")
      .where("id", params.id)
      .update({
        title: dossierTitle,
        dossier_niveau:
          dossier.dossier_niveau == "0" ? "1" : dossier.dossier_niveau,
      });
    await Database.table(ModeSuivi.table).insert({
      reference: "Modification du dossier",
      details: { id: dossier.id, arrayNew, arrayToSend },
      created_by: auth.user?.id,
    });
    return { status: "success", message: "Succès!" };
  }
  async addPriceDossier({ auth, params, request }: HttpContextContract) {
    const { arrayToSend } = request.all();
    // return request.all();
    if (arrayToSend) {
      arrayToSend.forEach(async (item: any) => {
        await Database.from("dossier_details").where("id", item.id).update({
          prixUnitaireHTVA: item.prixUnitaireHTVA,
          prixTotalHTVA: item.prixTotalHTVA,
        });
      });
    }

    await Database.from("dossiers").where("id", params.id).update({
      taped_price_by: auth.user?.id,
      taped_price_at: new Date(),
    });
    await Database.table(ModeSuivi.table).insert({
      reference: "Ajout de prix sur le dossier",
      details: { id: params.id, arrayToSend },
      created_by: auth.user?.id,
    });
    return true;
  }
  async detailDossier({ params, view }: HttpContextContract) {
    const dossier = await Database.from("dossiers").where("id", params.id);
    let nombreTotal = 0;
    let uniteTotal = 0;
    let quantite = 0;
    let prixUnitaireHTVATotal = 0;
    let prixTotalHTVATotal = 0;
    const tablename = "dossier_details";
    let messages: any[] = [];
    const details = await Database.from(tablename)
      .leftJoin(
        "projet_commandes",
        `projet_commandes.id_dossier_detail`,
        `${tablename}.id`
      )
      .select(`${tablename}.*`, `projet_commandes.id as id_projet_commande`)
      .where(`${tablename}.id_dossier`, params.id);
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      nombreTotal += detail.nombre;
      uniteTotal += detail.unite;
      quantite += detail.quantite;
      prixUnitaireHTVATotal += detail.prixUnitaireHTVA;
      prixTotalHTVATotal += detail.prixTotalHTVA;
      if (detail.id_projet_commande) {
        const messagesRequest = await Database.from("projet_commande_messages")
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
          .where("id_projet_commande", detail.id_projet_commande);
        messages = [...messages, ...messagesRequest];
      }
    }
    const totals = {
      nombreTotal,
      uniteTotal,
      quantite,
      prixTotalHTVATotal,
      prixUnitaireHTVATotal,
    };
    return view.render("pages/dossiers/detailDossier", {
      title: "Detail",
      dossier,
      details,
      totals,
      formatAmount,
      messages,
    });
  }
  async confirmDossier({
    auth,
    bouncer,
    request,
    params,
  }: HttpContextContract) {
    const dossier = await (
      await Database.from("dossiers").where("id", params.id)
    ).find((res) => res.id == params.id);
    const { withProject } = request.all();
    switch (dossier.dossier_niveau) {
      case "1": {
        // 1 ingenieur
        const details = await this.getDetailsBeforeConfirm(params);
        console.log(details);
        if (details.every((detail) => detail.id_projet_commande)) {
          if (withProject) {
            for (let i = 0; i < details.length; i++) {
              const detail = details[i];
              if (detail.id_projet_commande) {
                await Database.from("projet_commande_validations")
                  .where("id_projet_commande", detail.id_projet_commande)
                  .update({
                    serviceDemandeur: "1",
                  });
              }
            }
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "2" });
            await this.modeSuivi(
              "Confirmation du dossier par l'ingénieur et envoie au service de commission",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été envoyé au Président de commission",
            };
          } else if (
            details.every((detail) => detail.serviceDemandeur == "1")
          ) {
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "2" });
            await this.modeSuivi(
              "Confirmation du dossier par l'ingénieur et envoie au service de commission",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été envoyé au Président de commission",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez valider les projets de commande!",
            };
          }
        } else {
          return {
            status: "error",
            message:
              "Certains points sur le dossier n'ont pas des projets de commande",
          };
        }
      }
      case "2": {
        // 2 president commission
        if (await bouncer.denies("document_validate_president_commission")) {
          return {
            status: "error",
            message: "Seuls le Président de Commission peut valider",
          };
        } else {
          await Database.from("dossiers")
            .where("id", params.id)
            .update({ dossier_niveau: "3" });
          await this.modeSuivi(
            "Confirmation du dossier par le service de commission et envoie au service budgétaire",
            auth,
            { id: params.id }
          );
          return {
            status: "success",
            message:
              "Le dossier a été validé et envoyé au Responsable de Budget",
          };
        }
      }
      case "3": {
        // 3 disponibilité budgétaire
        if (
          await bouncer.denies("document_validate_disponibilite_budgetaire")
        ) {
          return {
            status: "error",
            message:
              "Seuls le Responsabe de Disponibilité Budgétaire peut valider!",
          };
        } else {
          const details = await this.getDetailsBeforeConfirm(params);
          if (withProject) {
            for (let i = 0; i < details.length; i++) {
              const detail = details[i];
              if (detail.id_projet_commande) {
                await Database.from("projet_commande_validations")
                  .where("id_projet_commande", detail.id_projet_commande)
                  .update({
                    dispoBudgetaire: "1",
                  });
              }
            }
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "4" });
            await this.modeSuivi(
              "Confirmation du dossier par le service budgétaire et envoie au service de fonds routier",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message:
                "Le dossier a été validé et envoyé au Directeur du Fonds Routier",
            };
          } else if (details.every((detail) => detail.dispoBudgetaire == "1")) {
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "4" });
            await this.modeSuivi(
              "Confirmation du dossier par le service budgétaire et envoie au service de fonds routier",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message:
                "Le dossier a été validé et envoyé au Directeur du Fonds Routier",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez valider les projets de commande!",
            };
          }
        }
      }
      case "4": {
        // 4 directeur du fonds routier
        if (await bouncer.denies("document_validate_fonds_routier")) {
          return {
            status: "error",
            message:
              "Seuls le Responsabe du Directeur de Fonds Routier peut valider!",
          };
        } else {
          const details = await this.getDetailsBeforeConfirm(params);
          if (withProject) {
            for (let i = 0; i < details.length; i++) {
              const detail = details[i];
              if (detail.id_projet_commande) {
                await Database.from("projet_commande_validations")
                  .where("id_projet_commande", detail.id_projet_commande)
                  .update({
                    directionFondsRoutier: "1",
                  });
              }
            }
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "5" });
            await this.modeSuivi(
              "Confirmation du dossier par le service de fonds routier et envoie au DTR",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été validé et envoyé au DTR",
            };
          } else if (
            details.every((detail) => detail.directionFondsRoutier == "1")
          ) {
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "5" });
            await this.modeSuivi(
              "Confirmation du dossier par le service de fonds routier et envoie au DTR",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été validé et envoyé au DTR",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez valider les projets de commande!",
            };
          }
        }
      }
      case "5": {
        // 5 autorisation du DTR
        if (await bouncer.denies("document_validate_direction")) {
          return {
            status: "error",
            message: "Seuls le Responsabe de DTR peut valider!",
          };
        } else {
          const details = await this.getDetailsBeforeConfirm(params);
          if (withProject) {
            for (let i = 0; i < details.length; i++) {
              const detail = details[i];
              if (detail.id_projet_commande) {
                await Database.from("projet_commande_validations")
                  .where("id_projet_commande", detail.id_projet_commande)
                  .update({
                    dtr: "1",
                  });
              }
            }
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "6" });
            await this.modeSuivi(
              "Confirmation du dossier par le DTR et envoie au DG",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été validé et envoyé au DG",
            };
          } else if (
            details.every((detail) => detail.directionFondsRoutier == "1")
          ) {
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "6" });
            await this.modeSuivi(
              "Confirmation du dossier par le DTR et envoie au DG",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été validé et envoyé au DG",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez valider les projets de commande!",
            };
          }
        }
      }
      case "6": {
        // 6 autorisation du DG
        if (await bouncer.denies("document_validate_autorisation_dg_arb")) {
          return {
            status: "error",
            message: "Seuls le DG/ARB peut valider!",
          };
        } else {
          const details = await this.getDetailsBeforeConfirm(params);
          if (withProject) {
            for (let i = 0; i < details.length; i++) {
              const detail = details[i];
              if (detail.id_projet_commande) {
                await Database.from("projet_commande_validations")
                  .where("id_projet_commande", detail.id_projet_commande)
                  .update({
                    dgArb: "1",
                  });
              }
            }
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "7" });
            await this.modeSuivi(
              "Confirmation du dossier par le DG et envoie au sécrétariat",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été validé et envoyé au secretaire",
            };
          } else if (details.every((detail) => detail.dgArb == "1")) {
            await Database.from("dossiers")
              .where("id", params.id)
              .update({ dossier_niveau: "7" });
            await this.modeSuivi(
              "Confirmation du dossier par le DG et envoie au sécrétariat",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été validé et envoyé au secretaire",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez valider les projets de commande!",
            };
          }
        }
      }
      default:
        break;
    }
    return dossier;
  }
  private async getDetailsBeforeConfirm(params: HttpContextContract["params"]) {
    const tablename = "dossier_details";
    return await Database.from(tablename)
      .leftJoin(
        "projet_commandes",
        `projet_commandes.id_dossier_detail`,
        `${tablename}.id`
      )
      .leftJoin(
        "projet_commande_validations",
        "projet_commande_validations.id_projet_commande",
        "projet_commandes.id"
      )
      .select(
        `${tablename}.*`,
        `projet_commandes.id as id_projet_commande`,
        "projet_commande_validations.id as id_projet_commande_validation",
        "projet_commande_validations.*"
      )
      .where(`${tablename}.id_dossier`, params.id);
  }
  async denieDossier({ auth, bouncer, params }: HttpContextContract) {
    const dossier = await (
      await Database.from("dossiers").where("id", params.id)
    ).find((res) => res.id == params.id);
    // const { withProject } = request.all();
    switch (dossier.dossier_niveau) {
      case "1": {
        // 1 ingenieur
        return {
          status: "error",
          message: "Vous ne pouvez pas décliner",
        };
      }
      case "2": {
        // 2 president commission
        if (await bouncer.denies("document_validate_president_commission")) {
          return {
            status: "error",
            message: "Seuls le Président de Commission peut décliner",
          };
        } else {
          await Database.from("dossiers")
            .where("id", params.id)
            .update({ dossier_niveau: "1" });
          await this.modeSuivi(
            "Déclin du dossier par le Président de commission et le dossier revient à l'ingénieur",
            auth,
            { id: params.id }
          );
          return {
            status: "success",
            message: "Le dossier a été décliné et envoyé à l'ingénieur",
          };
        }
      }
      case "3": {
        // 3 disponibilité budgétaire
        if (
          await bouncer.denies("document_validate_disponibilite_budgetaire")
        ) {
          return {
            status: "error",
            message:
              "Seuls le Responsabe de Disponibilité Budgétaire peut décliner!",
          };
        } else {
          const dossier = await Database.from("dossiers")
            .where("id", params.id)
            .update({ dossier_niveau: "2" });
          if (dossier) {
            await this.modeSuivi(
              "Déclin du dossier par le Responsable du Budget et le dossier revient au Responsable de Commission",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message:
                "Le dossier a été décliné et envoyé au Président de commission",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez réessayer encore!",
            };
          }
        }
      }
      case "4": {
        // 4 directeur du fonds routier
        if (await bouncer.denies("document_validate_fonds_routier")) {
          return {
            status: "error",
            message:
              "Seuls le Responsabe du Directeur de Fonds Routier peut décliner!",
          };
        } else {
          const dossier = await Database.from("dossiers")
            .where("id", params.id)
            .update({ dossier_niveau: "3" });
          if (dossier) {
            await this.modeSuivi(
              "Déclin du dossier par le Directeur de Fonds et le dossier revient au Responsable de Budget",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message:
                "Le dossier a été décliné et envoyé au Responsable de Budget",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez réessayer encore!",
            };
          }
        }
      }
      case "5": {
        // 5 autorisation du DTR
        if (await bouncer.denies("document_validate_direction")) {
          return {
            status: "error",
            message: "Seuls le Responsabe de DTR peut décliner!",
          };
        } else {
          const dossier = await Database.from("dossiers")
            .where("id", params.id)
            .update({ dossier_niveau: "4" });
          if (dossier) {
            await this.modeSuivi(
              "Déclin du dossier par le DTR et le dossier revient au Directeur de Fonds Routier",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message:
                "Le dossier a été décliné et envoyé au Directeur de Fonds Routier",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez réessayer encore!",
            };
          }
        }
      }
      case "6": {
        // 6 autorisation du DG
        if (await bouncer.denies("document_validate_autorisation_dg_arb")) {
          return {
            status: "error",
            message: "Seuls le DG/ARB peut décliner!",
          };
        } else {
          const dossier = await Database.from("dossiers")
            .where("id", params.id)
            .update({ dossier_niveau: "5" });
          if (dossier) {
            await this.modeSuivi(
              "Déclin du dossier par le DG et le dossier revient au DTR",
              auth,
              { id: params.id }
            );
            return {
              status: "success",
              message: "Le dossier a été décliné et envoyé au DTR",
            };
          } else {
            return {
              status: "error",
              message:
                "Erreur pendant la validation! Veuillez réessayer encore!",
            };
          }
        }
      }
      default:
        break;
    }
  }
  async uploadFile({ request }: HttpContextContract) {
    return request.all();
  }
  private async modeSuivi(
    ref: string,
    auth: HttpContextContract["auth"],
    details: any
  ) {
    await Database.table(ModeSuivi.table).insert({
      reference: ref,
      details: details,
      created_by: auth.user?.id,
    });
  }
}
