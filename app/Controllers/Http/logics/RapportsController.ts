import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
import niveauDossier from "Helpers/niveauDossier";

export default class RapportsController {
  async index({ request, view }: HttpContextContract) {
    const tablename = "dossiers";
    const page = request.input("page", 1);
    const dossiers = await Database.from(tablename)
      .leftJoin(User.table, `${User.table}.id`, `${tablename}.assigned_to`)
      .select(
        `${tablename}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
      )
      .orderBy(`${tablename}.id`, "desc")
      .paginate(page, 10);
    dossiers.baseUrl("/dossiers");
    return view.render("pages/rapports/rapport", { title: "Rapports", dossiers, niveauDossier });
  }
  async detail({ view }: HttpContextContract) {
    // const suivisDossier = await Database.from('mode_suivis');
    return view.render("pages/rapports/rapport", { title: "Detail de Rapport" });
  }
}
