import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from "path";
import { environments } from './config/environments.js';
import { connectDB } from './config/database.js';

import fileDirName from "./utils/fileDirName.js";
const { __dirname } = fileDirName(import.meta);

import authorRoutes from './routes/author.routes.js'
import genreRoutes from './routes/genre.routes.js'
import bookRoutes from './routes/books.routes.js'




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

app.use(express.static(path.join(__dirname, "../assets")));

connectDB();

app.use('/api', authorRoutes);
app.use('/api', genreRoutes);
app.use('/api', bookRoutes);


app.listen(environments.APP_PORT, () => {
    console.log(`Servidor en ${environments.APP_URL}:${environments.APP_PORT}`);
});
