import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HomeController {
  async index({ auth, response }: HttpContextContract) {
    if(auth.isLoggedIn) {
      return response.redirect('/dossiers')

    } else {
      return response.redirect('/login');
    }
  }

  async settings({ view }: HttpContextContract) {
    return view.render("pages/home/settings", { title: "Settings" });
  }
}
