import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router';

export default function welcome() {
  return (
    <View style={styles.container}>

      {/*Logo, título, subtítulo*/}
      <View style={styles.topSection}>
        <Image source={require('../assets/images/miniLogo.png')}
        style={styles.logo}/>

        <Text style={styles.title}>Welcome to ChatGPT</Text>

        <Text style={styles.subtitle}>Ask anything, get your answer</Text>

        <Image source={require('../assets/images/sun.png')}
        style={styles.logo2}/>

        <Text style={styles.examplesTitle}>Examples</Text>
      </View>
      
      {/*Ejemplos de preguntas*/}
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>"Explain quantum computing in simple terms"</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>"Got any creative ideas for a 10 year old's birthday?"</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>"How do I make an HTTP request in JavaScript?"</Text>
      </View>

      {/*Botón “Next”*/}
      <TouchableOpacity style={styles.button}>
        <Link style={styles.buttonText} href="./logInSignUp" asChild>
          <Text>Log In</Text>
        </Link>
      </TouchableOpacity>

    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textDecorationColor: '#FFFFFF',
    backgroundColor: '#343541',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    paddingBottom: 40,
  },
  examplesTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  exampleCard: {
    width: '90%',
    backgroundColor: '#444654', // Color ligeramente más claro para el card
    borderRadius: 8,
    padding: 16,
    marginVertical: 6
  },
  exampleText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    marginTop: 40,
    backgroundColor: '#10A37F', // Verde similar al del botón “Next”
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo2:{
    width: 20,
    height: 20,
  },
  topSection: {
    // Ajusta según necesites más o menos espacio arriba
    marginTop: 70, 
    alignItems: 'center',
    marginBottom: 20, // Espacio entre la parte de arriba y el resto
  },
});
  