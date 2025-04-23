import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'; // Social Media Icons

export default function SignIn() {

  const [getPassword, setPassword] = useState("");
  const [getMobile, setMobile] = useState("");

  useEffect(() => {
    async function checkUserIn() {
      try {
        let userJson = await AsyncStorage.getItem("user");
        if (userJson !== null) {
          router.replace("/home");
        }
      } catch (e) {
        // handle error
      }
    }
    checkUserIn();
  }, []);

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.background}>
      <View style={styles.container}>
        <StatusBar hidden={true} />

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>We're always here, waiting for you!</Text>

        {/* Social Media Icons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Icon name="facebook" size={30} color="#4267B2" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="google" size={30} color="#DB4437" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="twitter" size={30} color="#1DA1F2" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType="numeric"
          placeholderTextColor="#999"
          onChangeText={setMobile}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button}
          onPress={async () => {
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
                  // Handle error
                }
              } else {
                Alert.alert("Error", json.message);
              }
            }
          }}
        >
          <LinearGradient colors={['#1e90ff', '#4285f4']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Sign In Now</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace("./signup")}>
          <LinearGradient colors={['#1e90ff', '#4285f4']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Create Account Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10,
  },
  subText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
