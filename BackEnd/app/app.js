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
const upload = multer({ storage: storageS });

const corsOptions = {
    origin: '*', // Zmień na konkretną domenę w środowisku produkcyjnym.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors(corsOptions));

// Połączenie z bazą danych MongoDB
mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Dodaj tę opcję, aby uniknąć ostrzeżeń deprecjacji
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

