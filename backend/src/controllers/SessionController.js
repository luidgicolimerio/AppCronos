const connection = require('../database/connection');
//**Codigo para login */
module.exports = {
    async create(request, response) {
        const { id } = request.body;//**com o id eu consigo logar */

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')//**e o front end vai me retornar o nome  */
        .first();

        if(!ong){
            return response.status(400).json({ error: 'No user found with this ID'});//**Se a ong nao existe */
        }
        
        return response.json(ong)//**se tudo deu certo */
    }
}