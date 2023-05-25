import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Permission from "App/Models/Permission";
import User from "App/Models/User";
import PermissionValidator from "App/Validators/PermissionValidator";

export default class PermissionsController {
  async index({ request, view }: HttpContextContract) {
    // const groups = await Group.all();
    const page = request.input("page", 1);
    const permissions = await Database.from(Permission.table)
      .leftJoin(User.table, `${User.table}.id`, `${Permission.table}.created_by`)
      .select(
        `${Permission.table}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
      )
      .where(`${Permission.table}.deleteStatus`, "0")
      .paginate(page, 10);
    permissions.baseUrl("/permissions");
    return view.render("pages/permissions/permissionsList", { title: "Permissions", permissions });
  }

  async addPermission({ view }: HttpContextContract) {
    return view.render("pages/permissions/permissionAdd", { title: "Add Permission" });
  }

  async editPermission({ params, view }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id);
    return view.render("pages/permissions/permissionEdit", {
      title: "Edit Permission",
      permission,
    });
  }

  async store({ params, request, response, auth }: HttpContextContract) {
    await this.handleRequestSave(params, request, "add", auth);
    response.redirect("/permissions");
  }

  async update({ params, request, response, auth }: HttpContextContract) {
    await this.handleRequestSave(params, request, "update", auth);
    response.redirect("/permissions");
  }

  async delete({ params, response, session, auth }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id);
    const user = auth.user?.id;
    permission.merge({ ...permission, deletedBy: user, deleteStatus: true }).save();
    session.flash({ success: "La permission a été bien supprimée" });
    return response.redirect("/permissions");
  }

  private async handleRequestSave(
    params: HttpContextContract["params"],
    request: HttpContextContract["request"],
    operationType: string,
    auth: HttpContextContract["auth"]
  ) {
    const permission = params.id ? await Permission.findOrFail(params.id) : new Permission();
    const req = await request.validate(PermissionValidator);
    const user = auth.user?.id;
    switch (operationType) {
      case "add":
        permission.merge({ ...req, createdBy: user }).save();
        break;

      case "update":
        permission.merge({ ...req, updatedBy: user }).save();
        break;

      default:
        break;
    }
    // group.merge({ ...req,  }).save();
  }
}
