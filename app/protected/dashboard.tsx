import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator  } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import { useDataContext } from '@/context/DataContext/DataContext'
import { useAuthContext } from '@/context/DataContext/AuthContext/AuthContext';

export default function dashboard() {
  const { user } = useAuthContext(); // para obtener user.uid
  const { fetchUserChats } = useDataContext();

  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserChats = async () => {
      try {
        if (!user) return; // Asegurarse de no llamar sin user
        const data = await fetchUserChats(user.uid);
        setChats(data);
      } catch (error) {
        console.error('Error fetching user chats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserChats();
  }, [user]);

  const renderChatList = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 16 }} />
    }

    return chats.map(chat => (
      <Link
        href={`./emptyConversation?chatId=${chat.id}`} asChild key={chat.id}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="chatbubble-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{chat.titulo || 'Untitled Chat'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </Link>
    ))
  }

  return (
    <View style={styles.container}>
      {/* Contenedor scrolleable con las opciones */}
      <ScrollView style={styles.menuContainer}>
        {/* Opción: New Chat */}
        <Link href="./emptyConversation" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="chatbubble-outline" size={20} color="#fff" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>New Chat</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>

        {/* Divider */}
        <View style={styles.divider} />
        {/*traer la lista de chats*/}
        {renderChatList()}
      </ScrollView>


        <View style={styles.menuBox}>

        {/* Opción: Clear conversations */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="trash-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Clear conversations</Text>
          </View>
        </TouchableOpacity>

        {/* Opción: Upgrade to Plus */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="star-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Upgrade to Plus</Text>
          </View>
          {/* Etiqueta "NEW" */}
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        </TouchableOpacity>

        {/* Opción: Light mode */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="sunny-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Light mode</Text>
          </View>
        </TouchableOpacity>

        {/* Opción: Updates & FAQ */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="information-circle-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Updates & FAQ</Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Opción: Logout */}
        <TouchableOpacity style={[styles.menuItem, { marginTop: 16 }]}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" style={styles.menuIcon} />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Logout</Text>
          </View>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202123', // Fondo oscuro
      },
      menuContainer: {
        flex: 1,
      },
      menuItem: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuIcon: {
        marginRight: 12,
      },
      menuItemText: {
        fontSize: 15,
        color: '#fff',
      },
      divider: {
        height: 1,
        backgroundColor: '#3e3f44',
        marginHorizontal: 16,
      },
      newBadge: {
        backgroundColor: '#FACC15',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
      },
      newBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#202123',
      },
      menuBox: {
        // Fijado abajo
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2A2B2E',
        borderTopWidth: 1,
        borderTopColor: '#3e3f44',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
});