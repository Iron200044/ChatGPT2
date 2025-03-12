import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { DataProvider } from "@/context/DataContext/DataContext";
import { AuthProvider, useAuthContext } from "@/context/DataContext/AuthContext/AuthContext";
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';


export default function RootLayout() {
  return (
  <AuthProvider>
  <DataProvider>
  <GestureHandlerRootView style={StyleSheet.absoluteFill}>
    <Stack screenOptions={{headerShown:false}}> 
      <Stack.Screen name="index"/>
      <Stack.Screen name="logInSignUp"/>
      <Stack.Screen name="splashscreen"/>
      <Stack.Screen name="welcome"/>
    </Stack>
  </GestureHandlerRootView>
  </DataProvider>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
