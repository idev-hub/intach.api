import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CollegeHandler from "App/Models/CollegeHandler";

export default class CollegeHandlersController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return CollegeHandler.query()
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return CollegeHandler.create(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return CollegeHandler.query()
    .select('*')
    .where({ id: params.id })
    .first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return CollegeHandler.query()
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return CollegeHandler.query()
    .where({ id: params.id })
    .delete()
  }
}
