/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';

/* Zona 2: Main – Componentes */
export default function App() {
    const [screen, setScreen] = useState('menu');
    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'componente1':
            return <Componente1 />;
        case 'menu':
            default:
        return (
            <View>
                <Text> Menú de Prácticas </Text>
                <Button title="practica Tarjetas" onPress={() => setScreen('tarjetas')} />
                <Button title="practica Componente1" onPress={() => setScreen('componente1')} />

            </View>
     ); // cierre del return
  } // cierre del switch
} // cierre de la función 

/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});