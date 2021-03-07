import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import parsers from "../../../handlers";
import { HttpException } from "@adonisjs/http-server/build/src/Exceptions/HttpException";
import College from "App/Models/College";
import CollegeHandler from "App/Models/CollegeHandler";

async function getCollegeHandler (id: string | number): Promise<CollegeHandler | null> {
  const college = await College.query().where({ 'id': id }).first()
  if ( college ) {
    return CollegeHandler.query().where({ 'id': college.handler_id }).first()
  }
  return null
}

export default class CollegesController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return College.query()
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return College
    .create(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return College.query().where({ id: params.id }).first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return College.query()
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return College.query()
    .where({ id: params.id })
    .delete()
  }


  public async getCorps ({ params }) {
    const handler = await getCollegeHandler(params.id)
    if ( !handler ) throw new HttpException('Обработчик не найден')

    const parser = parsers.get(handler.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getCorps({ settings: handler.settings })
  }

  public async getGroups ({ params, request }) {
    const handler = await getCollegeHandler(params.id)
    if ( !handler ) throw new HttpException('Обработчик не найден')

    const parser = parsers.get(handler.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getGroups({ params: { corps: request.input('corps') }, settings: handler.settings })
  }

  public async getLessons ({ params }) {
    const handler = await getCollegeHandler(params.id)
    if ( !handler ) throw new HttpException('Обработчик не найден')

    const parser = parsers.get(handler.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getLessons({ params: { date: params.date, group: params.param }, settings: handler.settings })
  }

  public async getLessonsWeek ({ params }) {
    const handler = await getCollegeHandler(params.id)
    if ( !handler ) throw new HttpException('Обработчик не найден')

    const parser = parsers.get(handler.name)
    if ( !parser ) throw new HttpException('Парсер не назначен')

    return new parser().getLessonsWeek({
      params: { group: params.param, week: params.week || 0 },
      settings: handler.settings
    })
  }

  public async showByCity ({ params }: HttpContextContract) {
    return College.query().where({ city_id: params.id })
  }

  public async getHandler ({ params }: HttpContextContract) {
    return await getCollegeHandler(params.id)
  }
}
