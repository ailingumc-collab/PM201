import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, Pressable, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditarUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const API_URL = `http://192.168.100.61:5000/v1/usuarios/${id}`;

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  // Precargar los datos actuales del usuario
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        const info = datos.usuario || datos;
        setNombre(info.nombre);
        setEdad(info.edad.toString());
      } catch (error) {
        console.log("Error al cargar usuario:", error);
      } finally {
        setCargando(false);
      }
    };

    if (id) obtenerUsuario();
  }, [id]);

  const guardarCambios = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje("Vacíos", "Llena nombre y edad para continuar");
      return;
    }

    try {
      setGuardando(true);
      const respuesta = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, edad: edad }),
      });

      if (respuesta.ok) {
        mostrarMensaje("Éxito", "Usuario actualizado correctamente");
        router.replace('/(tabs)/consulta');
      } else {
        mostrarMensaje("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      mostrarMensaje("Error", "Ocurrió un error en la red");
      console.log(error);
    } finally {
      setGuardando(false);
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
        <Text style={styles.titulo}>Actualizar Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable style={styles.boton} onPress={guardarCambios} disabled={guardando}>
          <Text style={styles.textoBoton}>
            {guardando ? "Guardando cambios..." : "Guardar cambios"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#EAB308',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});