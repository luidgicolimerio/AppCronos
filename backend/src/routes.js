const express = require('express');

const OngController = require ('./controllers/OngController');

const IncidentsController = require ('./controllers/IncidentsController');

const ProfileController = require ('./controllers/ProfileController');

const SessionController = require ('./controllers/SessionController');

//**Rotas */

const routes = express.Router();

//**Rotas para cadastrar e listar ongs */
routes.get ('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/sessions',SessionController.create );

//**Rotas para cadastrar,listar e apagar incidentes */
routes.get ('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

//**Rota para checar um caso especifico de uma ong */
routes.get('/profile', ProfileController.index);





module.exports = routes;