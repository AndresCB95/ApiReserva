let reservas = require("./reservas.json")


const reservasGet = () =>{

    return reservas

}

const reservasSet = (reserva) =>{
    reservas.push(reserva)
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