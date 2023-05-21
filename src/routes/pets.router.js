import express from 'express'
import { uploader } from '../utils.js' //para poder subir la foto con MULTER

let pets = [
    {id: "100", name: "Firulais" , edad: 30},
    {id: "101", name: "Pachu", edad: 31},
    {id: "102", name: "Scooby", edad: 32}
]

export const petsRouter = express.Router()

petsRouter.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        msg: 'listado de mascotas', 
        data: pets
     })
})

petsRouter.post('/', uploader.single('file'), (req, res) => {
    const newPet = req.body
    newPet.id = (Math.random() * 1000000).toFixed(0).toString()
    newPet.picture = 'http://localhost:3000/' + req.file.filename
    pets.push(newPet)
    res.status(201).json({ 
        status: 'success',
        msg: 'mascota creada', 
        data: newPet
     })
}) // para enviar ahora seria form-data

petsRouter.get('/test', (req, res) => {

    const datos = { name: 'fatiga', edad: 10 }
    return res.status(200).render('pet', datos)


    // res.status(200).json({ 
    //     status: 'success',
    //     msg: 'listado de usuarios', 
    //     data: usuarios
    //  })
})