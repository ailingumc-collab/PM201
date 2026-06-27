/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

import { Perfil } from '../components/Perfil';

/* Zona 2: Main – Componentes */
export default function App() {
  return (
    <View style={styles.container}>

      <Perfil style={styles.tarjetaRoja} nombre="Cintia" carrera="ISC" materia="Móvil" cuatri="9"/>
      <Perfil style={styles.tarjetaVerde} nombre="Ailin" carrera="ISC" materia="Móvil" cuatri="9"/>
      <Perfil style={styles.tarjetaAzul} nombre="Ailyn" carrera="ISC" materia="Móvil" cuatri="9"/>
      
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
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  tarjetaVerde:{backgroundColor: '#cdfad3'},
  tarjetaRoja: {backgroundColor: '#f0b7bb'},
  tarjetaAzul: {backgroundColor: '#bed7f9'},
});