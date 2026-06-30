import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

export default function SectionListScreen() {

    const datos = [
        {
            title: 'Ingenieria en Sistemas',
            data: [
                { nombre: 'Ailin' },
                { nombre: 'Cin' }
            ]
        },
        {
            title: 'Administración',
            data: [
                { nombre: 'Cintia' },
                { nombre: 'Cin' }
            ]
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Estudiantes por carrera
            </Text>

            <SectionList
                // Recibe el arreglo de secciones que se mostrarán en la lista
                sections={datos}
                // Muestra el encabezado correspondiente a cada sección
                renderSectionHeader={({ section }) => (
                    <Text style={styles.header}>
                        {section.title}
                    </Text>
                )}
                // Recorre y muestra cada elemento perteneciente a la sección actual
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.nombre}
                    </Text>
                )}
            />
        </View>
    );
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#90caf9',
    padding: 10
  },
  item: {
    padding: 15
  }
});