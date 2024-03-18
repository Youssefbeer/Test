const express = require("express")
const fs = require("fs")
const { verifyQuestion, middlewareVerification } = require("./utils")
const PORT = 3000
const app = express()
app.use(express.static("./static"))
app.use(express.json())

app.get("/etudiants",(req,res)=>{
    fs.readFile("./database/etudiants.json",(err,data)=>{
        if(err)
            return res.status(500).send("error on the server")
        let etudiants = JSON.parse(data.toString()).etudiants
        res.status(200).json(etudiants)
    });
})

app.post("/etudiants",middlewareVerification,(req,res)=>{
    let {nom,prenom,age} = req.body
    fs.readFile("./database/etudiants.json",(err,dataFile)=>{
        if(err)
            return res.status(500).send("error on the server")
        let data = JSON.parse(dataFile.toString())
        let etudiantToSave = {
            id:data.lastId,
            nom,
            prenom,
            age
        }
        data.etudiants.push(etudiantToSave)
        data.lastId++
        fs.writeFile("./database/etudiants.json",JSON.stringify(data,null,4),(err)=>{
            if(err)
                return res.status(500).send("error on the server")
            res.status(201).json(etudiantToSave)
        })
    });
})

app.delete("/etudiants/:id",(req,res)=>{
    let {id} = req.params
    //let id = req.params.id
    fs.readFile("./database/etudiants.json",(err,data)=>{
        if(err)
            return res.status(500).send("error on the server")
        let dataFile = JSON.parse(data.toString())
        let etudiants = dataFile.etudiants
        let etudiantIndex = etudiants.findIndex(ele=>ele.id==id)
        if(etudiantIndex==-1)
            return res.status(404).send("Student not found")
       // questions = questions.filter((ele,index)=>index!=questionIndex)
        dataFile.etudiants = etudiants.filter(ele=>ele.id!=id)
        fs.writeFile("./database/etudiants.json",JSON.stringify(dataFile,null,4),(err)=>{
            if(err)
                return res.status(500).send("error on the server")
            res.status(200).json(" Student is deleted with success")
        })
    });
})


app.put("/etudiants/:id",middlewareVerification,(req,res)=>{
    let {id} = req.params
    fs.readFile("./database/etudiants.json",(err,data)=>{
        if(err)
            return res.status(500).send("error on the server")
        let dataFile = JSON.parse(data.toString())
        let etudiants = dataFile.etudiants
        let etudiantsData = etudiants.find(ele=>ele.id==id)
        if(!etudiantsData)
            return res.status(404).send("Student not found")
       let {nom,prenom,age} = req.body
       etudiantsData.nom=nom
       etudiantsData.prenom=prenom
       etudiantsData.age=age
       
       fs.writeFile("./database/etudiants.json",JSON.stringify(dataFile,null,4),(err)=>{
        if(err)
            return res.status(500).send("error on the server")
        res.status(200).json(etudiants)
    })
    });
})



app.listen(PORT,()=>console.log("server started at ", PORT))