import { Schema, model } from 'mongoose';

export interface Message {
    readonly _id: string;
    sender: string;
    recipient: string;
    message: string;
    createdAt: Date;
}

const MessageSchema = new Schema<Message>({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const MessageModel = model('Message', MessageSchema, 'messages');