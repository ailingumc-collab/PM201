import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function SplashScreen(){

    return(

        <View style={styles.container}>

            <Image
                source={require("../assets/libros.jpg")}
                style={styles.imagen}
            />

            <Text style={styles.texto}>
                Repaso 2
            </Text>

        </View>

    );

}

const styles=StyleSheet.create({

container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFFFFF"
},

imagen:{
    width:180,
    height:180,
    resizeMode:"contain"
},

texto:{
    fontSize:22,
    marginTop:10,
    fontWeight:"bold"
}

});