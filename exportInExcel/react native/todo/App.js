import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, TextInput, SafeAreaView, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Login from './Login';
import Home from './Home';
import Done from './Done';
import { Task } from './Task';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Done' component={Done} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='HomeTab'
            component={HomeTabs}
          />
          <Stack.Screen
            name='Task'
            component={Task}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
