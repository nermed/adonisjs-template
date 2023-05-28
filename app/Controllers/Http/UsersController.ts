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
          groupNames: [...acc[c.id].groupNames, { groupname: c.groupName }],
        };
      } else {
        acc[c.id] = { ...c, groupNames: [{ groupname: c.groupName }] };
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

  async adduser({
    auth,
    params,
    request,
    response,
    session,
  }: HttpContextContract) {
    await this.handleRequestSave(params, request, "add");
    const userId = await Database.from(User.table)
      .select("id")
      .orderBy("id", "desc")
      .limit(1)
      .as("user_id");
    await Database.table("user_to_groups").insert({
      user_id: userId[0].id,
      group_id: request.input("groupName"),
      deleteStatus: 0,
      createdBy: auth.user?.id,
    });
    session.flash({ success: "L'utilisateur a été bien sauvegardé" });
    return response.redirect("/users");
  }

  async edituserView({ view, params }: HttpContextContract) {
    const groups = await Group.all();
    const user = await User.findOrFail(params.id);
    const userInGroup = await Database.from("user_to_groups").select('group_id').where(
      "user_id",
      params.id
    );
    const userGroup = userInGroup.map((usr) => usr.group_id);
    return view.render("pages/users/editUser", {
      title: "Edit user",
      user,
      groups,
      userGroup,
    });
  }

  async update({ params, request, response, auth }: HttpContextContract) {
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
    await Database.from("user_to_groups").where("user_id", params.id).delete();
    for (let r = 0; r < request.input("groupName").length; r++) {
      const element = request.input("groupName")[r];
      await Database.table("user_to_groups").insert({
        user_id: params.id,
        group_id: element,
        deleteStatus: 0,
        createdBy: auth.user?.id,
      });
    }
    response.redirect("/users");
  }

  async delete({ params, response, session, auth }: HttpContextContract) {
    const userData = await User.findOrFail(params.id);
    const user = auth.user?.id;
    userData.merge({ ...userData, deletedBy: user, deleteStatus: true }).save();
    session.flash({ success: "L'utilisateur a été bien supprimée" });
    return response.redirect("/users");
  }

  async changeStatus({ request, auth }: HttpContextContract) {
    const idUser = request.all();
    // return idUser.userId;
    return await Database.from(User.table)
      .where("id", idUser.userId.split("-")[0])
      .update({
        deleteStatus: idUser.userId.split("-")[1] == "0" ? 1 : 0,
        deleteBy: idUser.userId.split("-")[1] == "0" ? auth.user?.id : null,
      });
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
