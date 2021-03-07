import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ClientRole from "App/Models/ClientRole";

export default class ClientRolesController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return ClientRole.query()
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return ClientRole
    .create(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return ClientRole.query()
    .select('*')
    .where({ id: params.id })
    .first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return ClientRole.query()
    .where({ id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return ClientRole.query()
    .where({ id: params.id })
    .delete()
  }
}
