
import express from "express";
import { createServer } from 'http'
import path from "path";
import { Server } from 'socket.io'
import { URL } from 'url';
import { instrument } from "@socket.io/admin-ui";
import { PORT, NODE_ENV } from './config/index.js'
import socketServer from './socket/index.js'

const __dirname = new URL('.', import.meta.url).pathname;

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://admin.socket.io',
      'http://localhost:3008',
      'localhost:3008',
      'localhost:3006',
    ],
    credentials: true,
  }
})

instrument(io, {
  auth: false
})

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'views/html/index.html')
})

app.get('/game/:nombreSala', (req, res) => {
  res.sendFile(__dirname + 'views/html/game.html')
})


// Configuramos las rutas de socket
socketServer(io);


httpServer.listen(PORT, () => {
  console.log(`servirdor encendido  en http://localhost:${PORT}`)

})