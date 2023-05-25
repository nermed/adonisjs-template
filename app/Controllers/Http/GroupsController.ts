import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Group from "App/Models/Group";
import User from "App/Models/User";
import GroupValidator from "App/Validators/GroupValidator";

export default class GroupsController {
  async index({ request, view }: HttpContextContract) {
    // const groups = await Group.all();
    const page = request.input("page", 1);
    const groups = await Database.from(Group.table)
      .leftJoin(User.table, `${User.table}.id`, `${Group.table}.created_by`)
      .select(
        `${Group.table}.*`,
        `${User.table}.id as user_id`,
        `${User.table}.username`
      )
      .where(`${Group.table}.delete_status`, "0")
      .paginate(page, 10);
    groups.baseUrl("/groups");
    return view.render("pages/groups/groupList", { title: "Groups", groups });
  }

  async addGroup({ view }: HttpContextContract) {
    return view.render("pages/groups/groupAdd", { title: "Add Group" });
  }

  async editGroup({ params, view }: HttpContextContract) {
    const group = await Group.findOrFail(params.id);
    return view.render("pages/groups/groupEdit", {
      title: "Edit Group",
      group,
    });
  }

  async store({ params, request, response, auth }: HttpContextContract) {
    await this.handleRequestSave(params, request, "add", auth);
    response.redirect("/groups");
  }

  async update({ params, request, response, auth }: HttpContextContract) {
    await this.handleRequestSave(params, request, "update", auth);
    response.redirect("/groups");
  }

  async delete({ params, response, session, auth }: HttpContextContract) {
    const group = await Group.findOrFail(params.id);
    const user = auth.user?.id;
    group.merge({ ...group, deletedBy: user, deleteStatus: true }).save();
    session.flash({ success: "Le groupe a été bien supprimée" });
    return response.redirect("/groups");
  }

  private async handleRequestSave(
    params: HttpContextContract["params"],
    request: HttpContextContract["request"],
    operationType: string,
    auth: HttpContextContract["auth"]
  ) {
    const group = params.id ? await Group.findOrFail(params.id) : new Group();
    const req = await request.validate(GroupValidator);
    const user = auth.user?.id;
    switch (operationType) {
      case "add":
        group.merge({ ...req, createdBy: user }).save();
        break;

      case "update":
        group.merge({ ...req, updatedBy: user }).save();
        break;

      default:
        break;
    }
    // group.merge({ ...req,  }).save();
  }
}
