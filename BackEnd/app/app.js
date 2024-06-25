
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


/*const storageT = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {

        let lasts  = file.originalname.lastIndexOf('.');
        cb(null, file.originalname.substring(0,lasts)+'(jjj)'+'ok'+file.originalname.substring(lasts))
    }
});*/
const storageS = multer.memoryStorage();
const upload =  multer({ storage: storageS});

const corsOptions = {
    origin: '*',  // Umożliwia dostęp z dowolnej domeny. Zmien to na konkretną domenę, jeśli to konieczne.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10mb'}));

app.use(express.static('public'));

app.use(cors(corsOptions));

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.error(error);
    }
    else {
        console.info('Connect with database established');
    }
});

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
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
