import { Schema, model } from 'mongoose';

export interface User {
    readonly _id: string;
    email: string;
    password: string;
    registeredAt: Date;
    lastLogIn: Date;
}

const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    lastLogIn: { type: Date, default: Date.now }
});

export const UserModel = model('User', userSchema, 'users');
