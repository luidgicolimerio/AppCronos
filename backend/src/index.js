const express = require('express');
const cors = require('cors');
const routes = require ('./routes');
const app = express();

app.use(cors());
app.use (express.json()); //**Ver mais informaçoes no final da primeira aula */
app.use (routes);



app.listen(3333);    //**Ligar o servidor como host */

