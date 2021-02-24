import 'reflect-metadata';
import express from 'express';
import "./database";
import { router } from './routes';

const app = express();
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
app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("O parada ta funcionando"));
