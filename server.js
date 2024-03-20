
import express from 'express'
import dbcon from './utlis/db.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

//mongodb

app.listen(process.env.PORT,()=>{
    console.log('sever is running')
})