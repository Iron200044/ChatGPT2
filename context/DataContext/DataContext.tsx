import { createContext, useContext } from "react";
import { doc, getDoc, updateDoc, addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from "@/utils/firebaseConfig";
import { Message } from "@/interfaces/AppInterfaces";
import { query, where } from "firebase/firestore/lite";

interface ChatDoc {
    id: string;
    titulo?: string;
    create_at?: any;
    messages?: Message[];
    userId?: string; 
  }

interface DataContextValue {
    fetchChat: (chatId: string) => Promise<Message[] | null>;
    createNewChat: (messages: Message[], userFirstMessage: string, uid: string) => Promise<string>;
    updateChat: (chatId: string, messages: Message[]) => Promise<void>;
    fetchAllChats: () => Promise<ChatDoc[]>;
    fetchUserChats: (uid: string) => Promise<ChatDoc[]>;
}

export const DataContext = createContext<DataContextValue>({
    fetchChat: async () => null,
    createNewChat: async () => "",
    updateChat: async () => {},
    fetchAllChats: async () => [],
    fetchUserChats: async () => [],
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    // 1) Obtener los mensajes de un chat
    const fetchChat = async (chatId: string): Promise<Message[] | null> => {
        try {
            const docRef = doc(db, "chats", chatId);
            const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            // Suponemos que data.messages contiene el array de Message
            if (data.messages) {
                return data.messages as Message[];
            }
        }
        return null;
        } catch (error) {
            console.log("Error fetching chat:", error);
            return null;
        }
    };

    // 2) Crear un nuevo chat y devuelve su ID
    const createNewChat = async (messages: Message[], userFirstMessage: string, uid: string): Promise<string> => {
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                userId: uid,
                titulo: userFirstMessage.slice(0, 20),
                create_at: new Date(),
                messages,
            });
        return docRef.id;
        } catch (error) {
            console.log("Error creating new chat:", error);
            throw error;
        }
    };

    // 3) Actualizar un chat existente
    const updateChat = async (chatId: string, messages: Message[]) => {
        try {
            const docRef = doc(db, "chats", chatId);
            await updateDoc(docRef, { messages });
        } catch (error) {
            console.log("Error updating chat:", error);
            throw error;
        }
    };

    const fetchAllChats = async (): Promise<ChatDoc[]> => {
        try {
          const snapshot = await getDocs(collection(db, "chats"));
          const data = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as ChatDoc[];
          return data;
        } catch (error) {
          console.log("Error fetching chats:", error);
          return [];
        }
    };

    const fetchUserChats = async (uid: string): Promise<ChatDoc[]> => {
        try {
          const q = query(
            collection(db, "chats"),
            where("userId", "==", uid)  // Filtra solo los chats cuyo userId coincide
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as ChatDoc[];
          return data;
        } catch (error) {
          console.log("Error fetching user chats:", error);
          return [];
        }
      };


    //Context for all
    return (
    <DataContext.Provider value={{ fetchChat, createNewChat, updateChat, fetchAllChats, fetchUserChats }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);