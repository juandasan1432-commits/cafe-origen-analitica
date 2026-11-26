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

//total vendido instrumentalizada
function totalVendidoInstrumentado (ventas,contador){
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
    let valor = 0
    let posicion = null

    for (const venta of ventas){

        if (valor === 0 || valorVenta(venta) > (valor)){
            valor = valorVenta(venta)
            posicion = venta
        }
    }
    return {valor,posicion}
}

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


//unidadesPorProducto
function unidadesPorProducto (ventas){

    const UnidadesProducto = ventas.reduce((acumulador,venta) => {
        const producto = normalizar(venta.producto)

        if(acumulador[producto] === undefined){
            acumulador[producto] = 0
        }

        acumulador[producto] += venta.cantidad

        return acumulador
    }, {})

    return UnidadesProducto
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

    //se mostrara en pantalla el ranking de los productos que el cliente escoja
    //(ventas,3) se mostrara el top 3 de productos
   const productosOrdenados = ordenarProductos.slice(0,k)
    return productosOrdenados
    
}

//funcion para transformar los numeros de la tabla ventasPorCiudad en region colombia y separe con .
//y que me agrege una propiedad (clave) adelante de cada ciudad y cada valor
function valoresCiudadFormateado (ventas) {

    //guardo el objeto que me da totalPorCiudad con todas las ciudades y sus valores
    const objetoCiudades = totalPorCiudad(ventas)

    //el objeto con todas las ciudades, lo convierto en mini objetos clave par y valor con obj.entries -- con el .map paso posicion por posicion y creo un nuevo arreglo con la cualidades que pida mi funcion
    //mi funcion le doy el parametro actual
    const valorFormateado = Object.entries(objetoCiudades).map((actual) => {

        //retorna un objeto por cada vuelta con la propiedad ciudad para la posicion[0] de mis mini objetos.
        //y con la propiedad totalvendido para la posicion[1] de mis mini objetos y le agrega el locale para separar los numeros segun la region (colombia)
        return {ciudad : actual[0], totalvendido : actual[1].toLocaleString("es-CO")}})

        //fuera de la arrow function me retorna valorFormateado, a mi funcion grande valoresCiudadFormateado 
        return valorFormateado
    }

    //funcion para transformar los numeros de la tabla ventas topProductosPorValor en region colombia y separe con .
    //y que me agrege una propiedad (clave) adelante de cada producto y cada valor
    function valoresProductosFormateados(ventas,k){

        const objetoProductosValor = topProductosPorValor(ventas,k)

        const valorFormateado = objetoProductosValor.map((actual) => {
            return {productos : actual[0], totalvendido : actual[1].toLocaleString("es-CO")} })
            return valorFormateado
    }

    //VentasDelDia
    function ventasDelDia (ventas, fecha) {
       const fechasIguales = ventas.filter((actual) => {
            if(fecha === actual.fecha){
                return actual
            }
        })
        return fechasIguales
    }

    //primeraVenta funcion de complejidad costante
    function primeraVenta (ventas, contador){
    const primera = ventas[0]
    contador.visitas++
    return primera
    }

    //funcion que calcula los clientes recurrentes
    function clientesRecurrentes(ventas) {
    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (
                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)
            ) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

    return recurrentes;
}


//funcion totalCiudadCadena 
function totalCiudadCadena (ventas,ciudad){
    const ciudadBuscadaNorm = normalizar(ciudad)
    const ciudadesArreglo = ventas.map((venta) => {
        const ciudadesNormalizadas = normalizar(venta.ciudad)
        return {
            ...venta,
            ciudad : ciudadesNormalizadas
        }
    })
    const ciudadFiltrada = ciudadesArreglo.filter((venta) =>{
        return venta.ciudad === ciudadBuscadaNorm
    })
    
    const valorDeVenta = ciudadFiltrada.map((venta) => {
        return valorVenta(venta)
    })
    
    const totalVentas = valorDeVenta.reduce((acumulador,venta) =>{
        return acumulador += venta
    },0)
    return totalVentas
}
//console.log("medellin:", totalCiudadCadena(ventas,"medellin"));

//totalCiudadPorUnaPasada
function totalCiudadUnaPasada(ventas, ciudad){
    let acumulador = 0
    const ciudadNormalizada = normalizar(ciudad)
    for (const venta of ventas) {
        const ciudadNorm = normalizar(venta.ciudad)
        if(ciudadNorm === ciudadNormalizada){
            const ventaValor = valorVenta(venta)
            acumulador += ventaValor
        }
    }
    return acumulador

}
//console.log("medellin", totalCiudadUnaPasada(ventas,"medellin"));

 

module.exports = {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, normalizar,totalVendidoM, unidadesVendidasM, ventasPorCiudadM, totalPorCiudad, unidadesPorProducto, topProductosPorValor, valoresCiudadFormateado, valoresProductosFormateados, ventasDelDia, ventaMayorInstrumentalizada, totalVentasPorCiudadInstrumentalizada, totalVendidoInstrumentado,primeraVenta, clientesRecurrentes, totalCiudadCadena, totalCiudadUnaPasada}