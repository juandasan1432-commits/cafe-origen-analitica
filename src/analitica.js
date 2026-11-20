//const Ventas = require ("./datos")

//calcula el total de una venta (objeto)
function valorVenta (venta){
    return venta.cantidad * venta.precio

}

// calcula el total de todas la ventas
function totalVendido (ventas) {
    let total = 0;

    for (const venta of ventas) {
        total = total + valorVenta(venta)
    }

    return total
}

//calcula las unidades vendidas
function unidadesVendidas (ventas){
    let vendidas = 0;
     for (const venta of ventas){
        vendidas = vendidas + venta.cantidad
     }
     return vendidas
}

//calcula la venta mayor
function ventaMayor (ventas){
    let costosa = null

    for (const venta of ventas){
        if (costosa === null || valorVenta(venta) > valorVenta(costosa)){
            costosa = venta
        }
    }
    return costosa
}

//calcula el ticket promedio
function ticketPromedio(ventas){
    let totalVentas = 0;
    let ventasValidas = 0;

    for (const venta of ventas) {
        if(venta.cantidad > 0){
         totalVentas = totalVentas + valorVenta(venta)
         ventasValidas ++ 
        }
    }
    if (ventasValidas === 0 ){
        return 0
    }

    totalVentas = (totalVentas / ventasValidas)

    return totalVentas
}

//calcula el total de las ventasPorCiudad
function ventasPorCiudad (ventas, ciudad){
    // Venta total de la ciudad que es igual al parametro
    let totalciudad = 0;
    for (const venta of ventas) {

        //normalizo la ciudad que entregue como parametro y normalizo la ciudad del objeto que voy a sacar, solo si es igual.
        if(normalizar(ciudad) === normalizar(venta.ciudad)){

            totalciudad = totalciudad + valorVenta(venta)
        }
    }

    return totalciudad
}

//normalizo las palabras
function normalizar(palabra){

     //normalizo cualquier palabra, quito espacios sobrantes, las pongo en miniscula,pongo las tildes como caracter y despues borro todos los caracteres extraños
     return palabra.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}


module.exports = {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, normalizar}