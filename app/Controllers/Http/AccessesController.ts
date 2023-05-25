import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccessesController {
  async index({view}: HttpContextContract) {
    return view.render('pages/accesses/index', {title: 'Access'});
  }
}
