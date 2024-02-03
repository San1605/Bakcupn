import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Home = ({ navigation }) => {
    const { tasks } = useSelector((store) => store.taskReducer);
    const dispatch = useDispatch();
    console.log(tasks, "tasksss")
    return (
        <View style={styles.body}>
            {/* <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.taskItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc}>{item.desc}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            /> */}

            <TouchableOpacity
                title="button"
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Task")
                }}
            >
            </TouchableOpacity>
        </View>
    )
}
export default Home


const styles = StyleSheet.create({
    body: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        height: "100%",
        width: "100%"

    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#0080FF",
        justifyContent: "center",
        alignItems: 'center',
        position: "absolute",
        bottom: 10,
        right: 10,
        elevation: 5
    },
    taskItem: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 16,
        marginTop: 8,
    },
})