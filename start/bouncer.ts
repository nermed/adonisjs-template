/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from "@ioc:Adonis/Addons/Bouncer";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
const verifyPermission = async (
  user: User,
  permissionString: string
): Promise<boolean> => {
  const getUserGroup = await Database.from("user_to_groups")
    .select("group_id")
    .where("user_id", user.id);
  const permissionId = await Database.from("permissions")
    .select("id")
    .where("name", permissionString);
  if (permissionId.length) {
    if (getUserGroup.length) {
      for (let i = 0; i < getUserGroup.length; i++) {
        const groupId = getUserGroup[i];
        const permissionBygroup = await Database.from("group_to_permissions")
          .select("*")
          .where("group_id", groupId.group_id)
          .where("permission_id", permissionId[0].id);
        return permissionBygroup.length ? true : false;
      }
    } else {
      return false;
    }
  }
  return false;
};
export const { actions } = Bouncer.define(
  "document_create",
  async (user: User) => {
    return await verifyPermission(user, "document_create");
  }
)
  .define("document_complete", async (user: User, dossier: any) => {
    if (await verifyPermission(user, "document_complete")) {
      return dossier.assigned_to == user.id;
    }
    return false;
  })
  .define("document_edit", async (user: User, dossier: any) => {
    if (await verifyPermission(user, "document_edit")) {
      return dossier.created_by === user.id || dossier.assigned_to == user.id;
    }
    return false;
  })
  .define("document_print", async (user: User) => {
    return await verifyPermission(user, "document_print");
  })
  .define("document_affectation", async (user: User) => {
    return await verifyPermission(user, "document_affectation");
  })
  .define("document_add_price", async (user: User) => {
    return await verifyPermission(user, "document_add_price");
  })
  .define("document_add_project", async (user: User) => {
    return await verifyPermission(user, "document_add_project");
  })
  .define("document_validate_service_demande", async (user: User) => {
    return await verifyPermission(user, "document_validate_service_demande");
  })
  .define("document_validate_president_commission", async (user: User) => {
    return await verifyPermission(
      user,
      "document_validate_president_commission"
    );
  })
  .define("document_validate_disponibilite_budgetaire", async (user: User) => {
    return await verifyPermission(
      user,
      "document_validate_disponibilite_budgetaire"
    );
  })
  .define("document_validate_fonds_routier", async (user: User) => {
    return await verifyPermission(user, "document_validate_fonds_routier");
  })
  .define("document_validate_direction", async (user: User) => {
    return await verifyPermission(user, "document_validate_direction");
  })
  .define("project_commande_add_fournisseur", async (user: User) => {
    return await verifyPermission(user, "project_commande_add_fournisseur");
  })
  .define("document_validate_autorisation_dg_arb", async (user: User) => {
    return await verifyPermission(
      user,
      "document_validate_autorisation_dg_arb"
    );
  });
/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({});
