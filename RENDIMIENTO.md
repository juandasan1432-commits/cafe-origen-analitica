# Café Origen — Informe de rendimiento v0.2

En este informe explico cómo se comportan las funciones del motor cuando aumenta la cantidad de ventas. Utilicé las pruebas de los MiniRetos 5, 6 y 7 para comparar las visitas, las comparaciones y la memoria que necesita cada función.

Para leer las tablas: **n** es la cantidad de ventas, **m** son las ventas que pasan un filtro, **c** son las ciudades diferentes y **p** son los productos diferentes. En nuestras pruebas el generador utiliza cuatro ciudades y cinco productos. Cuando hablo de memoria, me refiero a la **memoria adicional**, sin contar el arreglo de ventas recibido.

## 1. Clasificación de funciones

| Función | ¿Qué hace? | Tiempo | Espacio | Justificación | Evidencia con 10.000 ventas |
|---|---|---|---|---|---|
| `valorVenta()` | Calcula el valor de una venta. | O(1) | O(1) | Multiplica cantidad por precio, sin ciclos ni arreglos nuevos. | Una multiplicación por llamada. |
| `totalVendido()` | Suma el dinero de todas las ventas. | O(n) | O(1) | Recorre las ventas una vez y guarda el total en un acumulador. | 10.000 visitas registradas en la versión instrumentada. |
| `unidadesVendidas()` | Suma las unidades vendidas. | O(n) | O(1) | Recorre las ventas una vez y utiliza un acumulador. | 10.000 iteraciones esperadas según el ciclo. |
| `ventaMayor()` | Encuentra la venta de mayor valor. | O(n) | O(1) | Compara las ventas en un recorrido y guarda una referencia a la mayor. | 10.000 visitas y 10.000 comparaciones instrumentadas. |
| `ticketPromedio()` | Calcula el promedio de compras válidas. | O(n) | O(1) | Recorre las ventas y usa un total y un contador; excluye cantidades iguales a cero. | 10.000 visitas esperadas según el ciclo. |
| `ventasPorCiudad()` | Suma las ventas de una ciudad. | O(n) | O(1) | Revisa la ciudad de cada venta y acumula las coincidencias. | 10.000 visitas esperadas; el cálculo por ciudad instrumentado también recorre las 10.000 ventas. |
| `normalizar()` | Ajusta un texto para poder compararlo. | O(1)* | O(1)* | Trabaja con un texto, no con todas las ventas. | Una llamada procesa un texto; dentro de un ciclo de 10.000 ventas se llamaría 10.000 veces. |
| `totalVendidoM()` | Calcula el total usando `reduce()`. | O(n) | O(1) | `reduce()` procesa las ventas y mantiene un acumulador numérico. | 10.000 llamadas esperadas al acumulador. |
| `unidadesVendidasM()` | Suma unidades usando `reduce()`. | O(n) | O(1) | Procesa cada venta una vez sin crear arreglos intermedios. | 10.000 llamadas esperadas al acumulador. |
| `ventasPorCiudadM()` | Filtra ventas de una ciudad. | O(n) | O(n) | `filter()` recorre las ventas y crea un arreglo con las coincidencias. | 10.000 revisiones; hasta 10.000 elementos en el nuevo arreglo. |
| `ventasDelDia()` | Busca ventas de una fecha. | O(n) | O(n) | `filter()` revisa todos los registros y devuelve otro arreglo. | 10.000 revisiones; hasta 10.000 resultados si todos coinciden. |
| `primeraVenta()` | Consulta la primera venta. | O(1) | O(1) | Accede a `ventas[0]` sin recorrer el arreglo. | Una visita registrada en el MiniReto 5. |
| `totalPorCiudad()` | Agrupa el dinero por ciudad. | O(n) | O(1)** | Recorre las ventas y suma en un objeto de cuatro ciudades posibles. | 10.000 visitas esperadas; hasta cuatro propiedades en el objeto. |
| `unidadesPorProducto()` | Agrupa unidades por producto. | O(n) | O(1)** | Recorre las ventas y suma cantidades en un objeto de cinco productos posibles. | 10.000 visitas esperadas; hasta cinco propiedades. |
| `topProductosPorValor()` | Ordena productos por dinero vendido y devuelve un ranking. | O(n)** | O(1)** | Agrupa las ventas con `reduce()` y luego ordena los cinco productos del catálogo. | 10.000 ventas procesadas; hasta cinco productos para ordenar y tres resultados si pido top 3. |
| `totalCiudadCadena()` | Suma las ventas de una ciudad usando métodos encadenados. | O(n) | O(n) | Usa `map()`, `filter()`, otro `map()` y `reduce()`; crea tres arreglos intermedios. | `2n + 2m` elementos procesados; máximo 40.000 cuando las 10.000 ventas coinciden. |
| `totalCiudadUnaPasada()` | Suma las ventas de una ciudad en un solo ciclo. | O(n) | O(1) | Recorre las ventas una vez y usa un acumulador, sin arreglos intermedios. | 10.000 visitas esperadas; dio el mismo total que la versión encadenada. |
| `clientesRecurrentes()` | Identifica clientes que aparecen más de una vez. | O(n²) en comparaciones*** | O(n) | Compara cada venta con las siguientes mediante dos ciclos y guarda los clientes repetidos en un arreglo. | 49.995.000 comparaciones calculadas para 10.000 ventas. |

\* En `normalizar()` supongo textos de longitud limitada. Si la longitud del texto puede crecer, el costo depende de sus caracteres.

\** Con el catálogo y las ciudades **fijas** de Café Origen. Si pueden aumentar, `totalPorCiudad()` usa O(c), `unidadesPorProducto()` O(p) y `topProductosPorValor()` O(p) en memoria. El ranking tendría tiempo general O(n + p log p) por el ordenamiento. Como c y p pueden llegar a n, la memoria puede llegar a O(n).

\*** Los dos ciclos realizan O(n²) comparaciones. `includes()` también busca dentro del arreglo de recurrentes y puede agregar más trabajo; por eso O(n²) describe las comparaciones entre ventas, no necesariamente el peor costo total de toda la implementación.

### Evidencias de las pruebas

**MiniReto 5 — Recorridos.** Ejecuté las funciones instrumentadas con diferentes cantidades de ventas. Con 10.000 ventas, `totalVendido()` registró 10.000 visitas, `ventaMayor()` registró 10.000 visitas y 10.000 comparaciones, y el cálculo por ciudad instrumentado también registró 10.000 visitas y 10.000 comparaciones. `primeraVenta()` solo necesitó una visita. Esto me permitió comprobar la diferencia entre O(n) y O(1).

**MiniReto 6 — Clientes recurrentes.** Medí cómo crecían las comparaciones y el tiempo. Con 1.000 ventas fueron 499.500 comparaciones; con 2.000 fueron 1.999.000; con 4.000 fueron 7.998.000; con 8.000 fueron 31.996.000 y con 16.000 fueron 127.992.000. Con 100.000 ventas medí **41,867 segundos**. Al duplicar las ventas, las comparaciones aumentaron aproximadamente cuatro veces.

**MiniReto 7 — Uso de memoria.** Probé `totalCiudadCadena()` y `totalCiudadUnaPasada()` con las mismas 10.000 ventas generadas. Ambas devolvieron **493.948.000** en esa ejecución. La primera crea tres arreglos y la segunda usa un solo recorrido sin esos arreglos. Por eso elegí `totalCiudadUnaPasada()` cuando quiero ahorrar memoria.

Los conteos marcados como **esperados o calculados** se obtienen del código y no son tiempos medidos. No los presento como si fueran una prueba de cronómetro.

## 2. Proyección a 1.000.000 de ventas

Para las funciones O(n), pasar de 10.000 a 1.000.000 de ventas significa multiplicar el trabajo por **100**. Esto sirve para estimar visitas u operaciones, pero no permite inventar segundos si no medí el tiempo de esa función.

| Reporte o función | Referencia con 10.000 ventas | Proyección con 1.000.000 | Qué significa |
|---|---|---|---|
| `totalVendido()`, `unidadesVendidas()`, `ventaMayor()`, `ticketPromedio()` | 10.000 visitas por recorrido | 1.000.000 de visitas | Crecimiento lineal O(n). |
| `ventasPorCiudad()`, `totalPorCiudad()`, `unidadesPorProducto()` | 10.000 visitas por recorrido | 1.000.000 de visitas | Recorren cada venta una vez. |
| `totalVendidoM()`, `unidadesVendidasM()`, `ventasPorCiudadM()`, `ventasDelDia()` | 10.000 elementos revisados por recorrido | 1.000.000 de elementos revisados por recorrido | Crecimiento lineal; algunas crean arreglos nuevos. |
| `totalCiudadUnaPasada()` | 10.000 visitas | 1.000.000 de visitas | Un recorrido y memoria adicional constante. |
| `totalCiudadCadena()` | Hasta 40.000 elementos procesados | Hasta 4.000.000 de elementos procesados | Cuatro recorridos en el caso de que todas las ventas coincidan; sigue siendo O(n). |
| `topProductosPorValor()` | 10.000 ventas y hasta cinco productos para ordenar | 1.000.000 de ventas y hasta cinco productos para ordenar | Con catálogo fijo, el trabajo que crece es recorrer las ventas. |
| `primeraVenta()`, `valorVenta()` y una llamada a `normalizar()` | Una operación o trabajo de tamaño fijo por llamada | El mismo trabajo por llamada | O(1) respecto a las ventas. |
| `clientesRecurrentes()` | 49.995.000 comparaciones calculadas | 499.999.500.000 comparaciones calculadas | El número de comparaciones crece de forma cuadrática. |

### Proyección de tiempo para `clientesRecurrentes()`

En el MiniReto 6 medí **41,867 segundos con 100.000 ventas**. Para llegar a 1.000.000 de ventas, multiplico los registros por 10. Como las comparaciones crecen aproximadamente con el cuadrado, proyecto 100 veces más trabajo.

**Cálculo:** 41,867 × 100 = **4.186,7 segundos**, aproximadamente **69,78 minutos (1 hora y 10 minutos)**.

Esta es una **estimación**, no una ejecución real con 1.000.000 de ventas. El tiempo puede cambiar por el costo de `includes()` y por las condiciones del equipo. Para las demás funciones no tengo tiempos medidos suficientes para dar una proyección en segundos sin inventar resultados; por eso presento sus operaciones estimadas.

## 3. Riesgos

Ordené las funciones según cuánto crece su trabajo y cuánta memoria adicional necesitan cuando aumentan las ventas.

| Prioridad | Funciones | ¿Por qué? |
|---|---|---|
| **1. Alto** | `clientesRecurrentes()` | Los dos ciclos generan muchísimas comparaciones y `includes()` puede sumar más búsquedas. Fue la función que más se demoró en las pruebas. |
| **2. Medio** | `totalCiudadCadena()`, `ventasDelDia()`, `ventasPorCiudadM()` | Aunque son O(n) en tiempo, crean arreglos adicionales que pueden ocupar O(n) de memoria. |
| **3. Bajo** | `totalVendido()`, `unidadesVendidas()`, `ventaMayor()`, `ticketPromedio()`, `ventasPorCiudad()`, versiones con `reduce()`, `totalCiudadUnaPasada()` y funciones de agrupación | En nuestro caso recorren las ventas una vez y usan poca memoria. Las agrupaciones dependen de mantener fijos los productos y ciudades. |
| **4. Mínimo** | `valorVenta()`, `primeraVenta()`, `normalizar()` | Su trabajo por llamada no depende de la cantidad de ventas, suponiendo textos de longitud limitada. |

**Conclusión:** Decidí que lo primero que debo optimizar es `clientesRecurrentes()`, porque sus comparaciones aumentan mucho más rápido que las ventas.

## 4. Plan de optimización

**Función que debo optimizar:** `clientesRecurrentes()`.

**Problema identificado:** La función utiliza dos ciclos anidados para comparar los clientes de las ventas. Esto provoca que se repitan muchas comparaciones y que el tiempo aumente rápidamente cuando crece la cantidad de registros.

**Idea de mejora:** En lugar de comparar cada venta con las siguientes, puedo recorrer todas las ventas una sola vez y guardar los clientes que ya encontré. Si un cliente aparece nuevamente, puedo identificarlo como recurrente sin tener que volver a revisar las ventas anteriores.

**Información que necesito guardar:** Los identificadores de los clientes que ya aparecieron y cuáles se identificaron como recurrentes.

**Resultado esperado:** Reducir las comparaciones y conseguir una solución más eficiente, idealmente O(n) en tiempo, utilizando estructuras de búsqueda rápida como `Set`.

Esta mejora queda propuesta para el MiniReto 9; todavía no la implemento.

## 5. Revisión de un compañero

Esta sección se completa cuando un compañero revise el informe. Debo escribir su observación real y cómo la respondí en la bitácora, sin inventar una revisión.

- **Observación recibida:** Por completar después de la revisión.
- **Mi respuesta:** Por completar después de la revisión.

## 6. Cómo comprobar las pruebas

Las funciones principales están en `src/analitica.js`, las versiones instrumentadas en `src/instrumentadas.js` y el generador en `src/generador.js`.

Desde la raíz del repositorio puedo ejecutar las mediciones del MiniReto 5 con:

```bash
node src/medir.js
```

Ese archivo contiene las pruebas con diferentes cantidades de ventas y muestra los contadores de visitas y comparaciones. Para revisar los resultados de los MiniRetos 6 y 7, puedo consultar sus funciones en `src/analitica.js` y las evidencias documentadas en `bitacora.md`. No incluyo un comando adicional para esas pruebas porque no he confirmado un archivo ejecutable específico para ellas.
