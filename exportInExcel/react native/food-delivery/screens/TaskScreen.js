import { useState } from 'react'
import { Text, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native'
import { addTask } from '../Redux/Action';
import { useDispatch } from 'react-redux';
export const TaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    const handlePress = () => {
        if (title.length === 0) {
            Alert.alert("Warning", "Please add title of your task")
        }
        else {
            const task = {
                id: new Date(),
                title: title,
                description: description
            }

            dispatch(addTask(task))
            
            navigation.navigate("Home")
        }
    }
    return (
        <View className="items-center justify-center h-full ">

            <TextInput
                className="border border-black  h-10 w-[90%] rounded-md text-center bg-white"
                placeholder='Enter your task Title'
                onChangeText={(value) => setTitle(value)}
            />
            <TextInput
                className="border border-black  h-10 w-[90%] rounded-md text-center bg-white mt-5"
                placeholder='Enter your task Description'
                multiline
                onChangeText={(value) => setDescription(value)}
            />
            <TouchableOpacity
                className="border border-black  h-10 w-[30%] text-center rounded-md flex items-center justify-center mt-5 bg-slate-200"
                onPress={handlePress}
            >
                <Text >Add Task</Text>
            </TouchableOpacity>
        </View>
    )
}
