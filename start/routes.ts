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
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })
Route.get('/login', 'security/AuthenticationController.loginView').as('login')
Route.post('/login', 'security/AuthenticationController.login')
Route.get('/logout', 'security/AuthenticationController.logout')
Route.get('/register', 'security/AuthenticationController.registerView').as('register')
Route.post('/register', 'security/AuthenticationController.register')
Route.group(() => {

  // home
  Route.get('/', 'HomeController.index').as('home')
  Route.get('/settings', 'HomeController.settings').as('settings')

  // user
  Route.get('/users', 'UsersController.index').as('users')
  Route.post('/user/add', 'UsersController.adduser')
  Route.get('/user/add', 'UsersController.adduserView').as('adduser')
  Route.get('/user/edit/:id', 'UsersController.edituserView').as('edituser')
  Route.post('/user/edit/:id', 'UsersController.update')

  // group
  Route.get('/groups/', 'GroupsController.index').as('groups')
  Route.get('/group/add', 'GroupsController.addGroup').as('addgroup')
  Route.get('/group/edit/:id', 'GroupsController.editGroup').as('editgroup')
  Route.post('/group/add', 'GroupsController.store')
  Route.post('/group/edit/:id', 'GroupsController.update')
  Route.post('/group/delete/:id', 'GroupsController.delete').as('deletegroup')

  // permission
  Route.get('/permissions/', 'PermissionsController.index').as('permissions')
  Route.get('/permission/add', 'PermissionsController.addPermission').as('addpermission')
  Route.get('/permission/edit/:id', 'PermissionsController.editPermission').as('editpermission')
  Route.post('/permission/delete/:id', 'PermissionsController.delete').as('deletepermission')
  Route.post('/permission/add', 'PermissionsController.store')
  Route.post('/permission/edit/:id', 'PermissionsController.update')

  // access permissions
  Route.get('/access', 'AccessesController.index').as('access')

}).middleware('auth')
