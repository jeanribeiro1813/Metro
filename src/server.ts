import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';
import AppError from './errors/AppError';

import uploadConfig from './config/upload';

import './database';

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: true, limit: '100mb'}))
app.use('/files/avatar', express.static(uploadConfig.avatarsUploadFolder));
app.use('/files/Supervision', express.static(uploadConfig.supervisionImgsUploadFolder));
app.use('/files/Ubicaciones', express.static(uploadConfig.ubicacionesImgsUploadFolder));
app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      console.error(err);
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }
      
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

const PORT = process.env.PORT || 3334;
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}!`)
})