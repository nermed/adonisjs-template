import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dossiers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title");
      table
        .integer("created_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("taped_price_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();
      table.dateTime("taped_price_at", { useTz: true });
      table.tinyint("deleted_status").defaultTo(0);
      table
        .integer("deleted_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();
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
