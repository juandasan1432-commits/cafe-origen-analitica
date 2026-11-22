const {ventas} = require("./datos")
const functionesAnalitica = require("./analitica")

//resumen general
console.log(" RESUMEN GENERAL ")
console.log(" Total vendido: $",functionesAnalitica.totalVendidoM(ventas).toLocaleString("es-CO"))
console.log(" Total unidades vendidas:",functionesAnalitica.unidadesVendidasM(ventas));
console.log(" ");

//ventasPorCiudad
console.log(" VENTAS POR CIUDAD")
console.table(functionesAnalitica.valoresCiudadFormateado(ventas))
console.log(" ")

//unidadesPorProducto
console.log(" UNIDADES POR PRODUCTO");
console.table(functionesAnalitica.unidadesPorProducto(ventas))
console.log(" ")

//topProductosPorValor
console.log(" TOP 3 PRODUCTOS POR VALOR ");
console.table(functionesAnalitica.valoresProductosFormateados(ventas, 3))
console.log("");


//ventasDelDia
console.log(" VENTAS DEL DIA ");
const ventaDia = functionesAnalitica.ventasDelDia(ventas,"2026-09-03")
console.log(ventaDia);
console.log(" Total vendido en esta fecha fue:", functionesAnalitica.totalVendidoM(ventaDia));
console.log(" Total de unidades vendidas en esta fecha fue:", functionesAnalitica.unidadesVendidasM(ventaDia));
console.log(" ");

console.log(" DIA SIN VENTAS ");
const diaSinVenta = functionesAnalitica.ventasDelDia(ventas,"2026-09-10")
console.log(diaSinVenta);
console.log(" Total vendido en esta fecha fue:", functionesAnalitica.totalVendidoM(diaSinVenta));
console.log(" Total de unidades vendidas en esta fecha fue:", functionesAnalitica.unidadesVendidasM(diaSinVenta));
console.log(" ");

//  Errores reportados
//ERROR 1, Bogota aparecia dos veces
const ciudadesPruebas = {
    Bogotá : 10000,
    BOGOTÁ : 20000
}
console.log(" ERRORES REPORTADOS")
console.log(ciudadesPruebas)

const ciudadesNormalizadas = {
    [functionesAnalitica.normalizar(" Bogota ")]: 10000
}
ciudadesNormalizadas[functionesAnalitica.normalizar(" BoGOTA")] += 20000
console.log("");
console.log(" SOLUCION ERROR 1");
console.log(ciudadesNormalizadas);
console.log(" ")

//ERROR 2, DIA SIN VENTAS TICKETPROMEDIO IGUAL A NaN
const totalDia = 0
const cantidadVentas = 0
const promedio = totalDia/cantidadVentas
console.log(" ERROR 2");
console.log(promedio);
console.log(" ");


//SOLUCION ERROR 2
console.log("SOLUCION ERROR 2");
const Promedio = functionesAnalitica.ventasDelDia(ventas, "2026-09-10")
console.log(functionesAnalitica.ticketPromedio(Promedio));



