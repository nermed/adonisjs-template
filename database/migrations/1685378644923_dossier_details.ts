import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dossier_details";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("id_dossier")
        .unsigned()
        .references("dossiers.id")
        .notNullable();
      table.string("designation").notNullable();
      table.float("nombre").notNullable();
      table.string("unite").notNullable();
      table.float("quantite").notNullable();
      table.double("prixUnitaireHTVA").nullable();
      table.double("prixTotalHTVA").nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
