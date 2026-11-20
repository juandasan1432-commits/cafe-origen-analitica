# Bitácora - Café Origen analítica

## Diccionario de datos

El array ventas contiene 12 objetos y cada objeto tiene 7 propiedades.

- id:
  Tipo: Number
  Significado: Número que identifica cada venta.

- fecha:
  Tipo: String
  Significado: Fecha en la que se realizó la venta.

- cliente:
  Tipo: String
  Significado: Código que identifica al cliente.

- producto:
  Tipo: String
  Significado: Nombre del producto vendido.

- ciudad:
  Tipo: String
  Significado: Ciudad donde se registró la venta.

- cantidad:
  Tipo: Number
  Significado: Cantidad de unidades vendidas.

- precio:
  Tipo: Number
  Significado: Precio por unidad del producto.

## Observaciones

- Number: son valores numéricos sin comillas.
- String: son valores de texto entre comillas.
- fecha es String porque está guardada como texto.
- (index) no es una propiedad, es la posición de cada objeto en el array. La posición empieza en 0, por eso ventas[0] es la venta con id 1.

## Casos borde detectados

### 1. Clientes repetidos

- Problema: C01 aparece 3 veces, y C02 y C03 aparecen 2 veces cada uno.
- Decisión: se permiten varias compras por cliente. El ticket promedio se calcula por compra (por registro), no por cliente, así que no se agrupa por la propiedad cliente.

### 2. Cantidad igual a cero

- Problema: la venta con id 8 tiene cantidad 0.
- Decisión: no se cuenta como venta válida. Su valor es 0, así que no cambia el total vendido ni las unidades, pero no entra al conteo del ticket promedio. Si se contara, el promedio se dividiría entre 12 en vez de 11 y saldría más bajo por una compra que no ocurrió.

### 3. Ciudades escritas diferente

- Problema: la venta con id 5 tiene la ciudad "medellín " (minúscula y con un espacio al final), mientras las demás dicen "Medellín".
- Decisión: antes de comparar se normalizan las dos ciudades (la que llega por parámetro y la de cada venta) con la función normalizar. Los datos originales de datos.js no se modifican.

## Plan en pseudocódigo

### valorVenta

- Recibe: una venta (un objeto)
- Devuelve: cantidad multiplicada por precio
- Ciclo: ninguno
- Si la cantidad es 0: devuelve 0

### totalVendido

- Recorro: cada venta del arreglo
- Condición: ninguna (las ventas con cantidad 0 aportan 0)
- Acumulo: el valorVenta de cada venta
- Inicio en: 0
- Si el arreglo está vacío: devuelve 0

### unidadesVendidas

- Recorro: cada venta del arreglo
- Condición: ninguna (las ventas con cantidad 0 suman 0 unidades)
- Acumulo: la cantidad de cada venta (no el valor)
- Inicio en: 0
- Si el arreglo está vacío: devuelve 0

### ventaMayor

- Recorro: cada venta del arreglo
- Condición: todavía no hay venta guardada, o el valorVenta de la venta actual es mayor que el de la venta guardada
- Guardo: el registro completo de la venta (no solo su valor)
- Inicio en: null (no hay ninguna venta vista)
- Si hay dos ventas con el mismo valor: se queda la primera, porque la comparación es "mayor que" y no "mayor o igual"
- Si el arreglo está vacío: devuelve null

### ticketPromedio

- Recorro: cada venta del arreglo
- Condición: la cantidad es mayor que 0 (venta válida)
- Acumulo: el valorVenta de cada venta válida
- Cuento: cuántas ventas válidas hay
- Inicio en: total en 0 y contador en 0
- Después del ciclo: si el contador es 0, devuelve 0 y no divide
- Al final: total dividido entre contador

### normalizar

- Recibe: un texto
- Devuelve: el mismo texto sin espacios en los extremos, en minúsculas y sin tildes
- Pasos: trim() quita los espacios de los extremos, toLowerCase() pasa a minúsculas, normalize("NFD") separa cada letra de su tilde, y replace() borra las marcas de tilde
- Efecto secundario: la ñ queda como n

### ventasPorCiudad

- Recibe: el arreglo de ventas y una ciudad
- Recorro: cada venta del arreglo
- Condición: la ciudad recibida y la ciudad de la venta son iguales después de aplicar normalizar a las dos
- Acumulo: el valorVenta de cada venta que cumple
- Inicio en: 0
- Si el arreglo está vacío o ninguna venta coincide: devuelve 0
- Observación: como normalizar también quita tildes, "Medellin" sin tilde sí coincide con "Medellín"

## Decisiones con arreglo vacío

- totalVendido([]): devuelve 0. El ciclo no da vueltas y se queda el valor inicial del acumulador.
- unidadesVendidas([]): devuelve 0, por la misma razón.
- ventaMayor([]): devuelve null. No existe ninguna venta que devolver y un 0 parecería una venta.
- ticketPromedio([]): devuelve 0. No hay ventas válidas y dividir 0 entre 0 daría NaN. Este 0 no significa que un cliente gastó 0, significa que no hay compras que promediar.
- ventasPorCiudad([], ciudad): devuelve 0. No hay ventas que sumar.
- valorVenta: recibe una sola venta, no un arreglo, así que el caso del arreglo vacío no aplica. Se prueba con una venta normal y con la venta de cantidad 0.

## Pruebas con tres entradas

Entradas usadas:

- Arreglo completo: ventas
- Un solo elemento: [ventas[5]], que es la venta con id 6 (Bogotá, cantidad 2, precio 26000, valor 52000)
- Arreglo vacío: []

### Resultados

| Función | Arreglo completo | Un solo elemento | Arreglo vacío |
|---|---|---|---|
| totalVendido | 985000 | 52000 | 0 |
| unidadesVendidas | 21 | 2 | 0 |
| ventaMayor | venta con id 10 | venta con id 6 | null |
| ticketPromedio | 89545.45 | 52000 | 0 |

### valorVenta (recibe una venta)

| Llamada | Resultado |
|---|---|
| valorVenta(ventas[0]) | 84000 |
| valorVenta(ventas[7]) | 0 |

### ventasPorCiudad (recibe arreglo y ciudad)

| Llamada | Resultado |
|---|---|
| ventasPorCiudad(ventas, "Medellín") | 356000 |
| ventasPorCiudad([ventas[5]], "Bogotá") | 52000 |
| ventasPorCiudad([], "Medellín") | 0 |
| ventasPorCiudad(ventas, "  BOGOTÁ ") | 276000 |
| ventasPorCiudad(ventas, "Barranquilla") | 0 |
| ventasPorCiudad(ventas, "Medellin") | 356000 |

### Casos adicionales de ticketPromedio

| Llamada | Resultado | Qué comprueba |
|---|---|---|
| ticketPromedio([ventas[7]]) | 0 | Solo hay una venta y tiene cantidad 0, no hay ventas válidas |
| ticketPromedio([ventas[7], ventas[8]]) | 90000 | La venta con cantidad 0 llega primero y aun así se calcula la válida |

### Qué se observó

- Con el arreglo vacío el ciclo no da ninguna vuelta, por eso las funciones que acumulan devuelven el 0 con el que empiezan.
- ventaMayor devuelve null con el arreglo vacío porque guarda una venta completa, y no hay ninguna.
- ticketPromedio necesita comprobar el contador después del ciclo y antes de dividir. Si se comprobara dentro del ciclo, una venta con cantidad 0 al inicio cortaría la función antes de revisar las válidas.
- Con un solo elemento, ventaMayor devuelve esa misma venta y los promedios dan el valor de esa venta.

## Verificación a mano (trazas)

### Traza 1: totalVendido(ventas)

Valor inicial: total = 0. No hay condición, todas las ventas se suman.

| Vuelta | id | cantidad | precio | valorVenta | total |
|---|---|---|---|---|---|
| inicio | | | | | 0 |
| 1 | 1 | 2 | 42000 | 84000 | 84000 |
| 2 | 2 | 1 | 26000 | 26000 | 110000 |
| 3 | 3 | 1 | 95000 | 95000 | 205000 |
| 4 | 4 | 1 | 42000 | 42000 | 247000 |
| 5 | 5 | 3 | 45000 | 135000 | 382000 |
| 6 | 6 | 2 | 26000 | 52000 | 434000 |
| 7 | 7 | 1 | 120000 | 120000 | 554000 |
| 8 | 8 | 0 | 42000 | 0 | 554000 |
| 9 | 9 | 2 | 45000 | 90000 | 644000 |
| 10 | 10 | 4 | 42000 | 168000 | 812000 |
| 11 | 11 | 1 | 95000 | 95000 | 907000 |
| 12 | 12 | 3 | 26000 | 78000 | 985000 |

La venta con id 8 tiene cantidad 0, así que su valor es 0 y el total no cambia en esa vuelta.

Resultado de la traza: 985000.

Resultado del programa: 985000. Coincide con la traza.

### Traza 2: ventasPorCiudad(ventas, "Medellín")

La ciudad recibida, normalizada, queda "medellin". Valor inicial: totalciudad = 0.

| Vuelta | id | ciudad original | ciudad normalizada | ¿Igual a "medellin"? | valorVenta sumado | totalciudad |
|---|---|---|---|---|---|---|
| inicio | | | | | | 0 |
| 1 | 1 | "Medellín" | "medellin" | Sí | 84000 | 84000 |
| 2 | 2 | "Bogotá" | "bogota" | No | | 84000 |
| 3 | 3 | "Cali" | "cali" | No | | 84000 |
| 4 | 4 | "Medellín" | "medellin" | Sí | 42000 | 126000 |
| 5 | 5 | "medellín " | "medellin" | Sí | 135000 | 261000 |
| 6 | 6 | "Bogotá" | "bogota" | No | | 261000 |
| 7 | 7 | "Bogotá" | "bogota" | No | | 261000 |
| 8 | 8 | "Cali" | "cali" | No | | 261000 |
| 9 | 9 | "Cali" | "cali" | No | | 261000 |
| 10 | 10 | "Pereira" | "pereira" | No | | 261000 |
| 11 | 11 | "Medellín" | "medellin" | Sí | 95000 | 356000 |
| 12 | 12 | "Bogotá" | "bogota" | No | | 356000 |

Resultado de la traza: 356000. La venta con id 5 ("medellín ") sí se suma gracias a la normalización.

Resultado del programa: 356000. Coincide con la traza.