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

- Number: Son valores numéricos sin comillas.
- String: Son valores de texto entre comillas.
- fecha es String porque está guardada como texto.
- (index) no es una propiedad, es la posición de cada objeto en el array.


## Decisiones sobre los casos borde

1. Clientes repetidos:
   Decisión: Permitir varias compras por cliente,
   pero contar cada cliente una sola vez cuando
   se calculen los clientes únicos.

2. Cantidad igual a cero:
   Decisión: Revisar si fue un error o una venta
   cancelada. No contar las unidades vendidas
   cuando la cantidad sea 0.

3. Ciudades escritas diferente:
   Decisión: normalizar los nombres de las ciudades
   para evitar que una misma ciudad se cuente
   como si fueran dos diferentes.