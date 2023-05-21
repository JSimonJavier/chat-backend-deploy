import express from 'express'

let pets = [
    {id: "100", name: "Firulais" , edad: 30},
    {id: "101", name: "Pachu", edad: 31},
    {id: "102", name: "Scooby", edad: 32}
]

export const testSocketChatRouter = express.Router()

testSocketChatRouter.get('/', (req, res) => {
   return res.render('test-chat', {})
})

