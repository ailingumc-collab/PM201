// Arreglo de productos
let productos = [
    { id: 1, nombre: "Hamburguesa", precio: 85 },
    { id: 2, nombre: "Papas", precio: 40 },
    { id: 3, nombre: "Refresco", precio: 25 }
];

// Mostrar productos
function listarProductos() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {

        lista.innerHTML +=
            productos[i].id + " - " +
            productos[i].nombre + " - $" +
            productos[i].precio +
            "<br>";
    }
}

// Agregar producto
function agregarProducto() {
    let nombre = prompt("Nombre del producto");
    let precio = prompt("Precio del producto");
    productos.push({
        id: productos.length + 1,
        nombre: nombre,
        precio: precio
    });
    listarProductos();
}

// Editar producto
function editarProducto() {
    let id = prompt("ID del producto a editar");
    id = id - 1;
    let nuevoNombre = prompt("Nuevo nombre");
    let nuevoPrecio = prompt("Nuevo precio");
    productos[id].nombre = nuevoNombre;
    productos[id].precio = nuevoPrecio;

    listarProductos();
}

// Eliminar producto
function eliminarProducto() {
    let id = prompt("ID del producto a eliminar");
    id = id - 1;
    productos.splice(id, 1);
    listarProductos();
}

// Mostrar lista al iniciar
listarProductos();