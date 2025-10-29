import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { router } from "expo-router";
import Checkbox from 'expo-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Animated Background Component
const AnimatedBackground = ({ colors, children }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.animatedBackground}>
      <LinearGradient
        colors={colors}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {children}
    </View>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array(8).fill(0).map(() => ({
    animation: new Animated.Value(0),
    x: Math.random() * width,
    size: Math.random() * 60 + 40,
  }));

  useEffect(() => {
    particles.forEach((particle, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(particle.animation, {
            toValue: 1,
            duration: 3000 + index * 500,
            useNativeDriver: true,
          }),
          Animated.timing(particle.animation, {
            toValue: 0,
            duration: 3000 + index * 500,
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
          outputRange: [height, -100],
        });

        const opacity = particle.animation.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 0.6, 0.6, 0],
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
                transform: [{ translateY }],
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default function Index() {
  const [isChecked, setIsChecked] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    async function checkUserIn() {
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson !== null) {
          router.replace("/home");
        }
      } catch (e) {
        console.error("Error checking user in:", e);
      }
    }
    checkUserIn();

    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    if (isChecked) {
      router.replace('/signin');
    } else {
      alert("Please accept the permissions to proceed.");
    }
  };

  return (
    <Swiper
      loop={false}
      showsButtons={false}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dot}
    >
      {/* First Screen - Welcome */}
      <AnimatedBackground colors={['#667eea', '#764ba2', '#f093fb']}>
        <FloatingParticles />
        <View style={styles.screen}>
          <Animated.View 
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              {/* <Image
                source={require('../assets/images/Logo.gif')}
                style={styles.logoLarge}
              /> */}
              <View style={styles.logoGlow} />
            </View>
            <Text style={styles.appTitle}>BunnyChat</Text>
            <Text style={styles.subtitle}>Connect. Chat. Share.</Text>
          </Animated.View>
        </View>
      </AnimatedBackground>

      {/* Second Screen - Permissions */}
      <AnimatedBackground colors={['#4facfe', '#00f2fe', '#43e97b']}>
        <FloatingParticles />
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.permissionsSection}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>🔒 Permissions Needed</Text>
              <Text style={styles.description}>
                These permissions enhance your BunnyChat experience
              </Text>
            </View>

            <View style={styles.permissionsContainer}>
              <View style={styles.permissionCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📍</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>Location Service</Text>
                  <Text style={styles.permissionDescription}>
                    Share your location and coordinate with friends
                  </Text>
                </View>
              </View>

              <View style={styles.permissionCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📶</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>Bluetooth</Text>
                  <Text style={styles.permissionDescription}>
                    Connect with nearby users for faster sharing
                  </Text>
                </View>
              </View>

              <View style={styles.permissionCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🌐</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>GPS Access</Text>
                  <Text style={styles.permissionDescription}>
                    Enhanced location features and live locations
                  </Text>
                </View>
              </View>

              <View style={styles.permissionCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>👥</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>Contacts</Text>
                  <Text style={styles.permissionDescription}>
                    Find friends and invite others easily
                  </Text>
                </View>
              </View>

              <View style={styles.permissionCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📷</Text>
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>Camera & Photos</Text>
                  <Text style={styles.permissionDescription}>
                    Share photos and videos instantly
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                style={styles.checkbox}
                color={isChecked ? '#667eea' : undefined}
              />
              <Text style={styles.checkboxLabel}>
                I understand and accept these permissions
              </Text>
            </View>
          </View>
        </ScrollView>
      </AnimatedBackground>

      {/* Third Screen - Get Started */}
      <AnimatedBackground colors={['#fa709a', '#fee140', '#ffd89b']}>
        <FloatingParticles />
        <View style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.welcomeTitle}>WELCOME TO</Text>
            <Text style={styles.welcomeBrand}>BUNNYCHAT</Text>

            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/images.jpeg')}
                style={styles.image}
              />
              <View style={styles.imageGlow} />
            </View>

            <Text style={styles.tagline}>
              Start chatting with friends and family today! 🎉
            </Text>

            <TouchableOpacity
              style={[
                styles.loginButton,
                !isChecked && styles.loginButtonDisabled
              ]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isChecked ? ['#667eea', '#764ba2'] : ['#ccc', '#999']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.loginText}>Start Chat 💬</Text>
              </LinearGradient>
            </TouchableOpacity>

            {!isChecked && (
              <Text style={styles.warningText}>
                Please accept permissions on the previous screen
              </Text>
            )}
          </View>
        </View>
      </AnimatedBackground>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  animatedBackground: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  permissionsSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  particle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  // First Screen Styles
  logoContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  logoLarge: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  logoGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  appTitle: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    letterSpacing: 2,
  },
  // Second Screen Styles
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.9,
  },
  permissionsContainer: {
    width: '100%',
    maxHeight: height * 0.5,
  },
  permissionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 24,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2c2c54',
  },
  permissionDescription: {
    fontSize: 13,
    color: '#6b6b83',
    lineHeight: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  checkbox: {
    marginRight: 12,
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#2c2c54',
    fontWeight: '600',
    flex: 1,
  },
  // Third Screen Styles
  welcomeTitle: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 3,
    opacity: 0.9,
    marginBottom: 5,
  },
  welcomeBrand: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  imageGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.95,
  },
  loginButton: {
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warningText: {
    marginTop: 15,
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    textAlign: 'center',
  },
  // Swiper Dots
  activeDot: {
    backgroundColor: '#fff',
    width: 30,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
  },
});