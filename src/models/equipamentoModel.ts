import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const eqpPromise = open({
    filename: '../database/energy.db',
    driver: sqlite3.Database
})

eqpPromise.then(db => {
    db.exec(
        'CREATE TABLE IF NOT EXISTS dispositivos ' +
        '(id INTEGER PRIMARY KEY, ' +
        'local TEXT, ' +
        'status TEXT, ' +
        'alert BOOLEAN, ' +
        'controle TEXT, ' +
        'energia REAL' +
        'date TEXT, ' +
        'timestamp DATETIME DEFAULT CURRENT_TIMESTAMP' +
        ')'
    )
})

export const dispositivos = {
    'id': "number",
    'local': 'string',
    'status': 'string',
    'alert': 'boolean',
    'controle': 'string',
    'energia': 'number',
    'date': 'string'
}
