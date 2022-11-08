let reservas = require("./reservas.json")
let request = require('axios');


const reservasGet = () =>{

    return reservas

}

const reservasSet = async (reserva) =>{
    console.log("llama a reserva a guardar")
    const vuelo = request.get(
        "http://localhost:8081/vuelos/id/?id="+reserva.vuelo
    )
    const cliente = request.get("http://localhost:8082/clientes/id/?id="+reserva.cliente)

    await request.all([vuelo, cliente])
    .then(
        (res)=>{
            console.log("recibimos llamada del vuelo")
            console.log(res)
            console.log(res[0].data)
            console.log(res[1].data)
            reserva.vuelo = res[0].data
            reserva.cliente = res[1].data
        }
    )
    
    //console.log(reserva)
    reservas.push(reserva)
    //console.log(reservas)

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