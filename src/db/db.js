import { resolve } from 'path';
import sqlite3 from "sqlite3"
import { DB_NAME } from '../config/global.js';
sqlite3.verbose()

let db = new sqlite3.Database(resolve(`src/db/${DB_NAME}`), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to db');
});

export default db;