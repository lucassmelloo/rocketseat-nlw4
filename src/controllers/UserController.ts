import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';

class UserController {

    async create(request: Request, response: Response) {
        const {name, email} = request.body;
        
        const schema = yup.object().shape({
            name: yup.string().required("Bota o nome direito ai mano!"),
            email: yup.string().email().required("Esse email ta meio estranho..."),
        })

        try{
            await schema.validate(request.body, { abortEarly: false})
        }catch(err){
            return response.status(400).json({error: err})
        }

        const usersRepository = getCustomRepository(UsersRepository);

        //Selecte * from users where email = 'email'
        const userAlreadyExists = await usersRepository.findOne({email,});

        if(userAlreadyExists){
            return response.status(400).json({
                error: "User Already exists!"
            })
        }
 
        const user = usersRepository.create({
            name, email
        }) 

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };
