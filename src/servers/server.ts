import express from 'express'
import sql from 'sqlite3'
import cors from 'cors'

import { open } from 'sqlite'
import { Subject } from '../observers/observer'
import { usuarios } from '../models/usarioModel'
import { dispositivos } from '../models/equipamentoModel'

type usuarios = {
    "id": "number",
    "email": "string",
    "password": "string",
    "status": "boolean"
}

type dispositivos = {
    'id': "number",
    'local': 'string',
    'status': 'string',
    'alert': 'boolean',
    'controle': 'string',
    'energia': 'number',
    'date': 'string'
}

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


const dbPromise = open({
    filename: 'database/equipamentos.db',
    driver: sql.Database
})


dbPromise.then(db => {
    db.exec(
        'CREATE TABLE IF NOT EXISTS usuarios ' +
        '(id INTEGER PRIMARY KEY, ' +
        'email TEXT, ' +
        'password TEXT' +
        'status BOOLEAN' +
        ')'
    )

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

const sensorData = new Subject()

class SQLiteUsuario {
    async update(dataUsr: usuarios) {
        const usr = await dbPromise
        const query = 'INSERT INTO usuarios (dataUser) VALUES (?, ?, ?, ?)'
        const params = [JSON.stringify(dataUsr)]
        await usr.run(query, dataUsr.id, dataUsr.email, dataUsr.password, dataUsr.status)
        console.log('Data saved to SQLite:', dataUsr)
    }
}

class SQLiteObserver {
    async update(dataEqp: dispositivos) {
        try {
            console.log(dataEqp)
            const eqp = await dbPromise
            console.log(dataEqp, eqp)
            const query = 'INSERT INTO dispositivos (id, local, status, alert, controle, energia, timestamp) ' +
                'VALUES (?,?,?,?,?,?,?)'
            const params = [JSON.stringify(dataEqp)]
            await eqp.run(query, dataEqp.id, dataEqp.local, dataEqp.status, dataEqp.alert,
                dataEqp.controle, dataEqp.energia, dataEqp.date)
            console.log('Data saved to SQLite:', dataEqp)
        } catch (error) {
            console.log(error)
        }
    }
}

const sqliteObserver = new SQLiteObserver()
sensorData.subscribe(sqliteObserver)

app.post('/users', (req, res) => {
    const dataUser = req.body
    sensorData.notify(dataUser)
    res.status(200).json({ mensagem: `Usuario salvo com sucesso ${dataUser}` })
})

app.get('/data', (req, res) => {
    console.log(res.id, res.local)
    sensorData.notify(dataEqp)
    res.status(200).json({ mensagem: `Data recebida e salva com sucesso ${dataEqp}` })
})

app.post('/data', (req, res) => {
    const dataEqp = req.body
    console.log(dataEqp.id, dataEqp.local)
    sensorData.notify(dataEqp)
    res.status(200).json({ mensagem: `Data recebida e salva com sucesso ${dataEqp}` })
})

app.listen(PORT, () => {
    console.log(`Server executando na porta: ${PORT}`)
})