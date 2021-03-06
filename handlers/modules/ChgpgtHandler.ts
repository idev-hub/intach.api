import { DateTime } from "luxon";
import axios from "axios";
import Handler from "../Handler";

export default class ChgpgtHandler extends Handler {
  constructor () {
    super()
  }

  async getGroups () {
    return null
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
