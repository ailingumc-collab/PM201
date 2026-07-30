import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AltaUsuariosScreen from './screens/AltaUsuariosScreen';
import ConsultaUsuariosScreen from './screens/ConsultaUsuariosScreen';
import DetalleUsuarioScreen from './screens/DetalleUsuarioScreen';
import EditarUsuarioScreen from './screens/EditarUsuarioScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConsultaUsuarios">
        <Stack.Screen 
          name="ConsultaUsuarios" 
          component={ConsultaUsuariosScreen} 
          options={{ title: 'Consulta' }}
        />
        <Stack.Screen 
          name="AltaUsuarios" 
          component={AltaUsuariosScreen} 
          options={{ title: 'Registro de Usuarios' }}
        />
        <Stack.Screen 
          name="DetalleUsuario" 
          component={DetalleUsuarioScreen} 
          options={{ title: 'Detalle del usuario' }}
        />
        <Stack.Screen 
          name="EditarUsuario" 
          component={EditarUsuarioScreen} 
          options={{ title: 'Actualizar Usuario' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

