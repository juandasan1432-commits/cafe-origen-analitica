const {ventas} = require("./datos")

//total vendido instrumentalizada
function totalVendidoInstrumentalizado (ventas,contador){
    let total = 0;
    for( const venta of ventas) {
        //cada vez que de una vuelta suma uno al contador
        contador.visitas++
        total += venta.cantidad * venta.precio
    }
    return total    
}

//const resultado = totalVendidoInstrumentado(ventas,contador)
//console.log(resultado, contador)

//La venta mayor pero instrumentalizada
function ventaMayorInstrumentalizada (ventas, contador){
    let valor = 0;
    let posicion = null

    for(const venta of ventas){
        contador.visitas++

        if(valor === 0 || valorVenta(venta) > (valor)){
            valor = valorVenta(venta)
            posicion = venta
        }
        contador.comparaciones++
    }
    return {valor,posicion}

}
//const resultado = ventaMayorInstrumentalizada(ventas,contador)
//console.log(resultado,contador);

//totalVentasPorCiudadInstrumentalizada
function totalVentasPorCiudadInstrumentalizada(ventas,contador){
    const totales = ventas.reduce((acumulador,venta) =>{
        const ciudades = normalizar(venta.ciudad)
        contador.visitas++
        if (acumulador[ciudades] === undefined){
            acumulador[ciudades] = 0
        }
        contador.comparaciones++
        acumulador[ciudades] += valorVenta(venta)
        return acumulador
    } 
    ,{})
    return totales
}
//const resultado = totalVentasPorCiudadInstrumentalizada(ventas,contador)
//console.log(resultado,contador);

module.exports = {totalVendidoInstrumentalizado, totalVentasPorCiudadInstrumentalizada, ventaMayorInstrumentalizada}