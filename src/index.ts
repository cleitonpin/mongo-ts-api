import chalk from 'chalk';
import { app } from './app';

const PORT = 3000 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`⚡ [Server]: running at ${chalk.cyan(`http://localhost:${PORT}`)}`)
})


// global.XMLHttpRequest = require('xhr2')
// import chalk from 'chalk';
// import express from 'express';
// import { connect } from './database/connection';

// // middlewares
// import uploads from './middleware/upload';
// import authMiddleware from './middleware/authentication';

// // controllers
// import UserController from './controllers/UserController'
// import AuthController from './controllers/AuthController';

// const app: express.Application = express();
// const PORT = 3000 || process.env.PORT;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())

// connect();

// app.get('/', authMiddleware, UserController.index);
// app.post('/', UserController.create)
// app.delete('/:_id', authMiddleware, UserController.delete)

// app.post('/upload/:_id', uploads.single('image'), UserController.upload)
// //  AUTHENTICATION ROUTE
// app.post('/sigin', AuthController.authenticate);

// app.listen(PORT, () => {
//     console.log(`⚡ [Server]: running at ${chalk.cyan(`http://localhost:${PORT}`)}`)
// })
