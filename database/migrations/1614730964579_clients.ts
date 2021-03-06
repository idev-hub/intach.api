import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('college_id').unsigned().references('id').inTable('colleges').onDelete('CASCADE')
      table.integer('role_id').unsigned().references('id').inTable('client_roles').onDelete('CASCADE')
      table.string('firstname')
      table.string('lastname')
      table.string('peer_id').notNullable().unique()
      table.string('param')
      table.integer('sex').defaultTo(1)
      table.string('corps')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
