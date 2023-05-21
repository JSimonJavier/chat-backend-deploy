import express from 'express'

let usuarios = [
    { id: "100", name: "Javier", edad: 30 },
    { id: "101", name: "Joaquin", edad: 31 },
    { id: "102", name: "Rafael", edad: 32 }
]

export const usersHtmlRouter = express.Router()

usersHtmlRouter.get('/', (req, res) => {

    const datos_usuario = { name: 'javi', edad: 31, isAdmin: false }
    return res.status(200).render('usuario', { datos_usuario, usuarios })
})

usersHtmlRouter.get('/all', (req, res) => {
    return res.status(200).render('all_usuarios', { usuarios })
})

usersHtmlRouter.get('/registrer', (req, res) => {
    return res.render('registrer')
})

usersHtmlRouter.post('/', (req, res)=>{
    const newUser = req.body
    
    usuarios.push(newUser)

    return res.send('usuario creado')
})

usersHtmlRouter.get('/list', (req,res) =>{
    res.render('list', {usuarios})
})