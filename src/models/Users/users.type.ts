import { model } from 'mongoose'
import { Document, Model } from 'mongoose'
import UserSchema from './user.schema'


export interface IUser {
    _id: string;
    email: string;
    username: string;
    password?: string;
    createdAt?: Date;
    phone_number: string;
    img_url: string;
}

export interface IUserDocument extends IUser, Document {
    _id: string;
    setCreatedAt: (this: IUserDocument) => Promise<void>;
    sameEmail: (this: IUserDocument) => Promise<Document[]>;
}

export interface IUserModel extends Model<IUserDocument> {
    findOneOrCreate: (
        this: IUserModel,
        {
            email,
            username,
            password,
        }: { email: string; username: string; password: string }
        ) => Promise<IUserDocument>;
    findByEmail: (
        this: IUserModel,
        email: string
    ) => Promise<Array<IUserDocument>>;
}

