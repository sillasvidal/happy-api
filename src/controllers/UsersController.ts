import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import bcrypt from 'bcryptjs';

import User from '../models/User';

export default {
    async create (request: Request, response: Response) {
        const { name, email, password } = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
        });

        const password_hash = bcrypt.hashSync(password, 8);

        const data = { 
            name, 
            email,
            password: password_hash
        }

        await schema.validate(data, {
            abortEarly: false,
        });

        const userRespository = getRepository(User);

        const validateUserExists = await userRespository.findOne({
            where: {
                email: email
            }
        });

        if(validateUserExists) {
            return response.json({ message: 'Já existe um usuário cadastrado com esse endereço de e-mail' });
        }

        const user = userRespository.create(data);

        await userRespository.save(user);
        
        return response.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
}