    const {ventas} = require("./datos")
    const FuncionesAnalitica = require("./analitica")
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
    console.log(FuncionesAnalitica.totalVendido(ventas))
    console.log("----------- el arreglo de un solo elemento -----");
    console.log(FuncionesAnalitica.totalVendido([ventas[5]]))
    console.log("----------- arreglo vacio  -----");
    console.log(FuncionesAnalitica.totalVendido([]))

    //Entradas para la funcion unidadesVendidas
    console.log("----------- UnidadesVendidas ------");
    console.log(" ");
    console.log("----------- Arreglo completo ------");
    console.log(FuncionesAnalitica.unidadesVendidas(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.unidadesVendidas([ventas[5]]))
    console.log("----------- arreglo vacio ------");
    console.log(FuncionesAnalitica.unidadesVendidas([]))

    //Entradas para la funcion ventaMayor
    console.log("----------- VentaMayor ------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(FuncionesAnalitica.ventaMayor(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.ventaMayor([ventas[5]]))
    console.log("----------- arreglo vacio ------");
    console.log(FuncionesAnalitica.ventaMayor([]))

    //Entradas para la funcion ticketPromedio 
     console.log("----------- ticketPromedio ------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(FuncionesAnalitica.ticketPromedio(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.ticketPromedio([ventas[5]]))
    console.log("----------- arreglo vacio  ------");
    console.log(FuncionesAnalitica.ticketPromedio([]))

      //Entradas para la funcion VentasPorCiudad 
     console.log("----------- VentasPorCiudad------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(FuncionesAnalitica.ventasPorCiudad(ventas,"medeLlin"))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.ventasPorCiudad([ventas[5]],"BogotA"))
    console.log("----------- arreglo vacio  ------");
    console.log(FuncionesAnalitica.ventasPorCiudad([],"medelliN"))

    //Funcion total vendido pero con metodos -> reduce
       console.log("----------- Total Vendido metodo------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(FuncionesAnalitica.totalVendidoM(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.totalVendidoM([ventas[5]]))
    console.log("----------- arreglo vacio  ------");
    console.log(FuncionesAnalitica.totalVendidoM([]))

    //funcion total unidades pero con metodos -> reduce
    console.log("----------- Total unidades vendidas------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(FuncionesAnalitica.unidadesVendidasM(ventas))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.unidadesVendidasM([ventas[5]]))
    console.log("----------- arreglo vacio  ------");
    console.log(FuncionesAnalitica.unidadesVendidasM([]))

     //funcion ventasPorCiudadM pero con metodos -> filter, reduce
    console.log("----------- Total ventasPorCiudad ------");
    console.log(" ");
    console.log("----------- Arreglo completo  ------");
    console.log(FuncionesAnalitica.ventasPorCiudadM(ventas, "Medellin"))
    console.log("----------- el arreglo de un solo elemento ------");
    console.log(FuncionesAnalitica.ventasPorCiudadM([ventas[5]], "bogota"))
    console.log("----------- arreglo vacio  ------");
    console.log(FuncionesAnalitica.ventasPorCiudadM([], "MedeLLin"))

    //funcion total ventas por ciudad
    console.log(FuncionesAnalitica.totalPorCiudad(ventas))

    //funcion unidadesTotalesPorProducto
    console.log(FuncionesAnalitica.unidadesPorProducto(ventas))

    //funcion topProductosPorValor

    const copiaVentas = [...ventas]
    const idsAntes = copiaVentas.map((venta) => venta.id)
    console.log(idsAntes);
    console.log("_----------------------------------_");
    console.log(FuncionesAnalitica.topProductosPorValor(ventas, 3))
    console.log("_---------------------------------_");
    const idsDespues = ventas.map((venta) => venta.id)
    console.log(idsDespues);
    








    



