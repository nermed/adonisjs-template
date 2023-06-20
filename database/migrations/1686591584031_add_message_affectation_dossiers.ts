import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dossiers";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("assigned_to").notNullable().comment("Les ingénieurs qui récevront le dossier");
      table.text("message").comment("Pour notifier l'ingénieur");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("assigned_to");
      table.dropColumn("message");
    });
  }
}
