import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Dimensions } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'; 
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Image } from 'expo-image'; 
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

// Animated Background Particles Component
const FloatingParticles = () => {
  const particles = useRef(
    Array(12).fill(0).map(() => ({
      animation: new Animated.Value(0),
      x: Math.random() * width,
      size: Math.random() * 80 + 40,
      delay: Math.random() * 2000,
    }))
  ).current;

  useEffect(() => {
    particles.forEach((particle, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(particle.delay),
          Animated.timing(particle.animation, {
            toValue: 1,
            duration: 4000 + index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(particle.animation, {
            toValue: 0,
            duration: 4000 + index * 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((particle, index) => {
        const translateY = particle.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [height + 100, -100],
        });

        const opacity = particle.animation.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 0.4, 0.4, 0],
        });

        const scale = particle.animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.5, 1, 0.5],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: particle.x,
                width: particle.size,
                height: particle.size,
                transform: [{ translateY }, { scale }],
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

// Pulse Animation Component for Profile Picture
const PulseRing = ({ size }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

export default function SignUp() {
  const [getImage, setImage] = useState(null);
  const [getMobile, setMobile] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignUp = async () => {
    let formData = new FormData();
    formData.append("mobile", getMobile);
    formData.append("firstName", getFirstName);
    formData.append("lastName", getLastName);
    formData.append("password", getPassword);
    if (getImage != null) {
      formData.append("avatarImage", {
        name: "avatar.png",
        type: "image/png",
        uri: getImage,
      });
    }

    let response = await fetch(
      process.env.EXPO_PUBLIC_URL + "/NoteApp/SignUp",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      let json = await response.json();
      if (json.success) {
        Alert.alert("Success", json.message);
        router.replace("/signin");
      } else {
        Alert.alert("Error", json.message);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient 
        colors={['#667eea', '#764ba2', '#f093fb']} 
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <FloatingParticles />
        <StatusBar hidden={true} />
        
        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>Join BunnyChat today! 🐰</Text>
          </View>

          {/* Profile Picture Section */}
          <View style={styles.profileContainer}>
            <View style={styles.profileWrapper}>
              <PulseRing size={140} />
              <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#ffffff', '#f0f4f8']}
                  style={styles.imagePlaceholderContainer}
                >
                  <View style={styles.imagePlaceholder}>
                    {getImage ? (
                      <Image 
                        source={{ uri: getImage }} 
                        style={styles.profileImage} 
                        contentFit="cover" 
                      />
                    ) : (
                      <View style={styles.uploadIconContainer}>
                        <Text style={styles.uploadIcon}>📷</Text>
                        <Text style={styles.uploadText}>Add Photo</Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={setFirstName}
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={getFirstName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👥</Text>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={setLastName}
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={getLastName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>📱</Text>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={getMobile}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={getPassword}
              />
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <LinearGradient 
              colors={['#ffffff', '#f0f0f0']} 
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonTextPrimary}>Sign Up Now ✨</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.replace("/signin")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account? <Text style={styles.boldText}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  particle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  
  // Header Styles
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },

  // Profile Picture Styles
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  imagePlaceholderContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    overflow: 'hidden',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadIconContainer: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },

  // Form Styles
  formContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: '#ffffff',
    fontSize: 16,
  },

  // Button Styles
  button: {
    marginTop: 10,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    opacity: 0.9,
  },
  boldText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});