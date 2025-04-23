import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from 'expo-router';

export default function Chat() {
    const item = useLocalSearchParams();
    const [getChatArray, setChatArray] = useState([]);
    const [getChatText, setChatText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [replyToMessage, setReplyToMessage] = useState(null);

    useEffect(() => {
        fetchChatArray();
    }, []);

    async function fetchChatArray() {
        let userJson = await AsyncStorage.getItem("user");
        let user = JSON.parse(userJson);

        let response = await fetch(process.env.EXPO_PUBLIC_URL + "/SmartChat/LoadChat?logged_user_id=" + user.id + "&other_user_id=" + item.other_user_id);
        if (response.ok) {
            let chatArray = await response.json();
            setChatArray(chatArray);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            Alert.alert("Permission denied", "You need to allow access to your photos.");
            return;
        }

        let imageResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!imageResult.canceled) {
            setSelectedImage(imageResult.assets[0].uri);
        }
    };

    const deleteChat = async (chatId) => {
        try {
            let response = await fetch(process.env.EXPO_PUBLIC_URL + "/SmartChat/DeleteChat?id=" + chatId);

            if (response.ok) {
                Alert.alert("Success", "Chat deleted successfully.");
                fetchChatArray();
            } else {
                Alert.alert("Error", "Failed to delete chat.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An error occurred.");
        }
    };
    const confirmDeleteChat = (chatId) => {
        Alert.alert(
            "Delete Chat",
            "Are you sure you want to delete this chat message?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteChat(chatId), style: "destructive" },
            ],
            { cancelable: true }
        );
    };

    const handleReply = (message) => {
        setReplyToMessage(message);
        setChatText(``); // Clear input for a fresh message
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.push("/")}>
                    <View style={styles.avatarContainer}>
                        {
                            item.avatar_image_found == "true" ?
                                <Image source={{ uri: process.env.EXPO_PUBLIC_URL + "/SmartChat/AvatarImages/" + item.other_user_mobile + ".png" }} style={styles.avatar} /> :
                                <Text style={styles.avatarText}>{item.other_user_avatar_letters}</Text>
                        }
                    </View>
                </Pressable>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.userName}>{item.other_user_name}</Text>
                    <Text style={styles.userStatus}>{item.other_user_status == 1 ? "Online" : "Offline"}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="videocam" size={24} color="black" />
                    <FontAwesome name="phone" size={20} color="black" style={styles.icon} />
                    <FontAwesome name="ellipsis-v" size={20} color="black" style={styles.icon} />
                </View>
            </View>

            {/* Chat Content */}
            <View style={styles.container1}>
            <FlashList
                    data={getChatArray}
                    renderItem={({ item }) => (
                        <Pressable onLongPress={() => confirmDeleteChat(item.id)} onPress={() => handleReply(item)}>
                            <View style={item.side === "right" ? styles.chatBubbleRight : styles.chatBubbleLeft}>
                                
                                {/* Reply Section */}
                                {item.replyToMessage && (
                                    <View style={styles.replyMessageContainer}>
                                        <View style={styles.replyBorder} />
                                        <View>
                                            <Text style={styles.replyUserName}>{item.replyToMessage.user_name}</Text>
                                            <Text style={styles.replyText} numberOfLines={1} ellipsizeMode="tail">
                                                {item.replyToMessage.message}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                {/* Actual Chat Message */}
                                <Text style={styles.chatMessage}>{item.message}</Text>
                                
                                {/* Message Info */}
                                <View style={styles.messageInfo}>
                                    <Text style={styles.messageTime}>{item.dateTime}</Text>
                                    {item.side === "right" && (
                                        <FontAwesome name="check" color={item.status === 1 ? "green" : "gray"} size={12} />
                                    )}
                                </View>
                            </View>
                        </Pressable>
                    )}
                    estimatedItemSize={100}
                />

                {replyToMessage && (
                    <View style={styles.replyMessageContainer}>
                        <View style={styles.replyBorder}>
                            <Text style={styles.replyUserName}>{item.other_user_name}</Text>
                            <Text style={styles.replyText}>{replyToMessage.message}</Text>
                        </View>
                        <Pressable onPress={() => setReplyToMessage(null)} style={styles.closeReply}>
                            <FontAwesome name="times" size={16} color="gray" />
                        </Pressable>
                    </View>
                )}
            </View>

            {/* Image preview */}
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            )}

            {/* Input Bar */}
            <View style={styles.inputContainer}>
                <Pressable onPress={pickImage} style={styles.iconButton}>
                    <FontAwesome name="paperclip" size={24} color="gray" />
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#888"
                    value={getChatText}
                    onChangeText={setChatText}
                />
                <Pressable style={styles.sendButton} onPress={async () => {
                    let userJson = await AsyncStorage.getItem("user");
                    let user = JSON.parse(userJson);
                    let response = await fetch(process.env.EXPO_PUBLIC_URL + "/SmartChat/SendChat?logged_user_id=" + user.id + "&other_user_id=" + item.other_user_id + "&message=" + getChatText + (replyToMessage ? `&reply_to=${replyToMessage.id}` : ''));
                    if (response.ok) {
                        let json = await response.json();
                        if (json.success) {
                            setChatText("");
                            setReplyToMessage(null); // Clear reply after sending
                            
                            fetchChatArray();
                        }
                    }
                }}>
                    <FontAwesome name="paper-plane" color="white" size={20} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container1: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarText: {
        fontSize: 24,
        color: '#000',
    },
    headerTextContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    userStatus: {
        fontSize: 14,
        color: '#888',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 20,
    },
    chatBubbleLeft: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        alignSelf: 'flex-start',
        maxWidth: '75%',
    },
    chatBubbleRight: {
        backgroundColor: '#DCF8C6',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        alignSelf: 'flex-end',
        maxWidth: '75%',
    },
    chatMessage: {
        fontSize: 16,
        color: '#333',
    },
    messageInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    messageTime: {
        fontSize: 12,
        color: '#888',
    },
    replyMessageContainer: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        padding: 5,
        marginVertical: 5,
        borderRadius: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#34B7F1',
    },
    replyUserName: {
        fontWeight: 'bold',
        color: '#333',
    },
    replyText: {
        fontSize: 14,
        color: '#555',
    },
    replyBorder: {
        flex: 1,
    },
    closeReply: {
        justifyContent: 'center',
        padding: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    iconButton: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#F0F0F0',
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#34B7F1',
        borderRadius: 20,
        padding: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 10,
    },

});
