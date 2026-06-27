/* Zona 1: importaciones de archivos y componentes  */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';
import SafeAreaViewScrollViewScreen from './SafeAreaViewScrollViewScreen';
import PressableScreen from './PressableScreen';
import SwitchScreen from './SwitchScreen';
import { ComponenteT } from './ComponenteT';
import ComponenteAlert from './ComponenteAlert';

/* Zona 2: Main – Componentes */
export default function App() {

    const [screen,setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas': 
            return <TarjetasScreen/>
        case 'componente1':
            return <Componente1/>
        case 'safeareaviewscrollview':
            return <SafeAreaViewScrollViewScreen/>
        case 'pressable':
            return <PressableScreen/>
        case 'switch':
            return <SwitchScreen/>

        case 'ComponenteT':
            return <ComponenteT/>

        case 'ComponenteAlert':
            return <ComponenteAlert/>

        case 'menu':
        default:
            return (
                <View style={styles.container}>
                    <Text>Menú</Text>
                    <Button title="Tarjetas" onPress={()=>setScreen('tarjetas')}/>
                    <Button title="Componente1" onPress={()=>setScreen('componente1')}/>
                    <Button title="SafeAreaViewScrollView" onPress={()=>setScreen('safeareaviewscrollview')}/>
                    <Button title="Pressable" onPress={()=>setScreen('pressable')}/>
                    <Button title="Switch" onPress={()=>setScreen('switch')}/> 
                    <Button title="ComponenteT" onPress={()=>setScreen('ComponenteT')}/>
                    <Button title="ComponenteAlert" onPress={()=>setScreen('ComponenteAlert')}/>
                </View>
            );
    }
}
/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
}
});