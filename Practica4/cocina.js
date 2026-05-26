// cocina.js
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Importamos el gestor de pedidos (Caja)
const Caja = require('./caja');

// Arreglo estático de productos
let productos = [
    { id: 1, nombre: "Cafe", precio: 85, categoria: "bebidas", promocion: "ninguna" }, 
    { id: 2, nombre: "Pan", precio: 40, categoria: "postres", promocion: "ninguna" },      
    { id: 3, nombre: "Leche", precio: 25, categoria: "bebidas", promocion: "ninguna" },
    { id: 4, nombre: "Pastel", precio: 120, categoria: "postres", promocion: "ninguna" }
];

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
function listarProductos() {
    console.log("\n INVENTARIO DE COCINA");
    console.table(productos); 
}

// PROCESAR PEDIDO CON PROMESAS
function procesarPedido(pedido, modo) {
    return new Promise((resolve, reject) => {
        console.log(`\nProcesando pedido #${pedido.id}...`);

        setTimeout(() => {
            // 1. PREPARAR CAFÉ (Éxito)
            if (modo === "exito") {
                pedido.estado = "Listo";
                resolve(`Pedido #${pedido.id} completado. El pedido fue preparado correctamente.`);
            } 
            // 2. ERROR EN COCINA (Rechazo)
            else if (modo === "error") {
                pedido.estado = "Pedido cancelado";
                reject(`Pedido #${pedido.id} cancelado. Ocurrió un error en la cocina.`);
            } 
            // 3. FALTA INGREDIENTE (Rechazo)
            else {
                pedido.estado = "Pedido cancelado";
                reject(`Pedido #${pedido.id} cancelado. No hay ingredientes suficientes (Falta ingrediente).`);
            }
        }, 2000);
    });
}

// MOSTRAR PEDIDOS (Consumiendo desde Caja)
function listarPedidos() {
    console.log("\n LISTA DE PEDIDOS HISTÓRICOS Y ACTUALES");
    const listaPedidos = Caja.obtenerPedidos();

    if (!listaPedidos || listaPedidos.length === 0) {
        console.log("No existen pedidos registrados.");
        return;
    }

    let tablaPedidos = listaPedidos.map(p => {
        let nombresProductos = p.productos.map(id => {
            let prod = productos.find(pr => pr.id === id);
            return prod ? prod.nombre : `ID huérfano (${id})`;
        }).join(", ");

        return {
            id: p.id,
            cliente: p.cliente,
            productos: nombresProductos || "Ninguno",
            estado: p.estado
        };
    });

    console.table(tablaPedidos);
}

// MENÚ DE BÚSQUEDA Y FILTRADO
function menuBuscar() {
    console.log("\n MENÚ DE BÚSQUEDA Y FILTRADO");
    console.log("1. Buscar Productos Baratos (< $50) [filter]");
    console.log("2. Buscar Producto Más Caro [find]");
    console.log("3. Buscar Bebidas [filter]");
    console.log("4. Buscar Postres [filter]");
    console.log("5. Volver al menú principal");

    readline.question("\nSelecciona una opción de búsqueda: ", function(subOpcion) {
        switch (subOpcion) {
            case "1":
                console.table(productos.filter(p => p.precio < 50));
                break;
            case "2":
                let precioMaximo = Math.max(...productos.map(p => p.precio));
                console.table([productos.find(p => p.precio === precioMaximo)]);
                break;
            case "3":
                console.table(productos.filter(p => p.categoria === "bebidas"));
                break;
            case "4":
                console.table(productos.filter(p => p.categoria === "postres"));
                break;
            case "5":
                menu();
                return; 
            default:
                console.log("\nOpción no válida.");
        }
        menuBuscar();
    });
}

// FUNCIÓN PRINCIPAL DEL MENÚ
function menu() {
    listarProductos();
    
    console.log("Selecciona una opción:");
    console.log("1. Agregar producto");
    console.log("2. Editar producto");
    console.log("3. Eliminar producto");
    console.log("4. Buscar o Filtrar productos");
    console.log("5. Registrar Pedido (Caja)");
    console.log("6. Ver Pedidos");
    console.log("7. Procesar Pedido (Cocina)");
    console.log("8. Salir");
    
    readline.question("\nOpción: ", function(opcion) {

        // 1. AGREGAR PRODUCTO
        if (opcion === "1") {
            readline.question("Nombre del producto: ", function(nombre) {
                readline.question("Precio del producto: ", function(precio) {
                    readline.question("Categoría (bebidas/postres): ", function(categoria) {
                        productos.push({
                            id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
                            nombre: nombre,
                            precio: Number(precio),
                            categoria: categoria.toLowerCase() || "general",
                            promocion: "ninguna"
                        });
                        console.log(`\n¡"${nombre}" agregado con éxito!`);
                        menu(); 
                    });
                });
            });
        } 
        // 2. EDITAR PRODUCTO
        else if (opcion === "2") {
            readline.question("ID del producto a editar: ", function(id) {
                let idx = productos.findIndex(p => p.id === Number(id)); 
                if (idx !== -1) {
                    readline.question(`Nuevo nombre (${productos[idx].nombre}): `, function(nuevoNombre) {
                        readline.question(`Nuevo precio (${productos[idx].precio}): `, function(nuevoPrecio) {
                            if (nuevoNombre) productos[idx].nombre = nuevoNombre;
                            if (nuevoPrecio) productos[idx].precio = Number(nuevoPrecio);
                            console.log("\n¡Producto editado con éxito!");
                            menu();
                        });
                    });
                } else {
                    console.log("\nID no encontrado.");
                    menu();
                }
            });
        } 
        // 3. ELIMINAR PRODUCTO
        else if (opcion === "3") {
            readline.question("ID del producto a eliminar: ", function(id) {
                let idx = productos.findIndex(p => p.id === Number(id)); 
                if (idx !== -1) {
                    productos.splice(idx, 1);
                    console.log("\nProducto eliminado con éxito.");
                } else {
                    console.log("\nID no encontrado.");
                }
                menu(); 
            });
        } 
        // 4. MENÚ BUSCAR
        else if (opcion === "4") {
            menuBuscar();
        } 
        // 5. REGISTRAR PEDIDO
        else if (opcion === "5") {
            readline.question("Nombre del cliente: ", function (cliente) {
                console.log("\nProductos disponibles:");
                productos.forEach(p => console.log(`${p.id}. ${p.nombre}`));

                readline.question("Ingresa IDs (separados por coma): ", function (ids) {
                    let lista = ids.split(",").map(id => Number(id.trim())).filter(id => !isNaN(id) && id !== 0);
                    Caja.registrarPedido(cliente, lista);
                    console.log("\nPedido enviado a la Caja correctamente.");
                    menu();
                });
            });
        } 
        // 6. VER PEDIDOS
        else if (opcion === "6") {
            listarPedidos();
            menu();
        } 
        // 7. PROCESAR PEDIDO 
        else if (opcion === "7") {
            listarPedidos();
            if (Caja.obtenerPedidos().length === 0) return menu();

            readline.question("\nID del pedido a procesar: ", function(idPedido) {
                let pedido = Caja.buscarPedido(idPedido);

                if (!pedido) {
                    console.log("\nPedido no encontrado.");
                    return menu();
                }

                console.log("\nSimular resultado de Cocina (Imagen):");
                console.log("1. Preparar café");
                console.log("2. Error en cocina");
                console.log("3. Falta ingrediente");

                readline.question("\nOpción: ", function(opcionResultado) {
                    let modo = "exito";
                    if (opcionResultado === "2") modo = "error";
                    if (opcionResultado === "3") modo = "ingrediente";

                    procesarPedido(pedido, modo)
                        .then(resultado => console.log("\n" + resultado))
                        .catch(error => console.log("\n" + error))
                        .finally(() => {
                            console.log("\nProceso terminado.");
                            menu();
                        });
                });
            });
        } 
        // 8. SALIR
        else if (opcion === "8") {
            console.log("\n¡Hasta luego!");
            readline.close(); 
        } else {
            console.log("\nOpción no válida.");
            menu(); 
        }
    });
}
menu();