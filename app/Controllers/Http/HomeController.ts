import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HomeController {
  async index({ view }: HttpContextContract) {
    return view.render("pages/home/index", { title: "Home" });
  }

  async settings({ view }: HttpContextContract) {
    return view.render("pages/home/settings", { title: "Settings" });
  }
}
