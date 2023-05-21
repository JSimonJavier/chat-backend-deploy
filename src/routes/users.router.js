import express from 'express'

let usuarios = [
    { id: "100", name: "Javier", edad: 30 },
    { id: "101", name: "Joaquin", edad: 31 },
    { id: "102", name: "Rafael", edad: 32 }
]

export const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        msg: 'listado de usuarios',
        data: usuarios
    })
})

usersRouter.post('/', (req, res) => {
    const newUser = req.body
    newUser.id = (Math.random() * 1000000).toFixed(0).toString()
    usuarios.push(newUser)
    res.status(201).json({
        status: 'success',
        msg: 'usuario creado',
        data: newUser
    })
})

usersRouter.get('/test', (req, res) => {

    const datos_usuario = { name: 'javi', edad: 31, isAdmin: true }
    return res.status(200).render('usuario', { datos_usuario, usuarios })


    // res.status(200).json({ 
    //     status: 'success',
    //     msg: 'listado de usuarios', 
    //     data: usuarios
    //  })
})