# BunnyChat

A modern React Native chat application built with Expo, featuring a sleek user interface, real-time messaging, and intuitive user experience.

![BunnyChat Logo](assets/images/Logo.gif)

## 🚀 Features

### Core Functionality
- **Real-time Messaging**: Send and receive messages instantly
- **User Authentication**: Secure sign-in and sign-up system
- **Chat Management**: View conversation history and manage chats
- **Image Sharing**: Share photos and images in conversations
- **User Avatars**: Personalized avatar system with fallbacks
- **Search Functionality**: Find conversations quickly
- **Message Status**: See delivered and read message status

### UI/UX Features
- **Animated Onboarding**: Beautiful animated screens with floating particles
- **Permission Management**: Intuitive permission request flow
- **Gradient Backgrounds**: Stunning gradient animations
- **Floating Elements**: Interactive animated UI components
- **Modern Design**: Clean, WhatsApp-inspired interface
- **Responsive Layout**: Works on both phones and tablets

### Technical Features
- **Offline Storage**: AsyncStorage for local data persistence
- **API Integration**: RESTful API communication
- **Image Caching**: Efficient image loading and caching
- **Performance Optimized**: Using FlashList for smooth scrolling
- **Cross-Platform**: Runs on iOS, Android, and Web

## 📱 Screenshots

The app consists of several key screens:

1. **Onboarding Flow**: Animated welcome screens with permission requests
2. **Sign In**: Social login options with animated background
3. **Chat List**: Home screen with search and conversation list
4. **Individual Chat**: Real-time messaging interface
5. **Additional Screens**: Profile, search, updates, and more

## 🛠 Technology Stack

- **Framework**: [Expo](https://expo.dev/) React Native
- **Navigation**: Expo Router
- **UI Components**: React Native core components
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **Storage**: AsyncStorage
- **Animations**: React Native Animated API
- **Image Handling**: Expo Image Picker
- **Lists**: Shopify FlashList
- **Networking**: Fetch API

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expo-app-BunyChata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_URL=your_api_endpoint_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/simulator**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 📁 Project Structure

```
expo-app-BunyChata/
├── app/                          # Expo Router pages
│   ├── index.js                  # Onboarding/landing page
│   ├── signin.js                 # Sign in screen
│   ├── signup.js                 # Sign up screen
│   ├── home.js                   # Main chat list
│   ├── chat.js                   # Individual chat
│   ├── profile.js                # User profile
│   ├── search.js                 # Search functionality
│   ├── updates.js                # Updates/status
│   ├── usedetails.js             # User details
│   └── text.js                   # Text-related features
├── assets/                       # Static assets
│   ├── images/                   # Image files
│   ├── icon.png                  # App icon
│   ├── adaptive-icon.png         # Adaptive icon
│   ├── splash.png               # Splash screen
│   └── favicon.png              # Web favicon
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── app.json                      # Expo configuration
├── babel.config.js              # Babel configuration
└── .eslintrc.json               # ESLint configuration
```

## 🎯 Key Features Explained

### Onboarding Flow
The app starts with an animated onboarding process that:
- Shows welcome screens with floating particle animations
- Requests necessary permissions (location, camera, contacts, etc.)
- Provides a smooth gradient background transition
- Uses animated swiper for navigation

### Authentication System
- **Sign In**: Email/password authentication with social login options
- **Sign Up**: New user registration flow
- **Session Management**: Persistent login using AsyncStorage
- **Secure Storage**: User data encrypted in device storage

### Chat Features
- **Real-time Messaging**: Instant message delivery
- **Message Status**: Delivered and read confirmations
- **Reply System**: Reply to specific messages
- **Image Sharing**: Camera and gallery integration
- **Chat History**: Persistent conversation storage

### UI/UX Highlights
- **Floating Particles**: Animated background elements
- **Gradient Animations**: Smooth color transitions
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Native driver animations for performance

## 🔧 Configuration

### Environment Variables

Create a `.env` file with your API endpoint:

```env
EXPO_PUBLIC_URL=https://your-api-server.com
```

### App Configuration

Key settings in `app.json`:
- **App Name**: BunnyChat
- **Bundle Identifier**: com.bunnychat.app
- **Permissions**: Camera, Location, Contacts
- **Icon Configuration**: Adaptive icons for different platforms

## 📦 Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Run tests (if configured)
npm test
```

## 🎨 Customization

### Styling
The app uses React Native StyleSheet for styling. Key style files:
- Individual components have inline styles
- Consistent color scheme throughout
- Responsive design patterns

### Theming
- **Primary Colors**: Gradient from `#667eea` to `#764ba2`
- **Background**: Light gray `#F5F5F5`
- **Text**: Dark gray `#1f1f1f`
- **Chat Bubbles**: Green (`#DCF8C6`) for sent, white for received

## 🚀 Deployment

### Development Build
```bash
# Create development build
eas build --platform android
eas build --platform ios
```

### Production Build
```bash
# Create production build
eas build --platform all --profile production
```

### Expo Go Limitations
For advanced features like custom native modules, create a development build.

## 🧪 Testing

The app includes testing setup with ESLint configuration. To run linting:

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent React Native development platform
- **React Native Community**: For the amazing ecosystem of libraries
- **Design Inspiration**: WhatsApp and modern messaging apps

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the Expo documentation for framework-specific issues

---

**Built with ❤️ using Expo React Native**