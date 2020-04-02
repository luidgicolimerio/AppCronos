const connection = require('../database/connection');
//**codigo para cadastrar incidentes */
module.exports = {
    //**sistema de listagem dos casos(get) */
    async index(request, response){
        const { page = 1 } = request.query;              //**Sistema de paginaçao */
        
                                                                                   //**Vai a presentar o total de casos no terminal */
        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')                //**Funçao que dados de uma tabela com a outra */
        .limit(5)                                         //**5 casos por pagina */
        .offset((page - 1) * 5)                            //**pular os casos da primeira pag */
        .select([                          
            'incidents.*',
            'ongs.name',
            'ongs.email',                  //**listei tudo que eu quero que me retorne nos casos */
            'ongs.Whattsapp',
            'ongs.Cidade',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);                //**Mostrar o total de casos no headear do front end */

        return response.json(incidents);
    },
//**Sistema de cadastramento(post) */
    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [ id ] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id})
    },
    //**Sistema de apagar casos(delete) */
    async delete( request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id /= ong_id) {
        return response.status(401).json({ error: 'Operation not permited.'});
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();

    }

}