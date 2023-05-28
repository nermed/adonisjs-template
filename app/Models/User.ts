import { DateTime } from "luxon";
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ columnName: "deleteStatus" })
  public deleteStatus: boolean;

  @belongsTo(() => User)
  public deleteByUser: BelongsTo<typeof User>

  @column({columnName: "deleteBy"})
  public deletedBy: number

  @column()
  public rememberHeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

}