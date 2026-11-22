//const {ventas} = require ("./datos")

const { ventas } = require("./datos");


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
    let costosa = 0
    let Posicion = null

    for (const venta of ventas){
        if (costosa === 0 || valorVenta(venta) > (costosa)){
            costosa = valorVenta(venta)
            Posicion = venta
        }
    }
    return {costosa,Posicion}
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

//calcular con metodos totalVendidoM
function totalVendidoM (ventas){
    return ventas.reduce((acumulador, actual) => {
        return acumulador += valorVenta(actual)
     }, 0 )
}

//unidadesVendidasM
function unidadesVendidasM (ventas){
    return ventas.reduce((acumulador, actual) => {
       return acumulador += actual.cantidad
    }, 0)
}

//ventasPorCiudadM
function ventasPorCiudadM (ventas,ciudad){
    return ventas
    .filter((venta) => normalizar(venta.ciudad) === normalizar(ciudad))
    .reduce((acumulador,actual) => acumulador += valorVenta(actual), 0)
}

//totalVentasPorCiudad
function totalPorCiudad (ventas){
    
    const totales = ventas.reduce((acumulador,venta) => {
        const ciudades = normalizar(venta.ciudad)
        if( acumulador[ciudades] === undefined){
            acumulador[ciudades] = 0
        }
        acumulador[ciudades] += valorVenta(venta)
        return acumulador 
    }, {})
    return totales
}

//unidadesPorProducto
function unidadesPorProducto (ventas){
    let totalUnidades = 0;

    const UnidadesProducto = ventas.reduce((acumulador,venta) => {
        const producto = normalizar(venta.producto)

        if(acumulador[producto] === undefined){
            acumulador[producto] = 0
        }

        acumulador[producto] += venta.cantidad
        totalUnidades += venta.cantidad

        return acumulador
    }, {})

    return {
        totalUnidades, totalUnidades
    }
}

//topProductosPorValor
function topProductosPorValor (ventas, k){
    const valorProductos = ventas.reduce((acumulador,venta) => {
        const producto = normalizar(venta.producto)
        if(acumulador[producto] === undefined){
            acumulador[producto] = 0;
        }
        acumulador[producto] += valorVenta(venta)
        return acumulador
    }, {})

    const ordenarProductos = Object.entries((valorProductos))
    ordenarProductos.sort((a,b) => {
        return b[1] - a[1]
    })
   const productosOrdenados = ordenarProductos.slice(0,k)
    return productosOrdenados
    
}

module.exports = {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, normalizar,totalVendidoM, unidadesVendidasM, ventasPorCiudadM, totalPorCiudad, unidadesPorProducto, topProductosPorValor}