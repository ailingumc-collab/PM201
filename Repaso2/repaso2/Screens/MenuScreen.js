import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, Pressable, FlatList, Alert, ActivityIndicator, } from "react-native";

import SplashScreen from "./SplashScreen";
import Libro from "../Components/Libro";

export default function MenuScreen() {
  const [splash, setSplash] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");

  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const tiempo = setTimeout(() => {
      setSplash(false);
    }, 2000);
    return () => clearTimeout(tiempo);
  }, []);

  const agregarLibro = () => {
    if (
      titulo.trim() === "" ||
      autor.trim() === "" ||
      genero.trim() === ""
    ) {
      Alert.alert(
        "Alert",
        "Todos los campos son obligatorios."
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros([...libros, nuevoLibro]);
      setTitulo("");
      setAutor("");
      setGenero("");

      setLoading(false);

      Alert.alert(
        "Alert",
        "Libro guardado correctamente."
      );
    }, 4000);
  };

  if (splash) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={require("../assets/fondoV.jpg")}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <Text style={styles.tituloPrincipal}>
          Catálogo de Libros
        </Text>
        <TextInput
          placeholder="Título del libro"
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          placeholder="Autor"
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          placeholder="Género"
          style={styles.input}
          value={genero}
          onChangeText={setGenero}
        />
        <Pressable
          style={styles.boton}
          onPress={agregarLibro}
          disabled={loading}
        >
          <Text style={styles.textoBoton}>
            {loading ? "Guardando..." : "Agregar Libro"}
          </Text>

        </Pressable>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            style={{ marginTop: 20 }}
          />
        )}

        <Text style={styles.total}>
          Total de libros: {libros.length}
        </Text>

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Libro item={item} />}
        />

      </View>

    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  tituloPrincipal: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "white",
  },

  input: {
    backgroundColor: "rgba(255,255,255,.90)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  boton: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBoton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },

  total: {
    marginVertical: 15,
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },

});