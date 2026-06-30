import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// Importamos el componente Estudiante que se utilizará para mostrar cada registro de la lista
import { Estudiante } from '../components/Estudiante';

export default function FlatListScreen() {
    const estudiantes = [
        {
            id: "1",
            nombre: "Cintia",
            carrera: "ISC"
        },
        {
            id: "2",
            nombre: "Ailin",
            carrera: "ISC"
        },
        {
            id: "3",
            nombre: "Cin",
            carrera: "ISC"
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> Lista de Estudiantes :D </Text>

            <FlatList
                // Indica a FlatList cuál será el arreglo de datos que se mostrará
                data={estudiantes}
                // Recorre cada elemento del arreglo y lo envía al componente Estudiante
                renderItem={({ item }) => (
                    <Estudiante
                        nombre={item.nombre}
                        carrera={item.carrera}
                    />
                )}
                // Asigna una clave única a cada elemento para mejorar el rendimiento de la lista
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 15,
    },

    card: {
        backgroundColor: '#d4f1f4',
        padding: 15,
        margin: 10,
        borderRadius: 10
    }

});