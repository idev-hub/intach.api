import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RegionsController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return Database.from('regions')
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return Database
    .insertQuery()
    .table('regions')
    .insert(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return Database.query()
    .from('regions')
    .select('*')
    .where({ id: params.id })
    .first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return Database
    .from('regions')
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return Database
    .from('regions')
    .where({ id: params.id })
    .delete()
  }
}
