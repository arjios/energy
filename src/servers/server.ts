import express from 'express'
import sql from 'sqlite3'
import cors from 'cors'

import { open } from 'sqlite'
import { Subject } from '../observers/observer'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


const dbPromise = open({
    filename: 'equipamentos.db',
    driver: sql.Database
})

dbPromise.then(db => {
    db.exec(
            'CREATE TABLE IF NOT EXISTS dispositivos ' + 
            '(id INTEGER PRIMARY KEY, ' +
            'local TEXT, ' +
            'status TEXT' +
            'alert BOOLEAN, ' +
            'controle TEXT, ' +
            'date TEXT, ' +
            'timestamp DATETIME DEFAULT CURRENT_TIMESTAMP' +   
        ')'
    )
})

const sensorData = new Subject()

class SQLiteObserver { async update(data: any) { 
        const db = await dbPromise
        await db.run('INSERT INTO sensor_data (data) ' + 
            'VALUES (?, ?, ?, ?, ?, ?, ?)', 
            JSON.stringify(data))
        console.log('Data saved to SQLite:', data)
    }
} 

const sqliteObserver = new SQLiteObserver()
sensorData.subscribe(sqliteObserver)

app.post('/data', (req, res) => {
    const { data } = req.body
    sensorData.notify(data)
    res.status(200).json({ mensagem: 'Data recebida e salva com sucesso'})
})

app.listen(PORT, () => {
    console.log(`Server executando na porta: ${PORT}`)
})