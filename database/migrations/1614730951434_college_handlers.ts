import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CollegeHandlers extends BaseSchema {
  protected tableName = 'college_handlers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.json('settings')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
