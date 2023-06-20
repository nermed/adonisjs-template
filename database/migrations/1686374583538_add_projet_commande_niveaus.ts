import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projet_commandes";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string("projet_commande_niveau")
        .defaultTo('1')
        .comment("dépendra du niveau du dossier");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("projet_commande_niveau");
    });
  }
}
