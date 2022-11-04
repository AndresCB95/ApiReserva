const express = require("express")
const cors = require("cors")
const body_parse = require("body-parser")
const path = require("path")
const reservasService = require("./reservaService.js")

const app = express()
const port = 8084


app.use(cors())
app.use(body_parse.json())

const pathName="reservas/"


app.get(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req)
        res.send(reservasService.reservasgetExport())
    }
)


app.post(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        let reservas = reservasService.reservasSetExport(req.body)
        res.send({"mensaje":"reserva Guardado","reservas":reservas})
    }
)

app.delete(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        let id = req.query.id
        console.log(id)
        let reservas = reservasService.reservasDeleteExport(id)
        res.send({"mensaje":"reserva Guardado","reservas":reservas})
    }
)

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        res.send("Finaliza")
    }
)

app.patch(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        res.send("Finaliza")
    }
)


app.listen(port, 
    ()=>{
        console.log("Subio el app reserva en el puerto "+port)
    }
)
