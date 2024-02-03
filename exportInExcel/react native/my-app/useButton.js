import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, TextInput, SafeAreaView, Alert, ToastAndroid } from 'react-native';

export default function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onPress = () => {
    if (name.length > 3) {
      setSubmitted(true);
    }
    else {
      Alert.alert('warning', 'the name must be longer than 3 characters', [
        {
          text: 'oK',

        }
      ])

      // ToastAndroid.show('the name must be longer than 3 characters ',
      // ToastAndroid.SHORT)
    }
  }
  return (

    <View style={styles.body}>
      <Text>
        please enter your name in the input
      </Text>
      <TextInput
        placeholder='enter your name'
        style={styles.input}
        onChangeText={(value) => setName(value)}
      />
      <Button title='submit' onPress={onPress} />
      {
        submitted ? (
          <Text>your name is {name}</Text>
        ) : null
      }
    </View>

    // </SafeAreaView>
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