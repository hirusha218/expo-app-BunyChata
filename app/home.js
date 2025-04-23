import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from '@react-navigation/native'; // Add for navigation
import { router } from "expo-router";

const Home = () => {
    const [getChatArray, setChatArray] = useState([]);
    const navigation = useNavigation(); // Hook for navigation
    const [searchQuery, setSearchQuery] = useState(""); // State to manage the search query
    const [isSearching, setIsSearching] = useState(false);
    const [filteredChatArray, setFilteredChatArray] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                let userJson = await AsyncStorage.getItem("user");
                let user = JSON.parse(userJson);


                let response = await fetch(process.env.EXPO_PUBLIC_URL + "/SmartChat/LoadHomeData?id=" + user.id);

                if (response.ok) {
                    let json = await response.json();
                    if (json.success) {
                        // console.log("Chat dateTime values:", json.jsonChatArray.map(chat => chat.dateTime));
                        const sortedChatArray = json.jsonChatArray.sort((a, b) => {
                            const dateA = new Date(a.dateTime);
                            const dateB = new Date(b.dateTime);

                            // Handle invalid dates
                            if (isNaN(dateA)) return 1;
                            if (isNaN(dateB)) return -1;

                            return dateB - dateA; // Sort in descending order
                        });
                        setChatArray(sortedChatArray);
                    } else {
                        console.log("API returned success: false");
                    }
                } else {
                    console.log("Error fetching data:", response.status);
                }
            } catch (err) {
                console.log("Error occurred:", err);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        // Filter the chat list based on the search query
        if (searchQuery == "") {
            setFilteredChatArray(getChatArray);
        } else {
            const filtered = getChatArray.filter(chat =>
                chat.other_user_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredChatArray(filtered);
        }
    }, [searchQuery, getChatArray]);

    return (
        <View style={styles.container}>
            {/* Top Header with Icons */}
            <View style={styles.header}>
                {isSearching ? (
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#000"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus

                    />
                ) : (
                    <Text style={styles.title}>BunnyChat</Text>
                )}

                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => setIsSearching(!isSearching)}>
                        <Ionicons name={isSearching ? "close-outline" : "search-outline"} size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/profile")}>
                        <MaterialIcons name="more-vert" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable content */}
            <View style={styles.container1}>
                <FlashList
                    data={filteredChatArray}
                    renderItem={({ item }) =>
                        <Pressable style={styles.chatItem} onPress={() => {
                            router.push({
                                pathname: "/chat",
                                params: item
                            });

                        }}>
                            <View style={styles.avatarPlaceholder} >
                                {
                                    item.avatar_image_found ?
                                        <Image source={{ uri: process.env.EXPO_PUBLIC_URL + "/SmartChat/AvatarImages/" + item.other_user_mobile + ".png" }}
                                            contentFit="contain"
                                            style={styles.avatar} /> :

                                        <Text style={styles.avatarText}>{item.other_user_avatar_letters}</Text>
                                }
                            </View>
                            <View style={styles.chatInfo}>
                                <Text style={styles.name}>{item.other_user_name}</Text>
                                <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
                                <View style={styles.chatDetails}>
                                    <Text style={styles.time}>{item.dateTime}</Text>
                                    <FontAwesome name="check" color={item.chat_status_id == 1 ? "green" : "white"} size={10} />
                                </View>
                            </View>
                        </Pressable>
                    }
                    estimatedItemSize={200}
                />
            </View>

            {/* Navigation Bar */}
            <View style={styles.navigationBar}>
                <Pressable style={styles.navItem} >
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                    <Text style={styles.navText}>Chats</Text>
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => router.replace("/updates")}>
                    <Ionicons name="time-outline" size={24} color="black" />
                    <Text style={styles.navText}>Updates</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Ionicons name="people-outline" size={24} color="black" />
                    <Text style={styles.navText}>Communities</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Ionicons name="call-outline" size={24} color="black" />
                    <Text style={styles.navText}>Calls</Text>
                </Pressable>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    container1: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5'
    },
    title: {
        color: '#1f1f1f',
        fontSize: 22,
        fontWeight: 'bold'
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1f1f1f',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    avatarPlaceholderActive: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#25D366',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    icons: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between',
        columnGap: 13
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        paddingVertical: 10
    },
    navText: {
        color: '#1f1f1f',
        fontSize: 16
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1f1f1f'
    },
    image1: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    chatInfo: {
        flex: 1
    },
    name: {
        color: '#1f1f1f',
        fontSize: 16,
        fontWeight: 'bold'
    },
    message: {
        color: '#1f1f1f',
        fontSize: 14
    },
    chatDetails: {
        alignItems: 'flex-end'
    },
    time: {
        color: '#1f1f1f',
        fontSize: 12
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarText: {
        fontSize: 24,
        color: '#F5F5F5',
    },

    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#F5F5F5',
        color: '1f1f1f',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});

export default Home;
