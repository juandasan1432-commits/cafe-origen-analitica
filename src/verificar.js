const {ventas} = require("./datos")
const funcionesAnalitica = require("./analitica")
const generador = require("./generador")

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
//console.log(funcionesAnalitica.clientesRecurrentes(ventas))

//console.log("medellin:", funcionesAnalitica.totalCiudadCadena(ventas, "medellin"))

const generaVentas = generador.generarVentas(10000)
console.log ("El total para medellin es:", funcionesAnalitica.totalCiudadCadena(generaVentas, "medellin"))
console.log("El total para medellin es:", funcionesAnalitica.totalCiudadUnaPasada(generaVentas, "medellin"));

