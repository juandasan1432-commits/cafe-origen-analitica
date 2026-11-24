const {ventas} = require("./datos")
const funcionesAnalitica = require("./analitica")
const generador = require("./generador")

//creo la funcion fabrica (molde -- referencia de como se van a crear todos mis contadores)
const crearContador = () => ({
    visitas :0,
    comparaciones : 0
})

//mi arreglo de cantidad ventas el cual define cuantas ventas se crean
 const cantidadVentas = [100,1000,10000,100000]

 //funcion orquestador coordina la ejecucion de otras funciones
 function orquestador (cantidadVentas){

    //retorna el arreglo que me entregue el map acorde a la funcion entregada
   return cantidadVentas.map((n) => {

        //creo una constante para guardar las ventas generadas segun (n), n me la entrega el map en cada vuelta, n es como cada posicion donde este el map (actual)
        const ventasGeneradas = generador.generarVentas(n)

        //creo los contadores llamando una funcion fabrica, es parecido a un constructor pero sin new
        const contadorTotal = crearContador()
        const contadorMayor = crearContador()
        const contadorCiudad = crearContador()
        const contadorVenta1 = crearContador()

        //guardo en totalVentas el resultado de la funcion totalVendido, el resultado es solo el return (total) y el otro plus es que por cada vuelta me aumenta mi contador
       const totalVentas =  funcionesAnalitica.totalVendidoInstrumentado(ventasGeneradas, contadorTotal)

       //guardo en mayorVenta el resultado de la funcion ventaMayor, el resultado es solo el return (valor) y su posicion que seria como todo la venta ( todo el objeto)
       // el otro plus es que por cada vuelta me sube +1 el contador de visitas y si tiene una comparacion cualquiera tambien sube +1 el de comparaciones
       const mayorVenta = funcionesAnalitica.ventaMayorInstrumentalizada(ventasGeneradas, contadorMayor)

       //guardo en totalCiudad el resultado de la funcion totalVentasPorCiudad, el resultado es solo el return (totales) que es un objeto con todas las ciudades y sus ventas totales
       // el otro plus es que por cada vuelta me sube +1 el contador de visitas y si tiene una comparacion cualquiera tambien sube +1 el de comparaciones
       const totalCiudad = funcionesAnalitica.totalVentasPorCiudadInstrumentalizada(ventasGeneradas, contadorCiudad)

       //guardo en primaVen el resultado de la funcion primeraVenta, el resultado es solo el return (primera, o sea la venta numero 1) y como solo necesita dar una vuelta el contador solo aumenta a 1
       const primeraVen = funcionesAnalitica.primeraVenta(ventasGeneradas, contadorVenta1)

       //me retorna, actual : n, que es como la cantidad de ventas que esta haciendo (posicion actual)
       //adentro del objeto (padre) que me retorna tiene objetos anidados (hijos)
        return {
           actual: n,

           totalVendido :{
           total: totalVentas,
           operaciones:contadorTotal
           },

           ventaMayor : {
            total: mayorVenta,
            operaciones : contadorMayor
           },

           totalPorCiudad:{
            total:totalCiudad,
            operaciones: contadorCiudad
           },

           primeraVenta:{
            total:primeraVen,
            operaciones:contadorVenta1
           }
        }
        
    })
 }

const resultados = orquestador(cantidadVentas);
 
 
    // creo una constante filas donde guardo un nuevo arreglo con los resultados de las pruebas
    // utilizo map para recorrer cada prueba y extraer solamente la informacion que necesito
    const filas = resultados.map((prueba) => {

        // retorno un objeto por cada prueba con la cantidad de ventas y las operaciones de cada funcion
        return {

            // guardo la cantidad de ventas que se generaron en esta prueba
            ventas: prueba.actual,

            // accedo al contador de totalVendido y sumo las visitas mas las comparaciones
            totalVendido: prueba.totalVendido.operaciones.visitas
                + prueba.totalVendido.operaciones.comparaciones,

            // accedo al contador de ventaMayor y sumo las visitas mas las comparaciones
            ventaMayor: prueba.ventaMayor.operaciones.visitas
                + prueba.ventaMayor.operaciones.comparaciones,

            // accedo al contador de totalPorCiudad y sumo las visitas mas las comparaciones
            totalPorCiudad: prueba.totalPorCiudad.operaciones.visitas
                + prueba.totalPorCiudad.operaciones.comparaciones,

            // accedo al contador de primeraVenta y sumo las visitas mas las comparaciones
            // esta funcion es O(1) porque solo accedo a la primera posicion del arreglo
            primeraVenta: prueba.primeraVenta.operaciones.visitas
                + prueba.primeraVenta.operaciones.comparaciones
        };
    });

    // imprimo el arreglo filas en forma de tabla para comparar las operaciones de cada funcion
    console.table(filas);

