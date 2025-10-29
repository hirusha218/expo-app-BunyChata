import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";


const updates = () => {


    return (
        <View style={styles.container}>
            {/* Top Header with Icons */}
            <View style={styles.header}>
                <Text style={styles.title}>Updates</Text>
                <View style={styles.icons}>
                    <TouchableOpacity>
                        <Ionicons name="camera-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/profile")}>
                        <MaterialIcons name="more-vert" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable content */}
            <View style={styles.container1}>
            
            </View>

            {/* Navigation Bar */}
            <View style={styles.navigationBar}>
                <Pressable style={styles.navItem}  onPress={()=>router.replace("/home")}>
                    <Ionicons name="chatbubble-outline" size={24} color="white" />
                    <Text style={styles.navText}>Chats</Text>
                </Pressable>
                <Pressable style={styles.navItem}  onPress={() => router.replace("/updates")}>
                    <Ionicons name="time-outline" size={24} color="white" />
                    <Text style={styles.navText}>Updates</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Ionicons name="people-outline" size={24} color="white" />
                    <Text style={styles.navText}>Communities</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Ionicons name="call-outline" size={24} color="white" />
                    <Text style={styles.navText}>Calls</Text>
                </Pressable>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    container1: { flex: 1, backgroundColor: '#121212', padding: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1f1f1f' },
    title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2a2a2a', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    avatarPlaceholderActive: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#25D366', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    icons: { flexDirection: 'row', width: 80, justifyContent: 'space-between', columnGap: 13 },
    navigationBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#1f1f1f', paddingVertical: 10 },
    navText: { color: 'white', fontSize: 16 },
    chatItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1f1f1f' },
    image1: { width: 50, height: 50, borderRadius: 25 },
    chatInfo: { flex: 1 },
    name: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    message: { color: '#888', fontSize: 14 },
    chatDetails: { alignItems: 'flex-end' },
    time: { color: '#888', fontSize: 12 },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default updates;
