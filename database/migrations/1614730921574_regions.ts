import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Regions extends BaseSchema {
  protected tableName = 'regions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('code').notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
