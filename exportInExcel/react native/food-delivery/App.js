import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { TaskScreen } from './screens/TaskScreen';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import DoneScreen from './screens/DoneScreen';
import DeletedScreen from './screens/DeletedScreen';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  <Tab.Navigator>
    <Tab.Screen name='Done' component={DoneScreen} />
    <Tab.Screen name='Deleted' component={DeletedScreen} />
  </Tab.Navigator>
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Task" component={TaskScreen} options={{ title: "Add Task Here" }} />
          <Stack.Screen name='HomeTabs' component={HomeTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
