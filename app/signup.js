import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'; 
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image } from 'expo-image'; 
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function SignUp() {

  const [getImage, setImage] = useState(null);
  const [getMobile, setMobile] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.background}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            <LinearGradient
              colors={['#ffffff', '#f0f4f8']}
              style={styles.imagePlaceholderContainer}
            >
              <View style={styles.imagePlaceholder}>
                {getImage ? (
                  <Image source={{ uri: getImage }} style={styles.profileImage} contentFit="cover" />
                ) : (
                  <Text style={styles.uploadText}>+</Text>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Upload Your Photo</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={setFirstName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={setLastName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          onChangeText={setMobile}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={async () => {
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
          }}>
          <LinearGradient colors={['#1e90ff', '#4285f4']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Sign Up Now</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.replace("/signin")}>
          <LinearGradient colors={['#1e90ff', '#4285f4']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Go To Sign In</Text>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  imagePlaceholder: {
    width: 110,
    height: 110,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  uploadText: {
    fontSize: 40,
    color: '#a9a9a9',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000', 
    marginBottom: 30,
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
