import { Schema, model } from 'mongoose';

export interface UserSocket {
    readonly _id: string;
    userId: string;
    socketId: string;
}

const userSocketSchema = new Schema<UserSocket>({
    userId: { type: String, required: true, unique: true },
    socketId: { type: String, required: true, unique: true }
});

export const UserSocketModel = model('UserSocket', userSocketSchema, 'userSocket');