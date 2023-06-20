import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projet_commandes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("id_dossier_detail")
        .unsigned()
        .references("dossier_details.id")
        .notNullable()
        .comment(
          "si le detail est effacé, le projet de commande et ses détails"
        );
      table
        .string("traitement")
        .notNullable()
        .comment("choisir entre 1: normal, 2: urgence, 3: prioritaire");
      table
        .string("origineProjet")
        .notNullable()
        .comment("choisir entre 1: DG/ARB, 2: DFR, 3: DETR");
      table.string("personneAvertir");
      table
        .integer("created_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();
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
