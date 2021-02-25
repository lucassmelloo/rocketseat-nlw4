import 'reflect-metadata';
import express from 'express';
import createConnection from  "./database";
import { router } from './routes';

/*
    GET -> BUSCA
    POST -> SALVAR INFORMAÇÃO 
    PUT -> ALTERAR INFORMAÇÃO 
    DELETE -> DELETAR 
    PATCH -> ALTERAÇÃO ESPECIFICA

    ROTA: http://localhost:33333/[recurso]

    1 param => Rota (Recurso API)
    2 param => request, response
*/

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app }
