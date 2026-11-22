# Café Origen Analítica

## Descripción

Café Origen Analítica es un proyecto realizado con JavaScript y Node.js para analizar las ventas de una cafetería.

El proyecto tiene 12 registros de ventas guardados en un arreglo de objetos. Con estos datos podemos calcular las ventas totales, las unidades vendidas y conocer cuáles productos generan más dinero.

## Tecnologías utilizadas

- JavaScript
- Node.js
- Git y GitHub
- Visual Studio Code

## Estructura del proyecto

```text
cafe-origen-analitica/
│
├── src/
│   ├── datos.js
│   ├── analitica.js
│   ├── explorar.js
│   ├── verificar.js
│   └── reporte.js
│
├── README.md
└── bitacora.md
```

### Descripción de los archivos

- `datos.js`: contiene las 12 ventas.
- `analitica.js`: contiene las funciones para calcular los resultados.
- `explorar.js`: sirve para revisar los datos y hacer pruebas.
- `verificar.js`: compara las funciones con ciclos y con métodos.
- `reporte.js`: muestra los resultados en la consola.
- `bitacora.md`: contiene las explicaciones y pruebas realizadas.

## Cómo ejecutar el proyecto

Primero debemos tener Node.js instalado y abrir el proyecto en VS Code.

Desde la terminal, en la carpeta principal del proyecto, ejecutamos:

```bash
node src/reporte.js
```

Para ejecutar las verificaciones:

```bash
node src/verificar.js
```

## ¿Qué preguntas responde?

- ¿Cuánto dinero se vendió en total?
- ¿Cuántas unidades se vendieron?
- ¿Cuánto se vendió por ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Cuáles son los tres productos que más dinero generaron?
- ¿Cuáles fueron las ventas de un día específico?

## Resultados

Al ejecutar el proyecto con los 12 registros de ventas, obtuvimos los siguientes resultados:

- **Total vendido:** $985.000.
- **Unidades vendidas:** 21 unidades en total.
- **Ciudades registradas:** Medellín, Bogotá, Cali y Pereira.
- **Productos diferentes:** 5 productos, sin contar los nombres repetidos.

### Ventas por ciudad

| Ciudad | Total vendido |
|---|---:|
| Medellín | $356.000 |
| Bogotá | $276.000 |
| Cali | $185.000 |
| Pereira | $168.000 |

### Top 3 de productos por valor

| Producto | Valor generado |
|---|---:|
| Origen Huila 500 g | $294.000 |
| Origen Sierra 500 g | $225.000 |
| Prensa francesa | $190.000 |

También realizamos pruebas con fechas específicas. Por ejemplo, el 3 de septiembre de 2026 se vendieron $187.000 y 5 unidades.

Cuando consultamos un día sin ventas, el programa muestra valores en cero. Además, comprobamos que la normalización evita ciudades duplicadas y que el ticket promedio no devuelve `NaN`.

## Versión

v0.1 - Café Origen Analítica