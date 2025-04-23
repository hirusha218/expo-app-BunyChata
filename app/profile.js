import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const route = useRoute(); // Get route params
  const item = route.params; // Assuming user data is passed via route params
  const [avatarUri, setAvatarUri] = useState(null); // Store selected avatar URI
  const [isAIHelpEnabled, setIsAIHelpEnabled] = useState(false); // Toggle switch for AI Help
  const navigation = useNavigation(); // Navigation hook

  const [userName, setUresName] = useState(""); // Toggle

  // Load user info from AsyncStorage on mount
  useEffect(() => {
    const loadUserData = async () => {
      let userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        let user = JSON.parse(userJson);
        setAvatarUri(user.avatarUri || null); // Assuming user has an avatarUri property
        setUresName(user.first_name + " " + user.last_name); // Assuming user has a name property
      }
    };

    loadUserData();
  }, []);

  // Log out function to remove user data and navigate to the signup screen
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); // Clear user data
      navigation.replace('index'); // Redirect to SignupScreen
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Error logging out:", error);
      Alert.alert("Logout Error", "There was an issue logging you out. Please try again.");
    }
  };

  // Function to upload profile photo
  // const uploadPhoto = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }
  //   let pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1] });
  //   if (!pickerResult.cancelled) {
  //     const uri = pickerResult.uri;
  //     setAvatarUri(uri); // Set the avatar URI for preview
  //     let userJson = await AsyncStorage.getItem("user");
  //     let user = JSON.parse(userJson);

  //     const formData = new FormData();
  //     formData.append('AvatarImagesUpdate', {
  //       uri: uri,
  //       type: 'image/jpeg',
  //       name: 'profile.jpg',
  //     });
  //     let response = await fetch(
  //       process.env.EXPO_PUBLIC_URL + "/SmartChat/UpdateProfile",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     const responseData = await response.json();
  //     if (responseData.success) {
  //       Alert.alert("Success", "Your avatar has been uploaded successfully.");
  //     } else {
  //       Alert.alert("Error", "Failed to upload avatar. Please try again.");
  //     }

  //   }
  // };

  // Handle back button press
  const handleBackPress = () => {
    navigation.replace('home'); // Navigate to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <Image source={{ uri: setAvatarUri }} style={styles.avatar} />
          )}
          {/* Add icon for uploading a photo */}
          <TouchableOpacity style={styles.addIcon}>
            <Ionicons name="add" size={20} color="#007AFF" />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.profileName}>{userName}</Text>

      </View>

      {/* Status and Information Section */}
      <View style={styles.optionContainer}>
        <View style={styles.optionRow}>
          <Ionicons name="radio-button-off" size={24} color="#ffd700" />
          <Text style={styles.optionText}>Online Status</Text>
          <Text style={styles.optionValue}>Hidden</Text>
        </View>
        <View style={styles.optionRow}>
          <Ionicons name="globe-outline" size={24} color="#adff2f" />
          <Text style={styles.optionText}>User Page Address</Text>
          <Text style={styles.optionValue}>chatapp.com/{item ? item.firstname : "lastname"}</Text>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.optionContainer}>
        <View style={styles.optionRow}>
          <Ionicons name="lock-closed" size={24} color="#ff4500" />
          <Text style={styles.optionText}>Confidentiality</Text>
        </View>
        <View style={styles.optionRow}>
          <Ionicons name="volume-high-outline" size={24} color="#8a2be2" />
          <Text style={styles.optionText}>Sound and Notification</Text>
        </View>
      </View>

      {/* AI Help Section */}
      <View style={styles.aiHelpContainer}>
        <Ionicons name="help-circle-outline" size={24} color="#1e90ff" />
        <Text style={styles.optionText}>AI Help</Text>
        <Switch
          value={isAIHelpEnabled}
          onValueChange={() => setIsAIHelpEnabled(!isAIHelpEnabled)}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  optionValue: {
    fontSize: 16,
    color: '#888',
  },
  aiHelpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
