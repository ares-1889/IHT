const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Todo = require('./models/Todo')


// Execute Express
const PORT = process.env.PORT_ || 5000
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
    res.status(200).send('hello World')
})

app.post('/',(req,res)=>{
    res.send('Request delievered')
})

// const MONGOURI = "mongodb+srv://Apar_Shrestha:iambatman@nodeexpressprojects.lkegi.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProjects"

const connectionString = process.env.MONGO_URI

//Routes
app.get('/todo', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos);
})

app.post('/todo/new', async (req, res) => {
    const newTask = await Todo.create(req.body)
    res.status(201).json({newTask})
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})





mongoose.connect(connectionString).then(()=>{
    console.log(`Connection to the Database is successful`)
})
.catch((err)=>{
    console.error('Connection Error:',err)
})

app.listen(PORT,()=> console.log(`Server on Port ${PORT}`))