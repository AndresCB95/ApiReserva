let reservas = require("./reservas.json")
let request = require("axios")

const reservasGet = () =>{

    return reservas

}

const reservasSet = async (reserva) =>{
    console.log("llama a reserva a guardar")
    await request.get(
        "http://localhost:8081/vuelos/id/?id="+reserva.idvuelo
    )
    .then(
        (res)=>{
            console.log("recibimos llamada del vuelo")
            console.log(res)
            console.log(res.data)
            reserva.vuelo = res.data
        }
    )
    
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