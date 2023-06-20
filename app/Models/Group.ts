import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string | undefined | null

  @column()
  public deleteStatus: boolean

  @belongsTo(() => User)
  public deleteByUser: BelongsTo<typeof User>

  @column()
  public deletedBy: number

  @belongsTo(() => User)
  public updateByUser: BelongsTo<typeof User>

  @column()
  public updatedBy: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public createdBy: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
