import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "group_to_permissions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer("group_id").unsigned().references("groups.id").notNullable();
      table.integer("permission_id").unsigned().references("permissions.id").notNullable();
      table.tinyint('deleteStatus').defaultTo(0)
      table.integer("deleteBy").unsigned().references("users.id").nullable();
      table.integer("createdBy").unsigned().references("users.id").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
