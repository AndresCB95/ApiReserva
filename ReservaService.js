const getMongo = require("./mongodb.js")
let request = require("axios")

async function getConexiones() {
    const nameDb = "aerolineaG1y2"
    const client = await getMongo.getClientnExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}

const reservasGet = () =>{

    return reservas

}

const setEstadoReservaExport = (reservaPago) =>{

    for(let i = 0; i<reservas.length; i++){
        if(reservas[i].id === reservaPago.idreserva){
            reservas[i].estadoPago = reservaPago.estadoReserva
            i = reservas.length
        }
    }
    return "Reserva con pago confirmado"
}

const reservasSet = async (reserva) =>{
    const { collection, client } = await getConexiones()
    console.log("llama a reserva a guardar")
    const vuelo = request.get(
        "http://localhost:8081/vuelos/id/?id="+reserva.idvuelo
    )

    const cliente = request.get(
        "http://localhost:8082/clientes/id/?id="+reserva.idcliente
    )

    const reservaVuelo = request.patch(
        "http://localhost:8081/vuelos/sillas?id="+reserva.idvuelo,
        reserva.sillas
    )
    
    await request.all([vuelo,cliente,reservaVuelo])
    .then(
        (res)=>{
            console.log("recibimos llamada del vuelo")
            console.log(res[0].data)
            console.log(res[1].data)
            console.log(res[2].data)
            reserva.vuelo = res[0].data
            reserva.cliente = res[1].data
            reserva.mensaje = res[2].data
        }
    )
    .catch(
        (res)=>{
            console.log("Error")
        }
    )
    
    console.log(reserva)

    await collection.insertOne(reserva).then(
        (resultado)=>{
            console.log(resultado)
        }
    )

    await getMongo.closeClientExport(client)
    
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

const reservasPendientesIdget = (idcliente)=>{

    const reservasCliente= reservas.filter(
        (reser) =>{
        
            return reser.estadoPago === "Pendiente" && reser.idcliente === idcliente
        }
    )

    return reservasCliente

}

module.exports.reservasgetExport = reservasGet;
module.exports.reservasSetExport = reservasSet;
module.exports.reservasDeleteExport = reservasDelete;
module.exports.reservasPendientesIdgetExport = reservasPendientesIdget;