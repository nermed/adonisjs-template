import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "dossiers";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string("dossier_niveau")
        .nullable()
        .defaultTo(1)
        .comment(
          "1: ingenieur, 2: president de la commission, 3: disponibilité budgetaire, 4: directeur du fonds routier, 5: DG/ARB, 6: secretaire"
        );
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("dossier_niveau");
    });
  }
}
