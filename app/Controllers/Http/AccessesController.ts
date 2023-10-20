import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Permission from "App/Models/Permission";
import UserGroup from "App/Models/UserGroup";

export default class AccessesController {
  async index({ view }: HttpContextContract) {
    const groups = await Database.from(UserGroup.table).where('delete_status', '0');
    const permissions = await Database.from(Permission.table);
    const dataRanged = this.rangePermissionsData(permissions);
    // console.log(dataRanged);
    return view.render("pages/accesses/index", {
      title: "Access",
      groups,
      permissions: Object.entries(dataRanged),
    });
  }
  private rangePermissionsData(permissions: Permission[]) {
    const dataToRender = {};
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      const first_word = permission.name.split("_")[0];
      if (dataToRender[first_word]) {
        dataToRender[first_word].push(permission);
      } else {
        dataToRender[first_word] = [permission];
      }
    }
    return dataToRender;
  }
  async storeAccess({ auth, request }: HttpContextContract) {
    const { dataToSend, select } = request.all();
    const user = auth.user?.id;
    let endFor = false;
    if (select) {
      await Database.from("group_to_permissions")
        .where("group_id", select)
        .delete();
      for (let j = 0; j < dataToSend.length; j++) {
        const normalData = dataToSend[j];
        if (normalData.split("-")[2] == "true") {
          const idPermission = normalData.split("-")[0];
          await Database.table("group_to_permissions").returning("id").insert({
            group_id: select,
            permission_id: idPermission,
            createdBy: user,
          });
        }
        if (dataToSend.length == j + 1) {
          endFor = true;
        }
      }
    }
    return endFor;
  }
  async getAccess({ request }: HttpContextContract) {
    const { groupId } = request.all();
    const groupPermissions = await Database.from("group_to_permissions").select('group_id', 'permission_id').where(
      "group_id",
      groupId
    );
    return groupPermissions;
  }
}
