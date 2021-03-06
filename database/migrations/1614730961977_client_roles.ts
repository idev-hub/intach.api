import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClientRoles extends BaseSchema {
  protected tableName = 'client_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('access_type').notNullable().defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
