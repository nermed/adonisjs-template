import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "permissions";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("created_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();

      table
        .integer("updated_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();

      table
        .integer("deleted_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("created_by");
      table.dropColumn("deleted_by");
    });
  }
}
