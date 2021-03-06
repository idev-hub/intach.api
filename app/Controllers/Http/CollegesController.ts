import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import parsers from "../../../handlers";
import { HttpException } from "@adonisjs/http-server/build/src/Exceptions/HttpException";

function getCollege (id: string | number) {
  return Database.from('colleges')
  .innerJoin('college_handlers', 'colleges.handler_id', 'college_handlers.id')
  .where({ 'colleges.id': id })
  .select([ 'college_handlers.name', 'college_handlers.settings' ])
  .firstOrFail()
}

export default class CollegesController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return Database.from('colleges')
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return Database
    .insertQuery()
    .table('colleges')
    .insert(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return Database.query().from('colleges').where({ id: params.id }).first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return Database
    .from('colleges')
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return Database
    .from('colleges')
    .where({ id: params.id })
    .delete()
  }


  public async getCorps ({ params }) {
    const college = await getCollege(params.id)
    const parser = parsers.get(college.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getCorps({ settings: college.settings })
  }

  public async getGroups ({ params, request }) {
    const college = await getCollege(params.id)
    const parser = parsers.get(college.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getGroups({ params: { corps: request.input('corps') }, settings: college.settings })
  }

  public async getLessons ({ params }) {
    const college = await getCollege(params.id)
    const parser = parsers.get(college.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getLessons({ params: { date: params.date, group: params.param }, settings: college.settings })
  }

  public async getLessonsWeek ({ params }) {
    const college = await getCollege(params.id)
    const parser = parsers.get(college.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getLessonsWeek({
      params: { group: params.param, week: params.week || 0 },
      settings: college.settings
    })
  }

  public async showByCity ({ params }: HttpContextContract) {
    return Database.query().from('colleges').where({ city_id: params.id })
  }

  public async getHandler ({ params }: HttpContextContract) {
    const college = await Database.from('colleges').where({ id: params.id }).select('handler_id').firstOrFail()
    return Database.from('college_handlers').where({
      id: college.handler_id
    }).first()
  }
}
