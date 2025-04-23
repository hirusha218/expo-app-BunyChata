import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import Checkbox from 'expo-checkbox'; // Import the Expo Checkbox
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const navigation = useNavigation();
  
  // State to manage checkbox selection
  const [isChecked, setIsChecked] = useState(false);

  // useEffect should be called at the top level
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
  }, []); // Empty dependency array to only run once on mount

  const handleGetStarted = () => {
    // Check if the checkbox is selected before navigation
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
      activeDotStyle={{ backgroundColor: '#00A0FF' }}
      dotStyle={{ backgroundColor: '#ccc' }}
    >
      {/* First screen */}
      <View style={styles.screen}>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/Logo.gif')}
            style={styles.logoLarge}
          />
          <Text style={styles.appTitle}>BunnyChat</Text>
        </View>
      </View>

      {/* Second screen - Permissions */}
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Permissions Needed</Text>
          <Text style={styles.description}>
            These permissions are required for BunnyChat to work properly. See the description for each permission.
          </Text>

          <View style={styles.permissionCard}>
            <Text style={styles.permissionTitle}>Turn On Location Service</Text>
            <Text style={styles.permissionDescription}>
              Share your location in chats to coordinate with friends or find nearby contacts.
            </Text>
          </View>

          <View style={styles.permissionCard}>
            <Text style={styles.permissionTitle}>Bluetooth</Text>
            <Text style={styles.permissionDescription}>
              Enable Bluetooth to discover and connect with nearby BunnyChat users for faster sharing and syncing.
            </Text>
          </View>

          <View style={styles.permissionCard}>
            <Text style={styles.permissionTitle}>Enable GPS</Text>
            <Text style={styles.permissionDescription}>
              Use GPS to enhance location-based features like finding friends or sending live locations in chats.
            </Text>
          </View>

          <View style={styles.permissionCard}>
            <Text style={styles.permissionTitle}>Access Contacts</Text>
            <Text style={styles.permissionDescription}>
              Sync your contacts to find friends already on BunnyChat and invite others to join your chat.
            </Text>
          </View>

          <View style={styles.permissionCard}>
            <Text style={styles.permissionTitle}>Access Camera & Photos</Text>
            <Text style={styles.permissionDescription}>
              Capture photos or videos to share instantly in your chats, or upload images from your gallery.
            </Text>
          </View>

          {/* Add a checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>I understand and accept these permissions</Text>
          </View>
        </View>
      </View>

      {/* Third screen */}
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>WELCOME TO BUNNYCHAT</Text>

          <Image
            source={require('../assets/images/images.jpeg')}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.loginText}>Start Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoLarge: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c2c54',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b6b83',
    marginBottom: 20,
  },
  permissionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c2c54',
  },
  permissionDescription: {
    fontSize: 14,
    color: '#6b6b83',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#5F4BDB',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
});
