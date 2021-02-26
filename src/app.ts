import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import "express-async-errors";
import createConnection from  "./database";
import { router } from './routes';
import { AppError } from './errors/AppError';


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

app.use((err: Error, request: Request, response: Response, _next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    })
})
export { app }
