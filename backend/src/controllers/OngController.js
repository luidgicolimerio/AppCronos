const crypto = require('crypto');
const connection = require('../database/connection');

//**Codigo de criação de ongs */
module.exports = {  
//**Sistema de listagem de ongs */
async index (request, response){
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
},
//**Sistema de criação de ongs */

async create(request, response){
    const {name, email, Whattsapp, Cidade, uf} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        Whattsapp,
        Cidade,
        uf,
    })
//**Mostrar as informações de cadastro da ong no terminal */
    console.log({name, email, Whattsapp, Cidade, uf})

    return response.json ({ id });
}



}