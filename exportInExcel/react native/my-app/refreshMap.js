import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl } from 'react-native';

export default function App() {
  const [item, setItem] = useState(
    [{
      item: 1,
      key: 1
    },
    {
      item: 2,
      key: 2
    },
    {
      item: 3,
      key: 3,
    },
    {
      item: 4,
      key: 4
    },
    {
      item: 5,
      key: 5
    },
    {
      item: 6,
      key: 6
    },
    {
      item: 7,
      key: 7
    },
    {
      item: 8,
      key: 8
    },
    {
      item: 9,
      key: 9
    },]
  )

  const [refreshing,setRefreshing] = useState(false);
  const onRefresh=()=>{
    setRefreshing(true)
    setItem([...item,{key:10,item:10}])
    setRefreshing(false)
  }
  return (

    <ScrollView style={styles.body}
    
    refreshControl={
      <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}/>
    }>
      {
        item?.map((i, key) => (
          <View style={styles.view} key={i.key}>
            <Text style={styles.text}>{i.item}</Text>
          </View>
        ))
      }
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  body: {
    height:'100%',
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:'black',
  },
  view: {
    // flex:1,
    height: "20%",
    width: "100%",
    backgroundColor: "aliceblue",
    display: 'flex',
    alignItems: 'center',
    margin:10,
    justifyContent: "center",

  },

  text: {
    fontSize: 20,
  },

});

