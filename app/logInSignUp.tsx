import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, Link, useRouter } from 'expo-router';
import { useAuthContext } from '@/context/DataContext/AuthContext/AuthContext'; // <-- tu AuthContext
import { auth } from '@/utils/firebaseConfig'; // <-- si lo necesitas para mostrar user info

export default function AuthScreen() {
  const router = useRouter();
  const { signUp, signIn, user } = useAuthContext(); // <-- Consumimos AuthContext
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (mode === 'register') {
        await signUp(email, password); // del AuthContext
      } else {
        await signIn(email, password); // del AuthContext
      }
      console.log('User in context:', user);
      router.replace('/protected/dashboard');
    } catch (error) {
      console.log('Auth Error:', error);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'login' ? 'Login' : 'Create Account'}
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMode} style={{ marginTop: 12 }}>
        <Text style={styles.toggleText}>
          {mode === 'login'
            ? 'No account? Sign up'
            : 'Have an account? Log in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#444654',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
  },
  submitButton: {
    backgroundColor: '#10A37F',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleText: {
    color: '#10A37F',
    fontSize: 14,
  },
  link: {
    marginTop: 24,
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
