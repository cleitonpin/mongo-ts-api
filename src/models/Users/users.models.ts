import { model } from 'mongoose';
import { IUserDocument, IUserModel } from './users.type'
import UserSchema from './user.schema';

// export const UserModel = model<IUserDocument>('user', UserSchema)
export const User: IUserModel = model<IUserDocument, IUserModel>('user', UserSchema)