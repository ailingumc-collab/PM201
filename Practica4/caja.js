// Arreglo estático inicial de pedidos
let pedidos = [
    { id: 1, cliente: "Cin", productos: [1, 2], estado: "Pendiente" },
    { id: 2, cliente: "Ailin", productos: [4], estado: "Pendiente" }
];

const Caja = {
    // Obtener todos los pedidos
    obtenerPedidos: () => pedidos,

    // Registrar un nuevo pedido en el arreglo
    registrarPedido: (cliente, listaProductos) => {
        let nuevoId = pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1;
        pedidos.push({
            id: nuevoId,
            cliente: cliente,
            productos: listaProductos,
            estado: "Pendiente"
        });
    },

    // Buscar un pedido por ID
    buscarPedido: (id) => pedidos.find(p => p.id === Number(id))
};

module.exports = Caja;