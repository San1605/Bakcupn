import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SQLite, openDatabase } from 'react-native-sqlite-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAge, setName, getData } from './redux/Action';

export default function Login({ navigation }) {
    // const [name, setName] = useState("");
    // const [age, setAge] = useState(12);
    const { name, age, cities } = useSelector((store) => store.userReducer)
    const dispatch = useDispatch()
    const onPressFunc = async () => {
        if (name.length == 0) {
            Alert.alert("Warning!", "please Enter your Name")
        }
        else {
            try {
                //  await AsyncStorage.setItem("Username", name);
                // await db.transaction(async (tx) => {
                //     await tx.executeSql(
                //         'INSERT INTO Users (Name Age) VAlUES ('" + name + "'," + age + ")'
                //     )

                //     await tx.executeSql(
                //         "INSERT INTO Users (Name,Age) VALUES (?,?)",
                //         [name, age]
                //     )
                // })
                navigation.navigate('Home')
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    console.log(  dispatch(getData()),"aaaaaaaaaaaaaaaa")

    useEffect(() => {
        dispatch(getData())
    }, [])

    // sql


    // const db = openDatabase({
    //     name: "mainDB",
    //     location: "default"
    // },
    //     () => { },
    //     (error) => { console.log(error) }
    // )


    // const createTable = () => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             "CREATE TABLE IF NOT EXISTS"
    //             + "USERS"
    //             + "(ID INTEGER PRIMARY KEY AUTOINCREMENT Name TEXT , Age INTEGER)"
    //         )
    //     })
    // }

    // useEffect(() => {
    //     createTable()
    // }, [])

    return (
        <View style={styles.body}>
            <Text style={styles.text}>Login page</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your Name'
                onChangeText={(value) => dispatch(setName(value))}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your Age'
                onChangeText={(value) => dispatch(setAge(value))}
            />
            <Button
                style={styles.button}
                title="Login"
                onPress={onPressFunc}
            />

            <Text>name is {name}</Text>
            <Text>age is {age}</Text>
{
    console.log(cities)
}
            <FlatList
            style={styles.list}
                data={cities}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item}</Text>
                    </View>
                )}                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        width: "100%",
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: "white",
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        height: "20%",
        width: "100%",
        backgroundColor: "aliceblue",
        display: 'flex',
        alignItems: 'center',
        margin: 10,
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
    },
    input: {
        borderWidth: 2,
        width: 250,
        backgroundColor: "#ffffff",
        height: 40,
        margin: 10,

    },
    button: {
        color: "#000000",
        width: 200,
        borderRadius: 12,
    },
    list:{
        borderWidth:2,
        borderColor:'black',
        width:300,

    }
});