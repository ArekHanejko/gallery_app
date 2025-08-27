import bodyParser from "body-parser";
import config from "./config.js";
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
import multer from 'multer';
import * as fs from "fs";
import * as path from "path";
import * as ld from "lodash/collection.js";


const storageS = multer.memoryStorage();
const upload =  multer({ storage: storageS});
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(express.static('public'));

app.use(cors());


async function connectToDatabase() {
  try {
      await mongoose.connect(config.databaseUrl);
      console.info('Connection with database established');
  } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1); 
  }
}

connectToDatabase();

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
      console.error('Mongoose default connection disconnected through app termination');
      process.exit(0);
  });
});


routes(app);

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
});