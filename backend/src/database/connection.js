const knex = require('knex');
const configuration = require('../../knexfile')

const connection = knex(configuration.development);     //**sistema de conexão com o banco de dados */

module.exports = connection;