# Bitácora — Café Origen

## MiniReto 1 — Datos de ventas

### Diccionario de datos

El arreglo `ventas` contiene **12 objetos**, cada uno con **7 propiedades**:

| Propiedad | Tipo | Significado |
|---|---|---|
| `id` | Number | Identificador de la venta. |
| `fecha` | String | Fecha de la venta. |
| `cliente` | String | Código del cliente. |
| `producto` | String | Nombre del producto. |
| `ciudad` | String | Ciudad donde se registró la venta. |
| `cantidad` | Number | Unidades vendidas. |
| `precio` | Number | Precio por unidad. |

**Observaciones:** `Number` es numérico; `String`, texto (incluida `fecha`). `(index)` es la posición en el arreglo, no una propiedad: comienza en 0, así que `ventas[0]` tiene id 1.

### Casos borde y decisiones

1. **Clientes repetidos:** C01 aparece 3 veces; C02 y C03, 2 veces cada uno. Permito varias compras por cliente y calculo el ticket promedio por **venta**, no por cliente.
2. **Cantidad cero:** la venta con id 8 tiene cantidad 0. No aporta dinero ni unidades y la excluyo del ticket promedio; así divido entre 11 ventas válidas en vez de 12.
3. **Ciudades con formatos distintos:** la venta con id 5 tiene `"medellín "`, mientras otras tienen `"Medellín"`. Normalizo ambas ciudades antes de comparar, sin modificar `datos.js`.

---

## MiniReto 2 — Cálculos y pruebas

### Funciones y casos especiales

| Función | Qué hago | Caso especial |
|---|---|---|
| `valorVenta(venta)` | Multiplico `cantidad * precio` sin usar ciclos. | Si la cantidad es 0, devuelve 0. |
| `totalVendido(ventas)` | Recorro las ventas y acumulo `valorVenta` desde 0. | Arreglo vacío: 0. |
| `unidadesVendidas(ventas)` | Recorro las ventas y sumo `cantidad` desde 0. | Arreglo vacío: 0. |
| `ventaMayor(ventas)` | Comparo `valorVenta` y guardo el **objeto completo** de la venta mayor. Inicio sin venta (`null`). | Arreglo vacío: `null`. En empate conservo la primera. |
| `ticketPromedio(ventas)` | Sumo el valor de ventas con `cantidad > 0` y lo divido entre el número de ventas válidas. | Sin ventas válidas: 0, para evitar `NaN`. |
| `normalizar(texto)` | Aplico `trim()`, `toLowerCase()`, `normalize("NFD")` y `replace()` para quitar espacios, mayúsculas y tildes. | La `ñ` también queda como `n`. |
| `ventasPorCiudad(ventas, ciudad)` | Comparo ambas ciudades normalizadas y sumo los valores que coinciden desde 0. | Sin coincidencias o arreglo vacío: 0. `"Medellin"` coincide con `"Medellín"`. |

**Con arreglos vacíos:** los acumuladores quedan en 0, `ventaMayor` devuelve `null` y `ticketPromedio` comprueba el contador antes de dividir. `valorVenta` recibe un objeto, no un arreglo.

### Pruebas con tres entradas

Utilicé el arreglo completo, una sola venta (`ventas[5]`: id 6, Bogotá, 2 unidades a $26.000) y el arreglo vacío.

| Función | 12 ventas | 1 venta | Arreglo vacío |
|---|---:|---:|---|
| `totalVendido` | 985000 | 52000 | 0 |
| `unidadesVendidas` | 21 | 2 | 0 |
| `ventaMayor` | Venta id 10 | Venta id 6 | `null` |
| `ticketPromedio` | 89545.45 | 52000 | 0 |

**Pruebas adicionales:**

- `valorVenta(ventas[0])` → 84000; `valorVenta(ventas[7])` → 0.
- `ventasPorCiudad(ventas, "Medellín")` → 356000; con `[ventas[5]]` y `"Bogotá"` → 52000; con `[]` o `"Barranquilla"` → 0.
- `ventasPorCiudad(ventas, "  BOGOTÁ ")` → 276000 y con `"Medellin"` → 356000: la normalización funciona.
- `ticketPromedio([ventas[7]])` → 0; `ticketPromedio([ventas[7], ventas[8]])` → 90000. Una venta inválida al comienzo no interrumpe el cálculo.

### Trazas manuales

**Traza 1 — `totalVendido(ventas)`**. Inicio con `total = 0`; sumo todas las ventas, incluida la de cantidad cero.

| Vuelta | id | Cantidad | Precio | Valor de venta | Total acumulado |
|---|---:|---:|---:|---:|---:|
| Inicio | — | — | — | — | 0 |
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

**Resultado:** 985000, igual al programa. En la venta 8 el total no cambia.

**Traza 2 — `ventasPorCiudad(ventas, "Medellín")`**. Normalizo la ciudad a `"medellin"` y comienzo en 0.

| Vuelta | id | Ciudad original | ¿Coincide? | Valor sumado | Total ciudad |
|---|---:|---|---|---:|---:|
| Inicio | — | — | — | — | 0 |
| 1 | 1 | Medellín | Sí | 84000 | 84000 |
| 2 | 2 | Bogotá | No | 0 | 84000 |
| 3 | 3 | Cali | No | 0 | 84000 |
| 4 | 4 | Medellín | Sí | 42000 | 126000 |
| 5 | 5 | `medellín ` | Sí | 135000 | 261000 |
| 6 | 6 | Bogotá | No | 0 | 261000 |
| 7 | 7 | Bogotá | No | 0 | 261000 |
| 8 | 8 | Cali | No | 0 | 261000 |
| 9 | 9 | Cali | No | 0 | 261000 |
| 10 | 10 | Pereira | No | 0 | 261000 |
| 11 | 11 | Medellín | Sí | 95000 | 356000 |
| 12 | 12 | Bogotá | No | 0 | 356000 |

**Resultado:** 356000, igual al programa. La venta 5 se incluye gracias a la normalización.

---

## MiniReto 3 — Métodos y agrupaciones

### Funciones con métodos

- **`totalVendidoM`:** uso `reduce()` para acumular `valorVenta(venta)` desde 0, sin filtrar ni agrupar. **Resultado:** 985000.
- **`unidadesVendidasM`:** uso `reduce()` para sumar `cantidad`, incluyendo las ventas de cantidad cero. **Resultado:** 21 unidades.
- **`ventasPorCiudadM`:** uso `filter()` para seleccionar la ciudad normalizada y `reduce()` para sumar sus ventas. **Medellín:** 356000.

En `verificar.js` comparé las versiones originales y las versiones con métodos usando los mismos datos y parámetros. Las tres comparaciones (`totalVendido`, `unidadesVendidas` y `ventasPorCiudad`) dieron **OK** con `===`.

### Resultados por ciudad y producto

**`totalPorCiudad`:** recorro todas las ventas con `reduce()`, normalizo la ciudad y acumulo dinero en un objeto `{}`. Si una clave no existe, la inicio en 0; si existe, sigo sumando.

| Ciudad | Total vendido |
|---|---:|
| medellin | 356000 |
| bogota | 276000 |
| cali | 185000 |
| pereira | 168000 |
| **Total** | **985000** |

Obtengo cuatro ciudades sin duplicados por diferencias de escritura.

**`unidadesPorProducto`:** uso `reduce()` y un objeto para agrupar las cantidades por nombre de producto normalizado. Cada clave empieza en 0 y acumula unidades.

| Producto | Unidades |
|---|---:|
| origen huila 500 g | 7 |
| origen narino 250 g | 6 |
| prensa francesa | 2 |
| origen sierra 500 g | 5 |
| molino manual | 1 |
| **Total** | **21** |

**`topProductosPorValor(ventas, 3)`:** agrupo el dinero por producto con `reduce()`, convierto el objeto en arreglo con `Object.entries()`, ordeno de mayor a menor mediante `sort((a, b) => b[1] - a[1])` y selecciono los primeros `k` con `slice(0, k)`.

| Puesto | Producto | Valor generado |
|---|---|---:|
| 1 | origen huila 500 g | 294000 |
| 2 | origen sierra 500 g | 225000 |
| 3 | prensa francesa | 190000 |

### Orden de las ventas

Copié `ventas` con `[...ventas]` y comparé los ID antes y después del ranking mediante `map()`: se conservó el orden **1, 2, 3, ..., 12**. `sort()` modificó el arreglo creado por `Object.entries()`, no las ventas originales; `slice()` también devuelve otro arreglo.

---

## MiniReto 4 — Errores y soluciones

### Ciudades duplicadas

- **Síntoma:** Bogotá aparecía dos veces en el reporte.
- **Prueba:** creé un objeto con `"Bogotá": 10000` y `"BOGOTÁ": 20000`; JavaScript las guardó como claves diferentes.
- **Causa:** los nombres de propiedades distinguen mayúsculas, minúsculas y espacios.
- **Corrección:** normalicé las ciudades antes de agruparlas. Los valores quedaron en una sola clave:

```js
// Sin normalizar
{ 'Bogotá': 10000, 'BOGOTÁ': 20000 }
// Normalizado
{ bogota: 30000 }
```

### Promedio con `NaN`

- **Síntoma:** el promedio devolvía `NaN` al consultar un día sin ventas, por ejemplo `"2026-09-10"`.
- **Prueba y causa:** creé dos variables con valor 0 y comprobé que `0 / 0` da `NaN`.
- **Corrección:** verifico que el contador de ventas válidas sea distinto de 0 antes de dividir. `ticketPromedio([])` devuelve **0**.

**Resultado:** reproduje ambos errores y comprobé las correcciones.

---

## MiniReto 5 — Medición de algoritmos

### Generador de ventas

Creé `generarVentas(n)` para producir la cantidad de ventas indicada. Utilicé `Math.random()` y `Math.floor()` para seleccionar productos, ciudades, cantidades y clientes; `Date` para generar fechas aleatorias de 2026; un ciclo `for` para crear registros; `push()` para guardarlos y `return` para devolver el arreglo.

### Contadores y funciones

Creé `totalVendidoInstrumentado`, `ventaMayorInstrumentalizada` y `totalVentasPorCiudadInstrumentalizada`. A cada una le pasé un contador con `visitas` y `comparaciones`. Aprendí que puedo modificar las propiedades de ese objeto dentro de la función sin devolver el contador con `return`. Probé las tres funciones con las 12 ventas originales y sus resultados fueron correctos.

También creé `primeraVenta(ventas, contador)`, que obtiene directamente `ventas[0]` y registra una visita, sin recorrer el arreglo.

### Pruebas y resultados

Antes de probar 100, 1.000, 10.000 y 100.000 ventas, predije cuántas operaciones registraría cada función. Después creé un **orquestador** para ejecutar las pruebas y mostré las operaciones con `console.table()`.

| Ventas | Total vendido | Venta mayor | Total por ciudad | Primera venta |
|---|---:|---:|---:|---:|
| 100 | 100 | 200 | 200 | 1 |
| 1.000 | 1.000 | 2.000 | 2.000 | 1 |
| 10.000 | 10.000 | 20.000 | 20.000 | 1 |
| 100.000 | 100.000 | 200.000 | 200.000 | 1 |

Los valores representan **visitas + comparaciones registradas**. Las mediciones coincidieron con mis predicciones.

### Conclusiones

- **`totalVendido` — O(n):** recorro todas las ventas para sumar sus valores.
- **`ventaMayor` — O(n):** reviso todas las ventas para encontrar la mayor.
- **`totalPorCiudad` — O(n):** recorro todas las ventas para acumular por ciudad.
- **`primeraVenta` — O(1):** accedo directamente a `ventas[0]`, así que registro una visita sin importar el tamaño del arreglo.

Comprendí que **O(n)** crece de forma lineal: 10 veces más ventas implican 10 veces más operaciones registradas. Dos operaciones por venta, o usar un acumulador, no significan **O(n²)**; el crecimiento cuadrático aparece, por ejemplo, con recorridos anidados sobre todos los elementos.

Aprendí a generar datos, medir operaciones y distinguir **O(1)** de **O(n)**.

---

---

## MiniReto 6 — Clientes recurrentes

### Prueba con las 12 ventas

Agregué la función original `clientesRecurrentes(ventas)` a `analitica.js` y la probé desde `verificar.js`. Obtuve **`["C01", "C02", "C03"]`**, como pedía el reto. El primer `for` selecciona una venta (`i`) y el segundo (`j = i + 1`) la compara con las posteriores. Si el cliente se repite y aún no está en `recurrentes`, lo agrego con `push()`.

### Traza con 5 ventas

Usé este arreglo de prueba: **`[C01, C02, C01, C03, C02]`**. Seguí las comparaciones entre `ventas[i].cliente` y `ventas[j].cliente`:

| `i` | `j` | Clientes comparados | ¿Iguales? |
|---:|---:|---|---|
| 0 | 1 | C01 / C02 | No |
| 0 | 2 | C01 / C01 | Sí: guardo C01 |
| 0 | 3 | C01 / C03 | No |
| 0 | 4 | C01 / C02 | No |
| 1 | 2 | C02 / C01 | No |
| 1 | 3 | C02 / C03 | No |
| 1 | 4 | C02 / C02 | Sí: guardo C02 |
| 2 | 3 | C01 / C03 | No |
| 2 | 4 | C01 / C02 | No |
| 3 | 4 | C03 / C02 | No |

**Resultado:** `['C01', 'C02']`. Conté **10 comparaciones**: 4 cuando `i = 0`, luego 3, 2, 1 y 0. `i` solo avanza cuando termina el ciclo de `j`.

### Comparaciones para cualquier cantidad de ventas

Generalicé el patrón con la fórmula **`n × (n - 1) / 2`**, donde `n` es el número de ventas. Comprobé que con **5 ventas hay 10** comparaciones, con **6 hay 15** y con **10 hay 45**. La fórmula cuenta las comparaciones entre dos ventas, **sin incluir el trabajo interno de `includes()`**.

### Medición de tiempos

Usé el generador del MiniReto 5 y rodeé únicamente la ejecución de `clientesRecurrentes()` con `console.time()` y `console.timeEnd()`, usando la misma etiqueta. Las ventas se generaron antes de iniciar el cronómetro.

| Ventas | Comparaciones calculadas | Tiempo medido | Aumento del tiempo |
|---:|---:|---:|---:|
| 1.000 | 499.500 | 1,701 ms | — |
| 2.000 | 1.999.000 | 5,149 ms | ×3,03 |
| 4.000 | 7.998.000 | 15,188 ms | ×2,95 |
| 8.000 | 31.996.000 | 79,484 ms | ×5,23 |
| 16.000 | 127.992.000 | 440,296 ms | ×5,54 |
| 100.000 | 4.999.950.000 | 41,867 s | — |

**Análisis:** al duplicar las ventas, las comparaciones crecen aproximadamente **4 veces**. Los tiempos no aumentaron exactamente por cuatro porque dependen de la ejecución y del costo de otras operaciones. Los ciclos anidados tienen complejidad **O(n²)**: al pasar de 1.000 a 16.000 ventas, los datos crecieron 16 veces, pero las comparaciones casi 256 veces.

### Estimaciones para más ventas

Usé las mediciones reales y un **modelo aproximado O(n²)** para estimar tiempos antes de ejecutar entradas más grandes.

- **100.000 ventas:** partí de 16.000 ventas y **440,296 ms**. Como `100.000 / 16.000 = 6,25`, calculé `440,296 × 6,25² ≈ 17.199 ms`, es decir, **17,2 segundos**. Como la estimación era menor de dos minutos, ejecuté la prueba: el tiempo real fue **41,867 segundos**.
- **1.000.000 de ventas:** partí de los **41,867 segundos reales** de 100.000 ventas. Como el tamaño se multiplica por 10, estimé `41,867 × 10² = 4.186,7 segundos`, aproximadamente **69,8 minutos (1 hora y 10 minutos)**. No ejecuté esta cantidad.

La estimación es orientativa: el tiempo real puede cambiar y el modelo cuadrático no incluye por completo el costo adicional de `includes()`.

### Costo oculto de `includes()` y peor caso

Descubrí que **`recurrentes.includes(cliente)` también recorre un arreglo**: en el peor caso revisa todos los clientes guardados, por lo que su búsqueda es **O(r)**, donde `r` es la cantidad de clientes en `recurrentes`. Gracias al operador `&&`, solo se ejecuta cuando las dos ventas comparadas pertenecen al mismo cliente.

Aunque las comparaciones de los dos `for` son **O(n²)**, si `includes()` debe buscar en un arreglo grande muchas veces, el **peor caso de la función completa puede llegar a O(n³)**. Por eso, contar únicamente las comparaciones entre ventas no refleja todo el trabajo del reporte.

### Conclusión para la gerente

Comprobé que el reporte tarda mucho más cuando aumenta la cantidad de ventas, porque compara cada registro con muchos otros y además revisa si ya guardó a los clientes repetidos. Al pasar de **1.000 a 100.000 ventas**, las comparaciones aumentaron aproximadamente **10.010 veces**, y con 100.000 ventas el reporte tardó casi **42 segundos**.

Como solución, propongo evitar comparar todas las ventas entre sí. Podemos recorrerlas una sola vez y utilizar conjuntos `Set` para recordar los clientes vistos e identificar a los que compraron más de una vez; esto permitiría un crecimiento **O(n) en promedio** y haría el reporte más rápido.
