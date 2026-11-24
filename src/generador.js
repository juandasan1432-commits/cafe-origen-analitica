function generarVentas (n){
    //donde se guardan todas las ventas
    const ventasGeneradas = []
    
    //de donde saca los datos informacion 
    const productos = [
        "Origen Huila 500 g", 
        "Origen Nariño 250 g",
        "Prensa francesa",
        "Origen Sierra 500 g",
        "Molino manual"
    ]
    const ciudades = [
        "Medellín",
        "Bogotá",
        "Cali",
        "Pereira"
    ]
    const precios = [
        42000,
        26000,
        95000,
        45000,
        120000
    ]
    //hasta aqui saca los datos

    const cantidadClientes = Math.max(1, Math.floor(n/3))

    for (let i = 0; i < n; i++) { 
        
        //posicion es igual a, un indice cualquiera entre el 0 y el total indices de [productos]
        const posicion = Math.floor(Math.random()*productos.length)

        //posicionCiudad es igual a, un indice cualquiera entre el 0 y el total indices de [ciudades]
        const posicionCiudad = Math.floor(Math.random()*ciudades.length)

        //unidadesAleatorias es igual a, un numero cualquiera entre el 1 y el 5
        const unidadesAleatorias = Math.floor(Math.random()*5)+1

        //clienteAleatorio es igual a, a un numero cualquiera entre 1 y cantidadClientes (n/3)
        const clienteAleatorio = Math.floor(Math.random()*cantidadClientes)+1

        //diaAleatorio
        const diaAleatorio = Math.floor(Math.random()*365)
        //fecha base, desde donde empieza hacia adelante, mes 0 por que asi esta en el constructor
        const fechaBase = new Date(2026, 0, 1)
        //cambiamos los dias de la fecha segun  la suma entra la base (1) y el numero aleatorio
        fechaBase.setDate(fechaBase.getDate() + diaAleatorio)
        //pasamos esa fecha a string, al pasarla tiene tambien la hora, se la quitamos con el slice, primeras diez posiciones
        const fechaTexto = fechaBase.toISOString().slice(0,10)

        //molde de objeto como se crearan todas las ventas
        const objetoVentas = {
            id : i+1,
            cliente : clienteAleatorio,
            fecha : fechaTexto,
            producto : productos[posicion],
            ciudad : ciudades[posicionCiudad],
            cantidad : unidadesAleatorias,
            precio : precios[posicion]
        }
        //agregamos cada objeto (venta), al final de nuestro arreglo ventasGeneradas
        ventasGeneradas.push(objetoVentas)
    }
    return ventasGeneradas
}
 module.exports = {generarVentas}
