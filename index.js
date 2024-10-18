import express from 'express'
import fs from 'fs'
import { format } from "date-fns";
import path from 'path'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log("Server is Listening in PORT:",PORT))
app.get('/',(req,res)=>{
    let timeStamp = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
    fs.writeFileSync(`TimeStamp/${timeStamp}.txt`,`${timeStamp}`,'utf-8')
    let data = fs.readFileSync(`TimeStamp/${timeStamp}.txt`,'utf-8')
    try {
        res.status(200).send(data)
        
    } catch (error) {
        req.res(500).send("Internal Server Error")
    }
})

app.get('/timeStampdetails',(req,res)=>{
    fs.readdir('TimeStamp',(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internal Server Error")
        }else{
            const dataFiles = data.filter((file)=>path.extname(file)=== ".txt")
            res.status(200).json(dataFiles)
        }
    })
    
})