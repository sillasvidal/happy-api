import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

@Entity('users')

export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    generateToken() {
        return jwt.sign({ id: this.id}, "secret", {
            expiresIn: 86400
        });
    }

    cripPassword() {
        return bcrypt.hashSync(this.password, 8);
    }
}