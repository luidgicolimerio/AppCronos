const connection = require('../database/connection');
//**codigo para listar casos especificos de uma ong */
module.exports = {
 async index(request, response) {
     const ong_id = request.headers.authorization;      //** (senha)para checar os casos */

     const incidents = await connection('incidents')
     .where('ong_id', ong_id)
     .select('*');

     return response.json(incidents);
 }

}