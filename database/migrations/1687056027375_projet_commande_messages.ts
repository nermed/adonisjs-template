import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projet_commande_messages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("id_projet_commande")
        .unsigned()
        .references("projet_commandes.id")
        .notNullable()
        .comment(
          "si le projet de commande est effacé, les messages aussi seront supprimés"
        );
      table.text("message").comment("Message à envoyer à l'ingénieur");
      table
        .integer("created_by")
        .unsigned()
        .references("users.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .string("reference")
        .comment("Réference pour bien lister le message");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
