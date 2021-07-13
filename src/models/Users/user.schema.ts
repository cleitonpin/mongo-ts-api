import { Schema } from 'mongoose';
import { IUserDocument } from './users.type';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: String,
    password: String,
    phone_number: String,
    img_url: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})


// statics
UserSchema.statics.findByEmail = function(email: string): Promise<IUserDocument> {
    return this.find({ email })
};

UserSchema.statics.findOneOrCreate = async function(userId: string): Promise<IUserDocument> {
    const record = await this.findOne({ userId });

    if (record) {
        return record
    } 

    return this.create({ userId })
};

export default UserSchema;