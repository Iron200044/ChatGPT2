import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal  } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack, router } from 'expo-router';
import { useDataContext } from '@/context/DataContext/DataContext'
import { useAuthContext } from '@/context/DataContext/AuthContext/AuthContext';

export default function dashboard() {
  const { user, logOut } = useAuthContext(); // para obtener user.uid
  const { fetchUserChats } = useDataContext();

  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Cargar los chats del usuario al montar el componente
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

  // Función para renderizar la lista de chats
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

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      await logOut();
      // Opcional: redirigir a la pantalla de login
      router.replace('/logInSignUp');
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  // Función para mostrar el Modal
  const showModal = (content: string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  // Función para cerrar el Modal
  const closeModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

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
        <TouchableOpacity style={styles.menuItem} onPress={() => showModal('clear')}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="trash-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Clear conversations</Text>
          </View>
        </TouchableOpacity>

        {/* Opción: Upgrade to Plus */}
        <TouchableOpacity style={styles.menuItem} onPress={() => showModal('upgrade')}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="star-outline" size={20} color="#fff" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Upgrade to Plus</Text>
          </View>
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
        <TouchableOpacity style={[styles.menuItem, { marginTop: 16 }]} onPress={handleLogout}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" style={styles.menuIcon} />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Logout</Text>
          </View>
        </TouchableOpacity>
        </View>
      {/* Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {modalContent === 'upgrade' ? (
              <>
                <Text style={styles.modalTitle}>Upgrade to Plus</Text>
                <Text style={styles.modalText}>Enjoy premium features by sending 200.000 pesos to my nequi ;).</Text>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>Upgrade Now</Text>
                </TouchableOpacity>
              </>
            ) : modalContent === 'clear' ? (
              <>
                <Text style={styles.modalTitle}>Clear Conversations</Text>
                <Text style={styles.modalText}>Are you sure you want to clear all conversations?</Text>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : null}

            {/* Close button only appears for Upgrade modal */}
            {modalContent !== 'clear' && (
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
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
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButton: {
        backgroundColor: '#10A37F',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
      },
      modalButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      closeButton: {
        backgroundColor: '#999',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
      },
});