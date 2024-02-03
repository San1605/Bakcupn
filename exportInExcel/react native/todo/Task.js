import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setTaskId, setTasks } from './redux/action'

export const Task = ({navigation}) => {
    const [title, setTitle] = useState("")
    const [desc, setdesc] = useState("")
    const { tasks, taskID } = useSelector((store) => store.taskReducer);
    const dispatch = useDispatch();

    const saveTask = () => {
        if (title.length === 0) {
            Alert.alert("Warning", 'Please write your task title')
        }
        else {
            try {
                var taskObj = {
                    id: taskID,
                    title: title,
                    desc: desc
                }
                let newTask = [...tasks, taskObj];
                 dispatch(setTasks(newTask));
                 Alert.alert("Success","Task saved Successfuly")
                 navigation.goBack()

            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.body}>
            <Text>
                task
            </Text>
            <TextInput
                // value={title}
                style={styles.input}
                placeholder='Title'
                onChange={(value) => setTitle(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Description'
                onChange={(value) => setdesc(value)}
                // multiline
            />
            <Button
                title="Save Task"
                onPress={saveTask}
                style={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 10,
        backgroundColor: "#ffffff",
        textAlign: "left",
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
        height: 45,

    }
    ,
    button: {
        width: "100%",
        height: 60,
        color: "#1eb900"
    }
})