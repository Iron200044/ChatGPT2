# 🤖 ChatGPT2 - AI Chat Mobile App

Aplicación móvil inspirada en ChatGPT desarrollada con **React Native + Expo**, integrada con la API de Gemini para generar respuestas conversacionales en tiempo real.

La app permite a los usuarios interactuar con un asistente de inteligencia artificial mediante una interfaz moderna y optimizada para dispositivos móviles.

---

## 🚀 Features

- 💬 Chat conversacional con IA
- 🤖 Integración con Gemini API
- 📱 Interfaz móvil moderna y responsive
- ⚡ Respuestas en tiempo real
- 🧠 Manejo de contexto conversacional
- 🔐 Configuración mediante variables de entorno
- 🎨 UI inspirada en ChatGPT

---

## 🛠️ Tech Stack

### Frontend
- React Native
- Expo Go
- TypeScript
- Context API

### AI Integration
- Gemini API

---

## 📂 Project Structure

```bash
.
├── app/                    # Main screens and navigation
├── assets/                 # Images, icons, and static resources
├── context/
│   └── DataContext/        # Global app state management
├── interfaces/             # TypeScript interfaces and types
├── utils/                  # Helper functions and API utilities
│
├── .gitignore
├── app.json                # Expo configuration
├── eas.json                # EAS Build configuration
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-user/geminigpt-mobile.git
cd geminigpt-mobile
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the project

```bash
npx expo start
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key
```

---

## 📱 Available Scripts

```bash
# Start Expo
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## 🧠 Gemini API Integration

The application uses Gemini API to:

- Generate AI responses
- Maintain conversational flow
- Process user prompts in real time

---

## 🎨 UI Inspiration

This project was inspired by the ChatGPT mobile experience, focusing on:

- Clean conversational interface
- Smooth user experience
- Fast interactions
- Minimalist design

---

## 🚧 Future Improvements

- 🗂️ Chat history
- 🌙 Dark mode improvements
- 🎤 Voice input support
- 📎 File and image upload
- 🧠 Multi-chat sessions
- 🔔 Push notifications

---

## 👨‍💻 Author

- Samuel Acero García
