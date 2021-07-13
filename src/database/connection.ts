import mongoose from 'mongoose';
import { greenBright, redBright } from 'chalk';

let database: mongoose.Connection;

export const connect = (uri: string) => {
    // const uri = 'mongodb+srv://dbTest:admin@cluster0.k4x76.mongodb.net/disboard?retryWrites=true&w=majority';

    if (database)
        return;

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });

    database = mongoose.connection;

    database.once('open', () => {
        console.log(greenBright('Conected to database'))
    });

    database.once('error', () => {
        console.log(redBright('Error connecting to database'))
    })
}

export const disconnect = () => {
    if(!database)
        return;

    mongoose.disconnect();
}