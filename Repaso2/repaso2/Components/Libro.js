import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Libro({item}){

    return(

        <View style={styles.card}>

            <Text style={styles.titulo}>
                {item.titulo}
            </Text>

            <Text>
                Autor: {item.autor}
            </Text>

            <Text>
                Género: {item.genero}
            </Text>

        </View>

    );

}

const styles=StyleSheet.create({

card:{
    backgroundColor:"rgba(255,255,255,.90)",
    padding:15,
    borderRadius:10,
    marginBottom:12
},

titulo:{
    fontWeight:"bold",
    fontSize:18
}

});