import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/City";

export default class CitiesController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return City.query()
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return City.create(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return City.query()
    .select('*')
    .where({ id: params.id })
    .first()
  }

  public async update ({ params, request }: HttpContextContract) {
    City.query()
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return City.query()
    .where({ id: params.id })
    .delete()
  }

  public async showByRegion ({ params }: HttpContextContract) {
    return City.query()
    .select('*')
    .where({ region_id: params.id })
  }

  public async search ({ params }: HttpContextContract) {
    return City.query()
    .select('*')
    .where('name', 'LIKE', `%${ decodeURI(params.search) }%`).first()
  }
}
