import express from "express"
import routes from "./routes/index.js"
import { config } from "dotenv"
import db from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(routes)

app.use((err, req, res, next)=>{
    res.status(err.status || 400)
        .json({message: err.message || 'There seems to be some problem.'})
})

app.listen(process.env.API_PORT, process.env.API_HOST, async ()=>{
    console.log(`Server started on http://${process.env.API_HOST}:${process.env.API_PORT}`)
    console.log('Press Ctrl+C to stop')
    
    await db.connect(process.env.MONGO_URL)
    console.log('MongoDB connected')
    
})


