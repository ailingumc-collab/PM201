/* Zona 1: importaciones de archivos y componentes */
import React, {useState} from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

/* Zona 2: Main – Componentes */
export default function SwitchScreen() {
    const [encendido, setEncendido] = useState(false);

    return (
        <View style={[styles.container, {
            backgroundColor: encendido ? '#222' : '#fff'
        }]}>
            <Text style={[styles.texto, { color: encendido ? 'white' : 'black' }]}>
                {encendido ? 'Modo oscuro activado' : 'Modo oscuro desactivado'}
            </Text>
            <Switch 
                value={encendido} 
                onValueChange={setEncendido}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={encendido ? '#2196f3' : '#f4f3f4'}
            />
        </View>
    )
}

/* Zona 3: Estilos y posicionamientos */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})