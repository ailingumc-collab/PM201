/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Saludo} from './components/Saludo';
import { Saludo2 } from './components/Saludo2';

/* Zona 2: Main – Componentes */
export default function App() {
  return (
    <View style={styles.container}>
      
      <Image source={require('./assets/wave.png')} />
      <Text>Hola Mundo React Native </Text>
      <Text>--------------------------------</Text>
      <Saludo/>

      <Text>--------------------------------</Text>
      <Saludo2/>

      <StatusBar style="auto" />

    </View>
  );
}
/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
