import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import Client from "App/Models/Client";

export default class ClientsController {
  public async index ({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 30

    return Client.query().paginate(page, limit)
  }

  public async store ({ request }: HttpContextContract) {
    return Database
    .insertQuery()
    .table('clients')
    .insert(request.only([ 'peer_id', 'college_id', 'email', 'firstname', 'lastname', 'param', 'role_id' ]))
  }

  public async show ({ params }: HttpContextContract) {
    return Database.query().where({ peer_id: params.id }).from('clients').first()
  }

  public async update ({ params, request }: HttpContextContract) {
    return Database
    .from('clients')
    .where({ peer_id: params.id })
    .update(request.only([ 'college_id', 'email', 'firstname', 'lastname', 'param', 'role_id' ]))
  }

  public async delete ({ params }: HttpContextContract) {
    return Database
    .from('clients')
    .where({ peer_id: params.id })
    .delete()
  }
}
