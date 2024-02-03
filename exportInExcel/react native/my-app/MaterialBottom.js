import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, TextInput, SafeAreaView, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#f0f",
          inactiveTintColor: "#555",
          activeBackgroundColor: "#fff",
          inactiveBackgroundColor: "#999",
        }}
      >
        <Tab.Screen
          name='Screen_A'
          component={HomeScreen}
          // options={{ tabBarBadge: 3 }} 
          />

        <Tab.Screen
          name='Screen_B'
          component={AboutScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
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
  }
});