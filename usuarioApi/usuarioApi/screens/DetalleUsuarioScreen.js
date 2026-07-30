import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Pressable, StyleSheet, Modal, ActivityIndicator, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetalleUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const API_URL = `http://192.168.100.61:5000/v1/usuarios/${id}`;

  const obtenerDetalle = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setUsuario(datos.usuario || datos);
    } catch (error) {
      console.log("Error al obtener detalle:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (id) obtenerDetalle();
  }, [id]);

  const eliminarUsuario = async () => {
    try {
      setEliminando(true);
      const respuesta = await fetch(API_URL, {
        method: 'DELETE',
      });

      if (respuesta.ok) {
        setModalVisible(false);
        router.replace('/(tabs)/consulta');
      } else {
        Alert.alert("Error", "No se pudo eliminar el usuario");
      }
    } catch (error) {
      console.log("Error al eliminar:", error);
    } finally {
      setEliminando(false);
    }
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.containerCentrado}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalles del Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{usuario?.nombre}</Text>

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{usuario?.edad} años</Text>

        <Pressable 
          style={styles.botonActualizar} 
          onPress={() => router.push(`/editar/${id}`)}
        >
          <Text style={styles.textoBoton}>Actualizar</Text>
        </Pressable>

        <Pressable 
          style={styles.botonEliminar} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBoton}>Eliminar</Text>
        </Pressable>
      </View>

      {/* Modal de confirmación de eliminación requerido */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalMensaje}>
              ¿Estás seguro de que deseas eliminar al usuario {usuario?.nombre}?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable 
                style={styles.botonCancelarModal} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable 
                style={styles.botonEliminarModal} 
                onPress={eliminarUsuario}
                disabled={eliminando}
              >
                <Text style={styles.textoBoton}>
                  {eliminando ? "Eliminando..." : "Sí, eliminar"}
                </Text>
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
    justifyContent: 'center',
  },
  containerCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  botonActualizar: {
    backgroundColor: '#EAB308', // Amarillo exacto de la muestra del PDF
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  botonEliminar: {
    backgroundColor: '#EF4444', // Rojo exacto de la muestra del PDF
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContenido: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 10,
  },
  modalMensaje: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botonCancelarModal: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  botonEliminarModal: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoCancelar: {
    color: '#374151',
    fontWeight: 'bold',
  },
});