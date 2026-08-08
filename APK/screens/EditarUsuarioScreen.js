import {SafeAreaView,View,Text,StyleSheet,Pressable,TextInput,Alert,Platform} from 'react-native';
import React, {useState} from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EditarUsuarioScreen(){

    const {nombre, edad, id}=useLocalSearchParams();

    const [nuevoNombre, setNuevoNombre]=useState(nombre);
    const [nuevaEdad, setNuevaEdad]=useState(String(edad));
    const [cargando, setCargando]=useState(false);

    const mostrarMensaje=(titulo, mensaje)=>{
        if(Platform.OS === 'web'){
            window.alert(`${titulo}\n\n${mensaje}`);
        }else{
            Alert.alert(titulo, mensaje);
        }
    };

    const ActualizarUsuario = async()=>{

        if(nuevoNombre.trim() === '' || nuevaEdad.trim() === ''){
            mostrarMensaje(
                "Campos vacíos",
                "Llena nombre y edad para continuar"
            );
            return;
        }

        const usuarioId = Number(id);

        console.log("ID recibido:", id);
        console.log("ID convertido:", usuarioId);

        const username = "admin";
        const password = "1234";

        const credentials = btoa(`${username}:${password}`);

        try{
            setCargando(true);
            const respuesta = await fetch(
                `http://10.16.32.191:5000/v1/usuarios/${usuarioId}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Basic ${credentials}`
                    },
                    body:JSON.stringify({

                        nombre:nuevoNombre,
                        edad:Number(nuevaEdad)
                    })
                }
            );

            if(!respuesta.ok){
                const errorTexto = await respuesta.text();
                console.log("Respuesta API:", errorTexto);
                throw new Error("No se pudo actualizar el usuario");
            }

            const datos = await respuesta.json();
            console.log("Datos actualizados:", datos);

            mostrarMensaje(
                "Éxito",
                "Usuario actualizado correctamente"
            );

            router.replace({
                pathname:'/detalle',
                params:{
                    id:id,
                    nombre:nuevoNombre,
                    edad:nuevaEdad
                }
            });



        }catch(error){
            console.log("ERROR:",error);
            mostrarMensaje(
                "Error",
                "No fue posible actualizar el usuario"
            );

        }finally{
               setCargando(false);
        }

    };

    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={()=>router.back()} style={styles.botonRegresarContainer}>
                    <Ionicons name="arrow-back" size={24} color ="#273e5e"/>
                    <Text style={styles.botonRegresar}>
                         Regresar 
                    </Text>
                </Pressable>
            </View>


            <View>
                <Text style={styles.titulo}>
                    Actualizar Usuario
                </Text>
                <View style={styles.formulario}>
                    <Text style={styles.label}>
                        Nombre
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={nuevoNombre}
                        onChangeText={setNuevoNombre}
                    />



                    <Text style={styles.label}>
                        Edad
                    </Text>



                    <TextInput
                        style={styles.input}
                        value={nuevaEdad}
                        onChangeText={setNuevaEdad}
                        keyboardType="numeric"
                    />



                    <Pressable
                        style={styles.guardar}
                        onPress={ActualizarUsuario}
                        disabled={cargando}
                    >


                        <Text style={styles.textBoton}>
                            {
                                cargando 
                                ? "Actualizando cambios..."
                                : "Guardar cambios"
                            }
                        </Text>


                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({


    container:{
        flex:1,
        backgroundColor:'#F5F7FA',
        padding:20,
        marginTop:50,
    },

    titulo:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
        color:'#01060f',
        marginBottom:20,
    },

    formulario:{
        backgroundColor:'#FFFFFF',
        borderRadius:15,
        padding:20,
    },

    label:{
        fontSize:12,
        color:'#92a0b9',
        marginBottom:5,
    },

    input:{
        borderWidth:1,
        borderColor:'#E5E7EB',
        borderRadius:8,
        padding:10,
        marginBottom:15,
    },

    guardar:{
        backgroundColor:'#FACC15',
        padding:10,
        borderRadius:8,
        alignItems:'center',
    },

    textBoton:{
        color:'#374151',
        fontWeight:'bold',
    },

    header:{
        marginBottom:10,
    },

    botonRegresarContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
    },

    botonRegresar:{
        color:'#273e5e',
        fontSize:16,
        fontWeight:'bold',
    },
});