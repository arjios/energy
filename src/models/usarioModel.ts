import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const usrPromise = open({
    filename: '../database/energy.db',
    driver: sqlite3.Database
})

usrPromise.then(db => {
    db.exec(
        'CREATE TABLE IF NOT EXISTS usuarios ' +
        '(id INTEGER PRIMARY KEY, ' +
        'email TEXT, ' +
        'password TEXT' +
        'status BOOLEAN' +
        ')'
    )
})

export const usuarios = {
    "id": "number",
    "email": "string",
    "password": "string",
    "status": "boolean"
}
