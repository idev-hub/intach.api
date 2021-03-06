import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public college_id: number

  @column()
  public firstname?: string

  @column()
  public lastname?: string

  @column()
  public peer_id: string

  @column()
  public param?: string

  @column()
  public corps?: string

  @column()
  public role_id: number

  @column()
  public sex: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
