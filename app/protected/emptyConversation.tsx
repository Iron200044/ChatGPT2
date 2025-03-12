import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import Markdown from 'react-native-markdown-display';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Message } from '@/interfaces/AppInterfaces';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useDataContext } from '@/context/DataContext/DataContext'; 
import { useAuthContext } from '@/context/DataContext/AuthContext/AuthContext';

export default function emptyConversation() {

  const { chatId } = useLocalSearchParams();
  const router = useRouter();

  //Estados de los mensajes
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([] as Message[]);

  // Consumimos las funciones del DataContext
  const { fetchChat, createNewChat, updateChat } = useDataContext();
  const { user } = useAuthContext();

  // 1) Cargar los mensajes si existe chatId (para ver mensajes pasados)
  useEffect(() => {
    const loadChat = async () => {
      if (!chatId) return;
      const result = await fetchChat(chatId as string);
      if (result) {
        setMessages(result);
      }
    };
    loadChat();
  }, [chatId]);


  //Consume la API
  const getResponse = async ()=> {
    if (!message.trim() || isLoading) return;

    if (!user) {
      console.log("No user logged in, can't create chat");
      return; // o muestra un error, o redirige al login
    }
  
    setIsLoading(true);
  
    try {
      // 1) Llamada a la API
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAvN4Mm0DNKzZMSvIoI87d5Y0UGbSccLN4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },  // Recomendado
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      });
  
      const data = await response.json();
      console.log({ data });
  
      // 2) Mensaje usuario
      const newUserMessage: Message = {
        text: message,
        sender_by: "Me",
        date: new Date(),
        state: "sent",
      };
      setMessages(prev => [...prev, newUserMessage]);
      setMessage("");
  
      // 3) Mensaje bot
      const botResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      const newBotMessage: Message = {
        text: botResponseText,
        sender_by: "Bot",
        date: new Date(),
        state: "received",
      };
      const finalMessages = [...messages, newUserMessage, newBotMessage];
      setMessages(finalMessages);
  
      // 4) Guardar en Firestore
      if (chatId) {
        // updateDoc
        await updateChat(chatId as string, finalMessages);
      } else {
        // addDoc
        const newChatId = await createNewChat(finalMessages, newUserMessage.text, user.uid);
        // Navegar con nuevo ID
        router.replace({ pathname: "/protected/emptyConversation", params: { chatId: newChatId }});
      }
  
    } catch(error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  //Diseño de la pantalla
  return (
    <View style={styles.container}>
        <View style={styles.topRow}>
          <Link href="./dashboard" asChild>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </Link>
          <Link href="../welcome" asChild>
            <TouchableOpacity>
                <Image source={require('../../assets/images/miniLogo.png')}
                    style={styles.logo}/>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.divider} />

        {/* Contenedor de mensajes con scrollview*/}
        <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => {
          const isMe = msg.sender_by === "Me";
          return (
            <View
              key={index}
              style={[
                styles.messageBubble,
                isMe ? styles.meBubble : styles.botBubble,
              ]}
            >
              <Markdown style={{body: styles.messageText, text: styles.messageText, code_block: styles.codeBlock,
                code_inline: styles.codeBlock,}}>{msg.text}</Markdown>
            </View>
          );
        })}

        {/* Si no hay mensajes, mostramos un placeholder centrado */}
        {messages.length === 0 && (
          <View style={styles.centerContent}>
            <Text style={styles.placeholderText}>
              Ask anything, get your answer
            </Text>
          </View>
        )}
        </ScrollView>

        {/* Fila inferior: input + botón enviar */}
        <View style={styles.bottomRow}>
            <TextInput
            style={styles.input}
            placeholder="Ask Chat GeminiPT..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}/>

        <TouchableOpacity style={styles.sendButton} onPress={getResponse}>
          <Ionicons name="paper-plane-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343541',
      },
      // Fila superior (Back + icono derecho)
      topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,   // Separa de la parte de arriba (ajusta según notch)
        paddingHorizontal: 16,
        marginBottom: 8,
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      backText: {
        color: '#fff',
        marginLeft: 4,
      },
      
      // Contenedor scrolleable de mensajes
      messagesContainer: {
        flex: 1,
        backgroundColor: '#343541',
      },
      messagesContentContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      placeholderText: {
        color: '#999',
        fontSize: 16,
      },

      // Fila inferior (input + botón)
      bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
      },
      input: {
        flex: 1,
        backgroundColor: '#444654',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
      },
      sendButton: {
        backgroundColor: '#10A37F',
        borderRadius: 8,
        padding: 10,
      },
      divider: {
        height: 1,
        backgroundColor: '#ffffff',
      },
      logo:{
        width: 30,
        height: 30,
      },
      
      // Estilos para burbujas de mensaje
      messageBubble: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 8,
        marginVertical: 4,
      },
      meBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#10A37F', // Burbuja verde para usuario
      },
      botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#444654', // Burbuja gris para bot
      },
      messageText: {
        color: '#fff',
        fontSize: 15,
      },
      codeBlock: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        padding: 10,
        borderRadius: 5,
        fontSize: 14,
        fontFamily: "monospace",
      },
      code_inline: {
        backgroundColor: "#1e1e1e", // Fondo negro para inline code
        color: "#ffffff",
        paddingHorizontal: 6,
        borderRadius: 4,
      },
  });