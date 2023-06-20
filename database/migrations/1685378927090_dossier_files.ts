import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dossier_files";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("id_dossier")
        .unsigned()
        .references("dossiers.id")
        .notNullable();
      table.string("fileName").notNullable();
      table.string("path").notNullable();
      table
        .integer("created_by")
        .unsigned()
        .references("users.id")
        .notNullable();
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
