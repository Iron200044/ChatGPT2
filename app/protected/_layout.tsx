import React, { useEffect } from 'react';
import { useRouter, Slot } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthContext } from '@/context/DataContext/AuthContext/AuthContext';

export default function ProtectedLayout() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    // Si no hay user => mandar a logInSignUp
    if (!user) {
      router.replace('/logInSignUp');
    }
  }, [user]);

  // Mostrar loader mientras no hay user
  // O si onAuthStateChanged sigue “cargando”
  if (!user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Si user existe, renderizamos las pantallas hijas (Slot)
  return <Slot />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
