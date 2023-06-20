import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projet_commande_details'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("id_projet_commande")
        .unsigned()
        .references("projet_commandes.id")
        .notNullable();
      table.string("ref_post_budget").nullable();
      table.float("numeroRef").nullable();
      table.string("designationAffectation").nullable();
      table.float("quantiteDemande").nullable();
      table.double("montantEstime").nullable();
      table.float("niveauStockMagasin").nullable();
      table.string("observation").nullable();
      table
        .integer("created_by")
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
