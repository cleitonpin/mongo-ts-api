import { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface ITestDocument extends Document {
    // properites
    name: string,
    gender: 'm' | 'f'

    // methods
    getFullGender(): string
};

export const TestSchema: Schema = new Schema({
    name: String,
    gender: String
})

// method

TestSchema.methods.getFullGender = function(this: ITestDocument) {
    return this.gender === 'm' ? 'male' : 'female'
}

//static 

TestSchema.statics.findByName = function(name: string): Promise<Array<ITestDocument>> {
    return this.find({ name });
}