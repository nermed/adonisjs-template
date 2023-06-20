import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dossiers";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string("assigned_to_others")
        .notNullable()
        .comment("Les ingénieurs qui récevront le dossier");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("assigned_to_others");
    });
  }
}
