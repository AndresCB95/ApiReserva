let reservas = require("./reservas.json")
let request = require('axios');


const reservasGet = () =>{

    return reservas

}

const reservasSet = async (reserva) =>{
    console.log("llama vuelo")
    await request.get("http://localhost:8081/vuelos/id?id=BM01").then(
    (res)=>{
        console.log("Recibio vuelo")
        console.log(res.data)
        console.log(reserva)
        reserva.vuelo=res.data
        console.log(reserva)
    })
    console.log("espera termina")
    console.log(reserva)
    reservas.push(reserva)
    console.log(reservas)
    return reservas

}

const reservasDelete = (id) =>{
    console.log(reservas)
    reservas = reservas.filter((vuel)=>{
        return vuel.id != id
    }
    )
    console.log(reservas)
    return reservas
}

module.exports.reservasgetExport = reservasGet;
module.exports.reservasSetExport = reservasSet;
module.exports.reservasDeleteExport = reservasDelete;