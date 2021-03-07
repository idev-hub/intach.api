import { DateTime } from "luxon";
import axios from "axios";
import Handler from "../Handler";
import Client from "App/Models/Client";

export default class ChgpgtHandler extends Handler {
  constructor () {
    super()
  }

  async getGroups (req) {
    const { id } = req.params
    const clients = await Client.query().where({
      college_id: id
    })
    const params: string[] = []

    clients.forEach(client => {
      const param = params.find(val => val === client.param)
      if ( client.param && !param ) {
        params.push(client.param)
      }
    })

    return params
  }

  async getLessonsWeek () {
    return null
  }

  async getCorps () {
    return null
  }

  async getLessons (req) {
    const { date, group, week } = req.params

    const res = (await axios(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${ date }/${ group }`), {
      method: 'post'
    })).data

    if ( res ) {
      const timetable = res.map((lesson: { [x: string]: string; }) => {
        return {
          number: parseInt(lesson["Para"]) || undefined,
          discipline: lesson["discip"] || undefined,
          teacher: lesson["prep"] || undefined,
          cabinet: lesson['cab'] || undefined
        }
      })

      return {
        date: DateTime.fromFormat(date, 'dd.LL.yyyy').setZone('Asia/Yekaterinburg').toISO() || undefined,
        group: group || undefined,
        week: week || 0,
        data: timetable || [],
      }
    }

    return null
  }
}
