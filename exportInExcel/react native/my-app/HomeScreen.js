import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { SQLite, openDatabase } from 'react-native-sqlite-storage';
const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    useEffect(() => {
        getData()
    }, [])

    const db = openDatabase({
        name: "mainDB",
        location: "default"
    },
        () => { },
        (error) => { console.log(error) })


    const getData = async () => {
        try {
            //  AsyncStorage.getItem("Username").then((value)=>{
            //     if(value!=null){
            //         setName(value)
            //     }
            //  }) 
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "SELECT Name ,Age FROM USers",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item[0].Name;
                            var userAge = results.rows.item[0].Age;
                            setName(userName)
                        }
                    }
                )
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <Text>Welcome {name} !</Text>
            <Button
                title="Go to Login Page"
                onPress={() => {
                    navigation.navigate('Login', { ItemNo: 1, ItemName: "ItemName" })
                }}
            />
        </View>
    )
}
export default HomeScreen 