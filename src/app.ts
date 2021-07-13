global.XMLHttpRequest = require('xhr2')
import * as dotenv from 'dotenv';
import express from 'express';
import { connect } from './database/connection';
import { router } from './routes';

dotenv.config();
const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)

connect(process.env.URI as string);


export { app }