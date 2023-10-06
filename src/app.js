import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

import { environments } from './config/environments.js';
import { connectDB } from './config/database.js';

import AuthorRoutes from './routes/author.routes.js'

import fileDirName from './utils/fileDirName.js';
const { __dirname } = fileDirName(import.meta);


const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));
//configuración de File Upload
app.use(fileUpload());

connectDB();

app.use('/api', AuthorRoutes)


app.listen(environments.APP_PORT, () => {
    console.log(`Servidor en ${environments.APP_URL}:${environments.APP_PORT}`);
});
