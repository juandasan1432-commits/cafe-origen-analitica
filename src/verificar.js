const {ventas} = require("./datos")
const funcionesAnalitica = require("./analitica")

if(funcionesAnalitica.totalVendido(ventas) === funcionesAnalitica.totalVendidoM(ventas)){
    console.log("OK") }
    else {
        console.log("diferente")
    }

if(funcionesAnalitica.unidadesVendidas(ventas) === funcionesAnalitica.unidadesVendidasM(ventas)){
    console.log("OK") }
    else {
        console.log("diferente")
    }

if(funcionesAnalitica.ventasPorCiudad(ventas, "medellIN") === funcionesAnalitica.ventasPorCiudadM(ventas, "medellIN")){
    console.log("OK") }
    else {
        console.log("diferente")
    }


//console.log(funcionesAnalitica.ventaMayor(ventas))

console.log(funcionesAnalitica.clientesRecurrentes(ventas))

