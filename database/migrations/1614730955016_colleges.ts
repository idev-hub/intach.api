import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Colleges extends BaseSchema {
  protected tableName = 'colleges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('city_id').unsigned().references('id').inTable('cities').onDelete('CASCADE')
      table.integer('handler_id').unsigned().references('id').inTable('college_handlers').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('fullname').notNullable()
      table.string('domain')
      table.string('adress')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
