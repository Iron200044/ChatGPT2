import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, Link, useRouter } from 'expo-router';
import { useAuthContext } from '@/context/DataContext/AuthContext/AuthContext'; // <-- AuthContext

export default function AuthScreen() {
  const router = useRouter();
  const { signUp, signIn, user } = useAuthContext(); // <-- Consumimos AuthContext
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    try {
      setError(''); // Limpiar el error antes de intentar
      if (mode === 'register') {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      console.log('User in context:', user);
      router.replace('/protected/dashboard');
    } catch (error: any) {
      console.log('Auth Error:', error);
      if (error?.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
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

      {/* Mostrar mensaje de error si lo hay */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
  errorText: {
    color: '#fff',
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
});
