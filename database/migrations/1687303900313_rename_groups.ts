import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_groups'

  public async up () {
    this.schema.renameTable('groups', this.tableName)
  }

  public async down () {
    this.schema.renameTable('groups', this.tableName)
  }
}
