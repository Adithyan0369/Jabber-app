// import app from "./index.js"
import { server } from "./index.js";
import mongodb from "mongodb"
import dotenv from "dotenv"
import jabberDAO from "./dao/jabberDAO.js";
import msgDAO from "./dao/msgDAO.js";
import contactDAO from './dao/contactDAO.js'
dotenv.config();

const mongodb_username = process.env['MONGODB_USERNAME']
const mongodb_password = process.env['MONGODB_PASSWORD']
const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.tdfr4x8.mongodb.net/?retryWrites=true&w=majority`
const port = process.env.PORT || 8000;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(uri,{
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
}).catch(err=>{
    console.log(err.stack)
    process.exit(1)
}).then(async client =>{
    await jabberDAO.injectDB(client)
    await msgDAO.injectDB(client)
    await contactDAO.injectDB(client)
    server.listen(port,()=>{
        console.log(`Server is running in Port ${port}`)

    })
})