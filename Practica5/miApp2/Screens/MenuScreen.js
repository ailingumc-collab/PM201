/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';
import FormularioScreen from './TextInputAlert';
import Practica10 from './SafeAreaViewScrollView';
import PressableScreen from './PressableScreen';
import SwitchScreen from './SwitchScreen';

/* Zona 2: Main – Componentes */
export default function App() {

    const [screen,setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas': 
            return <TarjetasScreen/>
        case 'componente1':
            return <Componente1/>
        case 'textinputalert':
            return (
                <FormularioScreen
                onVolver={() => setScreen('menu')}
                />
            )
        case 'safeareaviewscrollview':
            return <Practica10/>

        case 'pressable':
            return <PressableScreen/>
            
        case 'switch':
            return <SwitchScreen/>

        case 'menu':
        default:
            return (
                <View>
                    <Text>Menú</Text>
                    <Button title="Tarjetas" onPress={()=>setScreen('tarjetas')}/>
                    <Button title="Componente1" onPress={()=>setScreen('componente1')}/>
                    <Button title="TextInputAlert" onPress={()=>setScreen('textinputalert')}/>
                    <Button title="SafeAreaViewScrollView" onPress={() => setScreen('safeareaviewscrollview')}/>
                    <Button title="Pressable" onPress={() => setScreen('pressable')}/>
                    <Button title="Switch" onPress={() => setScreen('switch')}/>
                </View>
            );
    }
}
/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});