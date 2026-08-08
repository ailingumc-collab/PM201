import { SafeAreaView, View, Text, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DetalleUsuarioScreen() {

  const { nombre, edad, id } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);


  const eliminarUsuario = async () => {
    const usuarioId = Number(id);
    const username = "admin";
    const password = "1234";
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        `http://10.16.32.191:5000/v1/usuarios/${usuarioId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el usuario");
      }

      setModalVisible(false);
      Alert.alert("Usuario eliminado", "El usuario fue eliminado correctamente");
      router.replace('/consulta');

    } catch (error) {
      console.error("ERROR:", error);
      Alert.alert("Error", "No se pudo eliminar el usuario");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.botonRegresarContainer}>
          <Ionicons name="arrow-back" size={24} color="#0e213c" />
          <Text style={styles.botonRegresar}>Regresar</Text>
        </Pressable>
      </View>

      <Text style={styles.titulo}>Detalles del Usuario</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.dato}>{nombre || 'Sin nombre'}</Text>

        <View style={styles.linea} />

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.dato}>{edad ? `${edad} años` : ''}</Text>

        <View style={styles.linea} />

        <View style={styles.botones}>
          <Pressable
            style={styles.actualizar}
            onPress={() =>
              router.push({
                pathname: '/editar',
                params: { nombre, edad, id },
              })
            }
          >
            <Text style={styles.textBotonActualizar}>Actualizar</Text>
          </Pressable>

          <Pressable
            style={styles.eliminar}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textBotonEliminar}>Eliminar</Text>
          </Pressable>
        </View>
      </View>


      <Modal

        transparent={true}
        animationType="fade"
        
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalTexto}>
              ¿Estás seguro de que deseas eliminar al usuario {nombre}?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.cancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#374151', fontWeight: 'bold' }}>Cancelar</Text>
              </Pressable>

              <Pressable style={styles.confirmar} onPress={eliminarUsuario}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sí, eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',

    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  dato: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },
  botones: {
    alignItems: 'center',
    marginTop: 10,
  },
  actualizar: {
    backgroundColor: '#FACC15',
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  eliminar: {
    backgroundColor: '#DC2626',
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textBotonActualizar: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textBotonEliminar: {
    color: '#FFFFFF',
    
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,

  },
  modalTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalTexto: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#374151',
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  cancelar: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  confirmar: {
    backgroundColor: '#DC2626',
    padding: 10,
    borderRadius: 6,
  },
  header: {
    marginBottom: 10,
  },
  botonRegresarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  botonRegresar: {
    color: '#273e5e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});