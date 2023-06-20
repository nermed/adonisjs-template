import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projet_commande_validations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer("id_projet_commande")
      .unsigned()
      .references("projet_commandes.id")
      .notNullable()
      .comment(
        "si le projet de commande est effacé, les validations aussi"
      );
      table.string('serviceDemandeur').comment("Place à l'ingénieur de valider")
      table.string('dispoBudgetaire').comment("Place au respo de budgét de valider")
      table.string('directionFondsRoutier').comment("Place au directeur de fonds routier de valider")
      table.string('dtr').comment("Place au DTR de valider")
      table.string('dgArb').comment("Place au DG ARB de valider")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
