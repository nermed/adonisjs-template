import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projet_commandes";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string("info_chantier")
        .nullable()
        .comment("nom du chantier ou adresse du chantier");
      table
        .dateTime("date_emission", { useTz: true })
        .nullable()
        .comment("date d'emission");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("info_chantier");
      table.dropColumn("date_emission");
    });
  }
}
