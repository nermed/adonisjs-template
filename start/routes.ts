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
  Route.post('/user/delete/:id', 'UsersController.delete').as('deleteuser')
  Route.post('/user/changeStatus', 'UsersController.changeStatus')

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
  Route.post('/access', 'AccessesController.storeAccess')
  Route.post('/access/getAccess', 'AccessesController.getAccess')

  // dossiers
  Route.get('/dossiers','logics/DossiersController.index').as('dossiers')
  Route.get('/dossiers/affectations','logics/DossiersController.seeAssignByIngenieur').as('affectionsdossiers')
  Route.get('/dossier/add','logics/DossiersController.addDossier').as('adddossier')
  Route.get('/dossier/edit/:id','logics/DossiersController.editDossier').as('editdossier')
  Route.get('/dossier/detail/:id','logics/DossiersController.detailDossier').as('detaildossier')
  Route.post('/dossier/storeDossier','logics/DossiersController.storeDossier')
  Route.post('/dossier/editStoreDossier/:id','logics/DossiersController.editStoreDossier')
  Route.post('/dossier/addPriceDossier/:id','logics/DossiersController.addPriceDossier')
  Route.post('/dossier/confirmDossier/:id','logics/DossiersController.confirmDossier')
  Route.post('/dossier/denieDossier/:id','logics/DossiersController.denieDossier')
  Route.post('/dossier/uploadFile/:id','logics/DossiersController.uploadFile')

  // projet commande
  Route.get('/dossier/projetCommande/:id','logics/ProjetCommandesController.index').as('projetcommandes')
  Route.get('/dossier/projetCommande/add/:id','logics/ProjetCommandesController.addProjetCommande').as('addprojetcommandes')
  Route.get('/dossier/projetCommande/edit/:id','logics/ProjetCommandesController.editProjetCommande').as('editprojetcommandes')
  Route.post('/dossier/projetCommande/storeProjetCommande/:id','logics/ProjetCommandesController.storeProjetCommande')
  Route.post('/dossier/projetCommande/storeEditProjetCommande/:id','logics/ProjetCommandesController.storeEditProjetCommande')
  Route.post('/dossier/projetCommande/confirmProjetCommande/:id','logics/ProjetCommandesController.confirmProjetCommande')

  // fournisseurs
  Route.get('/fournisseurs', 'logics/FournisseursController.index').as('fournisseurs')
  Route.get('/fournisseurs/secteurActivite', 'logics/FournisseursController.categorieList').as('categoriefournisseurs')
  Route.get('/fournisseurs/add', 'logics/FournisseursController.addViewFournisseur').as('addfournisseurs')
  Route.get('/fournisseurs/secteurActivite/add', 'logics/FournisseursController.addCategorie').as('addfournisseurscategorie')
  Route.get('/fournisseurs/edit/:id', 'logics/FournisseursController.editViewFournisseur').as('editfournisseurs')
  Route.get('/fournisseurs/secteurActivite/edit/:id', 'logics/FournisseursController.editCategorie').as('editfournisseurscategorie')
  Route.get('/fournisseur/detail/:id', 'logics/FournisseursController.detailFournisseur').as('detailfournisseur')
  Route.post('/fournisseurs/storeFournisseur', 'logics/FournisseursController.storeFournisseur')
  Route.post('/fournisseurs/updateFournisseur/:id', 'logics/FournisseursController.updateFournisseur')
  Route.post('/fournisseurs/storeFournisseurCategorie', 'logics/FournisseursController.storeFournisseurCategorie')
  Route.post('/fournisseurs/updateFournisseurCategorie/:id', 'logics/FournisseursController.updateFournisseurCategorie')

  // rapport
  Route.get('rapport', 'logics/RapportsController.index').as('rapport')
}).middleware('auth')
