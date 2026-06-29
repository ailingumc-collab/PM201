/* Zona 1: importaciones de archivos y componentes */
import React, { useState } from 'react';

import { StyleSheet, Text, View, TextInput, Switch, Pressable, Alert, ScrollView, } from 'react-native';

/* Zona 2: Main – Componentes */
export default function RegistroScreen() {

  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');

  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const enviarRegistro = () => {

    if (
      nombre.trim() === '' ||
      carrera.trim() === '' ||
      semestre.trim() === ''
    ) {
      Alert.alert(
        'Campos incompletos',
        'No se permiten TextInput vacíos.'
      );
      return;
    }
    if (isNaN(semestre)) {
      Alert.alert(
        'Error',
        'El semestre debe ser un número.'
      );
      return;
    }

    Alert.alert(
      'Registro enviado',
      'Nombre: ' + nombre + '\n' +
      'Carrera: ' + carrera + '\n' +
      'Semestre: ' + semestre + '\n\n' +
      'Taller: ' + (taller ? 'Sí' : 'No') + '\n' +
      'Constancia: ' + (constancia ? 'Sí' : 'No') + '\n' +
      'Deportes: ' + (deportes ? 'Sí' : 'No') + '\n'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Registro de Evento Universitario
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
      />

      <TextInput
        style={styles.input}
        placeholder="Semestre"
        keyboardType="numeric"
        value={semestre}
        onChangeText={setSemestre}
      />

      <View style={styles.switchContainer}>
        <Text>¿Asistirá al taller?</Text>
        <Switch
          value={taller}
          onValueChange={setTaller}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>¿Requiere constancia?</Text>
        <Switch
          value={constancia}
          onValueChange={setConstancia}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>¿Participará en actividades deportivas?</Text>
        <Switch
          value={deportes}
          onValueChange={setDeportes}
        />
      </View>

      <Pressable
        style={styles.boton}
        onPress={enviarRegistro}
      >
        <Text style={styles.textoBoton}>
          Enviar Registro
        </Text>
      </Pressable>

    </ScrollView>
  );
}

/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  boton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },

  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

});