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

// Konfiguracja Multer
const storageS = multer.memoryStorage();
const upload = multer({ storage: storageS });

// Konfiguracja CORS
const corsOptions = {
    origin: 'https://galleryapp.onwebapp.io', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware do ustawiania nagłówków HTTP
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors(corsOptions));

// Połączenie z bazą danych MongoDB
mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) {
        console.error('Błąd połączenia z bazą danych:', error);
    } else {
        console.info('Połączenie z bazą danych zostało nawiązane');
    }
});

// Obsługa błędów połączenia z bazą danych
mongoose.connection.on('error', (err) => {
    console.error('Błąd połączenia z MongoDB:', err);
});

process.on('SIGINT', () => {
    mongoose.connection.close(function () {
        console.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// Obsługa tras aplikacji
routes(app);

// Obsługa nieznanych tras - zwracanie pliku index.html
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Nasłuchiwanie na porcie zdefiniowanym w konfiguracji
app.listen(config.port, function () {
    console.info(`Serwer działa na porcie ${config.port}`)
});
