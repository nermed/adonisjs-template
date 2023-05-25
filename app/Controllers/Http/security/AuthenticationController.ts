import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";
import UserValidator from "App/Validators/UserValidator";

export default class AuthenticationController {
  async loginView({ view }: HttpContextContract) {
    return view.render("pages/authentication/login", { title: "Login" });
  }

  async login({ request, auth, response, session }) {
    const { email, password } = await request.validate(LoginValidator);

    try {
      await auth.attempt(email, password);
      return response.redirect("/");
    } catch (error) {
      // return error;
      // console.log(error);
      session.flash({ error: "Invalid email or password" });
      return response.redirect("/login");
    }
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.redirect("/login");
  }

  async registerView({ view }: HttpContextContract) {
    return view.render("pages/authentication/register", { title: "Register" });
  }

  async register({ request, response, session, params }) {
    await this.handleRequestSave(params, request);
    session.flash({ success: "L'utilisateur a été bien sauvegardé" });
    return response.redirect("/users");
  }

  private async handleRequestSave(
    params: HttpContextContract["params"],
    request: HttpContextContract["request"]
  ) {
    const user = params.id ? await User.findOrFail(params.id) : new User();
    const req = await request.validate(UserValidator);
    user.merge({ ...req }).save();
  }
}
