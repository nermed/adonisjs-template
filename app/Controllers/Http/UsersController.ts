import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Group from "App/Models/Group";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import UserValidator from "App/Validators/UserValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UsersController {
  async index({ view }: HttpContextContract) {
    // const users = await User.all();
    const req = await Database.rawQuery(
      "SELECT user.*, groupp.name as groupName FROM users as user left join user_to_groups as userGroup on user.id = userGroup.user_id left join groups as groupp on groupp.id = userGroup.group_id"
    ).exec();
    const reducers = req[0].reduce(function (acc, c) {
      let news = {};
      if (acc[c.id] !== undefined) {
        acc[c.id] = {
          ...c,
          groupNames: [...acc[c.id].groupNames, {groupname: c.groupName}],
        };
      } else {
        acc[c.id] = { ...c, groupNames: [{groupname: c.groupName}] };
      }
      return { ...acc };
    }, {});

    const users = Object.values(reducers);
    return view.render("pages/users/index", {
      title: "Users",
      users: users,
    });
  }

  async adduserView({ view }: HttpContextContract) {
    const groups = await Group.all();
    return view.render("pages/users/addUser", { title: "Add user", groups });
  }

  async adduser({ params, request, response, session }: HttpContextContract) {
    await this.handleRequestSave(params, request, "add");
    session.flash({ success: "L'utilisateur a été bien sauvegardé" });
    return response.redirect("/users");
  }

  async edituserView({ view, params }: HttpContextContract) {
    const groups = await Group.all();
    const user = await User.findOrFail(params.id);
    const userGroup = await Database.from("user_to_groups").where(
      "user_id",
      params.id
    );
    return view.render("pages/users/editUser", {
      title: "Edit user",
      user,
      groups,
      userGroup,
    });
  }

  async update({ params, request, response, auth }: HttpContextContract) {
    // await this.handleRequestSave(params, request, "update");
    const user = await User.findOrFail(params.id);
    if (user.email == request.input("email")) {
      const allRequested = await request.validate({
        schema: schema.create({
          username: schema.string({ trim: true }, [rules.minLength(3)]),
        }),
        messages: {
          "username.minLength": "Username must be at least 6 characters",
        },
      });
      user.merge({ ...user, ...allRequested }).save();
    } else {
      const allRequested = await request.validate({
        schema: schema.create({
          username: schema.string({ trim: true }, [rules.minLength(3)]),
          email: schema.string({ trim: true }, [
            rules.email(),
            rules.unique({ table: "users", column: "email" }),
          ]),
        }),
        messages: {
          "username.minLength": "Username must be at least 6 characters",
          "email.unique": "Email is already used",
        },
      });
      user.merge({ ...user, ...allRequested }).save();
    }
    // const verifyEmail = Database.rq
    await Database.table("user_to_groups").insert({
      user_id: params.id,
      group_id: request.input("groupName"),
      deleteStatus: 0,
      createdBy: auth.user?.id,
    });
    response.redirect("/users");
  }

  private async handleRequestSave(
    params: HttpContextContract["params"],
    request: HttpContextContract["request"],
    operationType: string
  ) {
    const user = params.id ? await User.findOrFail(params.id) : new User();
    const req = await request.validate(UserValidator);
    switch (operationType) {
      case "add":
        user.merge({ ...req }).save();
        break;

      default:
        break;
    }
    // user.merge({ ...req }).save();
  }
}
