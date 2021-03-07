import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from "App/Models/Client";

export default class ClientsController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    return Client.query()
    .paginate(page, request.input('counts', 30))
  }

  public async store ({ request }: HttpContextContract) {
    return Client.create(request.all())
  }

  public async show ({ params }: HttpContextContract) {
    return Client.query().where({ peer_id: params.id }).first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return Client.query()
    .where({ peer_id: params.id })
    .update(request.all())
  }

  public async delete ({ params }: HttpContextContract) {
    return Client.query()
    .where({ peer_id: params.id })
    .delete()
  }
}
