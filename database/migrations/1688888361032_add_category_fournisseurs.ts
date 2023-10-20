import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fournisseurs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("categorie")
        .unsigned()
        .references("fournisseur_categories.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("categorie");
    });
  }
}
