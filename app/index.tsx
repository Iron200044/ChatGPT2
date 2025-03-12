import 'react-native-gesture-handler';
import { useNavigation } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link, Stack } from 'expo-router';

export default function Index() {

  const router = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
      <Link href="./welcome">
        <Image 
        source={require('../assets/images/ChatGPTLogo.png')} 
        style={styles.logo}
        resizeMode="contain"/>
      </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 169,
    height: 195,
  },
});
