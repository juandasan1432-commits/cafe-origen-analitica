    const {ventas} = require("./datos")
    const {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, normalizar} = require("./analitica")
    console.log (ventas)
    console.log (ventas[0])
    console.log (ventas[ventas.length -1])
    console.log (ventas[4].producto)
    console.table (ventas)
    //console.log("-------------- Valor venta ---------------");
    
    /*console.log (valorVenta(ventas[0]))
    console.log("-------------- total vendido---------------");
    console.log(totalVendido(ventas));
    console.log("-------------- total unidades vendidas---------------");
    console.log(unidadesVendidas(ventas));
    console.log(unidadesVendidas([]));
    console.log("-------------- Venta Mayor ---------------");
    console.log(ventaMayor(ventas));
    console.log("-------------- ticketPromedio ---------------");
    console.log(ticketPromedio(ventas));
    console.log("-------------- el total de ventas en una ciudad ---------------");
    console.log(ventasPorCiudad(ventas,"MEdellin"));*/

    //Entradas para la funcion totalVendido
    console.log("----------- Total vendido -------------");
    console.log(" ");
    console.log("----------- Arreglo completo -----");
    console.log(totalVendido(ventas))
    console.log("----------- el arreglo de un solo elemento -----");
    console.log(totalVendido([ventas[5]]))
    console.log("----------- arreglo vacio  -----");
    console.log(totalVendido([]))

    //Entradas para la funcion unidadesVendidas
    console.log("----------- UnidadesVendidas ------");
    console.log(" ");
    console.log("----------- Arreglo completo ------");
    console.log(unidadesVendidas(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(unidadesVendidas([ventas[5]]))
    console.log("----------- arreglo vacio ------");
    console.log(unidadesVendidas([]))

    //Entradas para la funcion ventaMayor
    console.log("----------- VentaMayor ------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(ventaMayor(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(ventaMayor([ventas[5]]))
    console.log("----------- arreglo vacio ------");
    console.log(ventaMayor([]))

    //Entradas para la funcion ticketPromedio 
     console.log("----------- ticketPromedio ------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(ticketPromedio(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(ticketPromedio([ventas[5]]))
    console.log("----------- arreglo vacio  ------");
    console.log(ticketPromedio([]))

      //Entradas para la funcion VentasPorCiudad 
     console.log("----------- VentasPorCiudad------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(ventasPorCiudad(ventas,"medeLlin"))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(ventasPorCiudad([ventas[5]],"BogotA"))
    console.log("----------- arreglo vacio  ------");
    console.log(ventasPorCiudad([],"medelliN"))



    
    



