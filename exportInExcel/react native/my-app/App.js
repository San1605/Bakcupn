import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, TextInput, SafeAreaView, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import Login from './Login';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ tabBarBadge: 3 }} />

          <Stack.Screen
            name='Home'
            component={HomeScreen}
            initialParams={{ ItemNmae: "name" }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
