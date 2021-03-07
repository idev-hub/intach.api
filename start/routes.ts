/*
 |--------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------
 |
 | This file is dedicated for defining HTTP routes. A single file is enough
 | for majority of projects, however you can define routes in different
 | files and just make sure to import them inside this file. For example
 |
 | Define routes in following two files
 | ├── start/routes/cart.ts
 | ├── start/routes/customer.ts
 |
 | and then import them inside `start/routes/index.ts` as follows
 |
 | import './cart'
 | import './customer'
 |
 */

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('college_handlers', 'CollegeHandlersController').apiOnly()
  Route.resource('client_roles', 'ClientRolesController').apiOnly()

  Route.resource('regions', 'RegionsController').apiOnly()

  Route.resource('cities', 'CitiesController').apiOnly()
  Route.get('cities/region/:id', 'CitiesController.showByRegion')
  Route.get('cities/search/:search', 'CitiesController.search')
  Route.resource('clients', 'ClientsController').apiOnly()

  Route.resource('colleges', 'CollegesController').apiOnly()
  Route.get('colleges/city/:id', 'CollegesController.showByCity')
  Route.get('colleges/:id/handler', 'CollegesController.getHandler')

  Route.get('colleges/:id/getGroups', 'CollegesController.getGroups')
  Route.get('colleges/:id/getLessons/:param/:date', 'CollegesController.getLessons')
  Route.get('colleges/:id/getLessonsWeek/:param/:week', 'CollegesController.getLessonsWeek')
  Route.get('colleges/:id/getCorps', 'CollegesController.getCorps')
}).prefix('api')
