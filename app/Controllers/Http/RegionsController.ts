import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Region from "App/Models/Region";

export default class RegionsController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return Region.query()
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return Region.create(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return Region.query()
    .select('*')
    .where({ id: params.id })
    .first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return Region.query()
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return Region.query()
    .where({ id: params.id })
    .delete()
  }
}
