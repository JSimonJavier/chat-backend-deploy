//? IMPORTS ---------------------------------->>>
import express from 'express'
import { usersRouter } from './routes/users.router.js' //importamos la ruta de los usuarios
import { petsRouter } from './routes/pets.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { usersHtmlRouter } from './routes/users.html.router.js'
//*SOCKET---------------->
import { Server } from 'socket.io'
import { testSocketChatRouter } from './routes/test.socket.chat.router.js'
//*-----------------------------
import path from "path"


//? --------------------------------------------------

const app = express()
const port = 3000

//! LISTEN PORT ------------------------------------>>>
const httpServer = app.listen(port, () => console.log(`listening on port http://localhost:${port}`))

//*SOCKET--------------------------------------->>>

const socketServer = new Server(httpServer)
let mensajes = []
socketServer.on('connection', (socket) => {
    console.log('se abrio un canal de socket' + socket.id);

   //back emite
    socket.emit('msg_back_to_front', {
        msg: Date.now() + ' hola desde el back al socket'
        
    }) //del back al front- le emito un mje al front        
    
    //back recibe
    socket.on('msg_front_to_back', (mje) => {
        console.log('recibe del front: ' + JSON.stringify(mje));
        mensajes.unshift(mje)
        socketServer.emit('msg_back_to_front', mensajes)
    }) //cuando recibe del front al back -no olvidarse de acutalizar el front

    // socket.broadcast.emit('msg_back_to_todos_menos_socket', {
    //     msg: 'hola desde el back a todos menos el socket'
    // }) //le mando mje a todos excepto al que me mando a mi

    // socket.broadcast.emit('msg_back_todos', {
    //     msg: 'hola desde el back a todos'
    // })





}) //cuando existes un socket nuevo en le back hay un front conectado (en el argumneto)
//!----------------------------------------------------

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//!handlebars------------------------------>>>
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
//!------------------------------------------------

// app.use(express.static('public')) //va a utilizar la carpeta public para archivos staticos VER: http://localhost:3000/perro.jpg

//!__DIRNAME----------------------------->>>
app.use(express.static(path.join(__dirname, 'public'))); //para utilizar __dirname, no olvidarse de importar path
//!-----------------------------------------------

//!routes---------API REST JSON--------------------->>>
app.use('/api/users', usersRouter) //lo que esta en la ruta users utilizada con /users
app.use('/api/pets', petsRouter) // lo que esta en la ruta pets
//!---------------------------------------------------

//! routes HTML RENDER SERVER SIDE ----------------->>>
app.use('/users', usersHtmlRouter)
// app.use('/pets', petsRouterHtml) 
//!----------------------------------------------------

//* routes sockets--------------------------------->>>
app.use('/test-chat', testSocketChatRouter)


//*----------------------------------------------------

app.get('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        msg: 'no encontrado',
        data: {}
    })
}) //cualquier ruta que no reconocezca mandala aca