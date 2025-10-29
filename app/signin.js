import { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Animated floating object component
const FloatingObject = ({ delay, duration, icon, size, color }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateFloat = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -30,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: 20,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: -20,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    setTimeout(() => {
      animateFloat();
    }, delay);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        opacity: opacity,
        transform: [{ translateY }, { translateX }],
      }}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Animated.View>
  );
};

export default function SignIn() {
  const [getPassword, setPassword] = useState("");
  const [getMobile, setMobile] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function checkUserIn() {
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson !== null) {
          router.replace("/home");
        }
      } catch (e) {
        console.error(e);
      }
    }
    checkUserIn();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignIn = async () => {
    if (!getMobile || !getPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      let response = await fetch(
        process.env.EXPO_PUBLIC_URL + "/SmartChat/SignIn",
        {
          method: "POST",
          body: JSON.stringify({
            mobile: getMobile,
            password: getPassword,
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        let json = await response.json();

        if (json.success) {
          let user = json.user;
          Alert.alert("Success", "Hi " + user.first_name + ", " + json.message);

          try {
            await AsyncStorage.setItem("user", JSON.stringify(user));
            router.replace("/home");
          } catch (e) {
            console.error(e);
          }
        } else {
          Alert.alert("Error", json.message);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2', '#f093fb']} style={styles.background}>
      <StatusBar style="light" />
      
      {/* Animated Background Objects */}
      <View style={styles.floatingContainer}>
        <View style={[styles.objectPosition, { top: '10%', left: '10%' }]}>
          <FloatingObject delay={0} duration={3000} icon="chatbubble-ellipses" size={60} color="rgba(255,255,255,0.15)" />
        </View>
        <View style={[styles.objectPosition, { top: '20%', right: '15%' }]}>
          <FloatingObject delay={500} duration={4000} icon="heart" size={40} color="rgba(255,255,255,0.12)" />
        </View>
        <View style={[styles.objectPosition, { top: '40%', left: '5%' }]}>
          <FloatingObject delay={1000} duration={3500} icon="send" size={50} color="rgba(255,255,255,0.1)" />
        </View>
        <View style={[styles.objectPosition, { top: '60%', right: '10%' }]}>
          <FloatingObject delay={1500} duration={4500} icon="notifications" size={45} color="rgba(255,255,255,0.13)" />
        </View>
        <View style={[styles.objectPosition, { top: '75%', left: '15%' }]}>
          <FloatingObject delay={2000} duration={3800} icon="people" size={55} color="rgba(255,255,255,0.11)" />
        </View>
        <View style={[styles.objectPosition, { top: '30%', right: '5%' }]}>
          <FloatingObject delay={800} duration={4200} icon="star" size={35} color="rgba(255,255,255,0.14)" />
        </View>
      </View>

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Logo/Icon Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="chatbubbles" size={50} color="#fff" />
          </View>
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Sign in to continue your conversations</Text>

        {/* Social Media Login */}
        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or sign in with</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="phone-portrait-outline" size={20} color="#667eea" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="numeric"
              placeholderTextColor="#999"
              onChangeText={setMobile}
              value={getMobile}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#667eea" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={getPassword}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSignIn}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <LinearGradient 
            colors={['#667eea', '#764ba2']} 
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
            {!isLoading && <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />}
          </LinearGradient>
        </TouchableOpacity>

        {/* Create Account Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("./signup")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  floatingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  objectPosition: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 30,
    fontWeight: '400',
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  socialText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  forgotText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
  },
  signupLink: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});