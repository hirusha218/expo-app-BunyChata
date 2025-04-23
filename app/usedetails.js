import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }} // Replace with your profile image URL
          style={styles.profilePicture}
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Name Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>Radha</Text>
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.label}>About</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>Business Account</Text>
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phone Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Phone</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>+91 9129 😘😘😘😘</Text>
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#25D366', // Green border color
  },
  cameraButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#25D366',
    borderRadius: 20,
    padding: 5,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});
