import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Fournisseur from "App/Models/Fournisseur";
import ModeSuivi from "App/Models/ModeSuivi";

export default class FournisseursController {
  async index({ request, view }: HttpContextContract) {
    const page = request.input("page", 1);
    const fournisseurs = await Database.from(Fournisseur.table)
      .leftJoin(
        "fournisseur_categories",
        "fournisseur_categories.id",
        `${Fournisseur.table}.id`
      )
      .select(`${Fournisseur.table}.*`, 'fournisseur_categories.name as categoryName')
      .paginate(page, 10);
    return view.render("pages/fournisseurs/list", {
      title: "Fournisseurs",
      fournisseurs: fournisseurs,
    });
  }
  async addViewFournisseur({ view }: HttpContextContract) {
    const categories = await Database.from("fournisseur_categories");
    return view.render("pages/fournisseurs/addFournisseur", {
      title: "Ajouter un fournisseur",
      categories,
    });
  }
  async editViewFournisseur({ params, view }: HttpContextContract) {
    const categories = await Database.from("fournisseur_categories");
    const fournisseur = await (
      await Database.from("fournisseurs").where("id", params.id)
    ).find((res) => res.id == params.id);
    console.log(fournisseur);
    return view.render("pages/fournisseurs/editFournisseur", {
      title: "Modifier les informations du fournisseur",
      categories,
      fournisseur,
    });
  }
  async storeFournisseur({ auth, request }: HttpContextContract) {
    const requestData = request.all();
    const data = requestData.data;
    const categorieId = await Database.table(Fournisseur.table)
      .returning("id")
      .insert({ ...data });
    if (categorieId) {
      await Database.table(ModeSuivi.table).insert({
        reference: "Ajout d'un fournisseur",
        details: data,
        created_by: auth.user?.id,
      });
      return { status: "success", message: "Ajout effectué avec succès!" };
    } else {
      return {
        status: "error",
        message: "Echec pendant l'enregistrement! Veuillez réessayer plus tard",
      };
    }
  }
  async updateFournisseur({ auth, params, request }: HttpContextContract) {
    const requestData = request.all();
    const data = requestData.data;
    const categorieId = await Database.from(Fournisseur.table)
      .returning("id")
      .where("id", params.id)
      .update({ ...data });
    if (categorieId) {
      await Database.table(ModeSuivi.table).insert({
        reference: "Modification du fournisseur",
        details: data,
        created_by: auth.user?.id,
      });
      return {
        status: "success",
        message: "Modification effectué avec succès!",
      };
    } else {
      return {
        status: "error",
        message: "Echec pendant la modification! Veuillez réessayer plus tard",
      };
    }
  }

  async categorieList({ request, view }: HttpContextContract) {
    const page = request.input("page", 1);
    const categories = await Database.from("fournisseur_categories").paginate(
      page,
      10
    );
    return view.render("pages/categorieFournisseur/list", {
      title: "Secteur d'activité",
      categories,
    });
  }
  async addCategorie({ view }: HttpContextContract) {
    return view.render("pages/categorieFournisseur/addCategorieFournisseur", {
      title: "Ajout d'un secteur d'activité",
    });
  }
  async editCategorie({ params, view }: HttpContextContract) {
    const categorie = await (
      await Database.from("fournisseur_categories").where("id", params.id)
    ).find((res) => res.id == params.id);
    return view.render("pages/categorieFournisseur/editCategorieFournisseur", {
      title: "Modification du secteur d'activité",
      categorie,
    });
  }
  async storeFournisseurCategorie({ auth, request }: HttpContextContract) {
    const requestData = request.all();
    const data = requestData.data;
    const categorieId = await Database.table("fournisseur_categories")
      .returning("id")
      .insert({ ...data });
    if (categorieId) {
      await Database.table(ModeSuivi.table).insert({
        reference: "Ajout d'un secteur d'activité",
        details: data,
        created_by: auth.user?.id,
      });
      return { status: "success", message: "Ajout effectué avec succès!" };
    } else {
      return {
        status: "error",
        message: "Echec pendant l'enregistrement! Veuillez réessayer plus tard",
      };
    }
  }
  async updateFournisseurCategorie({
    auth,
    params,
    request,
  }: HttpContextContract) {
    const requestData = request.all();
    const data = requestData.data;
    const categorieId = await Database.from("fournisseur_categories")
      .returning("id")
      .where("id", params.id)
      .update({ ...data });
    if (categorieId) {
      await Database.table(ModeSuivi.table).insert({
        reference: "Modification du secteur d'Activité",
        details: data,
        created_by: auth.user?.id,
      });
      return {
        status: "success",
        message: "Modification effectué avec succès!",
      };
    } else {
      return {
        status: "error",
        message: "Echec pendant la modification! Veuillez réessayer plus tard",
      };
    }
  }
  async detailFournisseur({params, view}) {
    const categories = await Database.from("fournisseur_categories");
    const fournisseur = await (
      await Database.from("fournisseurs").where("id", params.id)
    ).find((res) => res.id == params.id);
    console.log(fournisseur);
    return view.render("pages/fournisseurs/detailFournisseur", {
      title: "Detail du fournisseur",
      categories,
      fournisseur,
    });
  }
}
