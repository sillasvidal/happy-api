import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../models/User';

export default {
    async create (request: Request, response: Response ) {
        const { email, password } = request.body;

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                email: email
            }
        });

        if(!user){
            return response.status(400).json({ message: 'E-mail não encontrado na base de dados'});
        }

        const validatePassword = await bcrypt.compareSync(password, user.password);

        if(!validatePassword) {
            return response.status(400).json({ message: 'A senha informada não é válida'})
        }

        const token = user.generateToken();

        return response.json({ token: token});
    }
}