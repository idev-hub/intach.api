import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class CitiesController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return Database.from('cities')
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return Database
    .insertQuery()
    .table('cities')
    .insert(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return Database.query()
    .from('cities')
    .select('*')
    .where({ id: params.id })
    .first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return Database
    .from('cities')
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return Database
    .from('cities')
    .where({ id: params.id })
    .delete()
  }

  public async showByRegion ({ params }: HttpContextContract) {
    return Database.query()
    .from('cities')
    .select('*')
    .where({ region_id: params.id })
  }

  public async search ({ params }: HttpContextContract) {
    return Database.query()
    .from('cities')
    .select('*')
    .where('name', 'LIKE', `%${ decodeURI(params.search) }%`).first()
  }
}
