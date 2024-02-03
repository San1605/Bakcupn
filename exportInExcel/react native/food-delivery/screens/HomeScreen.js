import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

// import {UserIcon,ChevronDownIcon,SearchIcon,AdjustmentsIcon} from "react-native-heroicons/outline"
export default function HomeScreen({ navigation }) {
    // const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "header",
            headerShown: false
        })
    }, [])


    const { tasks } = useSelector(store => store.taskReducer)
    console.log(tasks, "taskss")
    return (
        <SafeAreaView className="h-screen w-screen" >
            <View className="h-12 bg-white w-screen mt-8 flex flex-row justify-between items-center  ">
                <Image
                    className="h-10 w-10 "
                    source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    }}
                />
                <Text className="text-xl">Notes App</Text>
                <Text>Filter Icon</Text>
            </View>


            <View className="h-[100%] w-screen flex items-center justify-center ">
                <FlatList
                   className="w-[90%] bg-white"
                    data={tasks}
                    renderItem={({ item }) =>
                        <View className="h-[50] w-[100%] bg-white mb-4 rounded-xl border border-black p-2" >
                            <Text className=" h-[100%]  ">{item.title}</Text>
                            {/* <Text>{item.description}</Text> */}
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </View>

            <TouchableOpacity
                onPress={()=>
                    
                    navigation.navigate("Task")}
                className="h-[50] w-[50] rounded-full  absolute bottom-0 right-0 border border-black flex items-center justify-center bg-black p-1"
            >
                <Text className="text-white text-3xl text-center m-auto">+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
