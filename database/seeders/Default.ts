import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ClientRole from "App/Models/ClientRole";
import CollegeHandler from "App/Models/CollegeHandler";
import Region from "App/Models/Region";
import City from "App/Models/City";
import College from "App/Models/College";

export default class DefaultSeeder extends BaseSeeder {
  public async run () {
    await ClientRole.createMany([
      {
        name: 'Студент',
        access_type: 0
      },
      {
        name: 'Преподователь',
        access_type: 1
      },
      {
        name: 'Администратор',
        access_type: 2
      },
      {
        name: 'Заблокированный',
        access_type: 9
      },
    ])
    await CollegeHandler.createMany([
      {
        name: 'ChgpgtHandler',
        settings: {
          test: true
        },
      },
    ])
    await Region.createMany([
      {
        name: 'Челябинская область',
        code: 74
      },
    ])
    await City.createMany([
      {
        name: 'Челябинск',
        region_id: 1
      },
    ])
    await College.createMany([
      {
        name: 'ЧГПГТ им.А.В. Яковлева',
        adress: 'Российская Федерация, 454139, Челябинская область, г.Челябинск,  ул. Машиностроителей, 31.',
        fullname: 'Челябинский государственный промышленно-гуманитарный техникум им.А.В.Яковлева',
        domain: 'chgpgt.ru',
        city_id: 1,
        handler_id: 1
      },
    ])
  }
}
