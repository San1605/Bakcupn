import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';

export default function App() {
  // useEffect(()=>{

  // },[])
  //  const [name,setName] = useState("name");
  //  const [count,setCount] = useState(0);
  //  const [click , setClick] = useState(0);
  //  const OnClickHandler=()=>{
  //   setClick((prev)=>prev+1);
  //   setCount((prev)=>prev+5);

  //  }
  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>{name}</Text>
    //   <Text>no. of count{count}</Text>
    //   <Text>no. of clicks{click}</Text>
    //   <Button title='youtube' onPress={OnClickHandler}></Button>
    // </View>
    <View style={styles.view}>

      <View style={styles.view1Outer}>
        <View style={styles.view1}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>

      <View style={styles.view4Outer}>
        <View style={styles.view4}>
          <Text style={styles.text}>4</Text>
        </View>
      </View>
      <View style={styles.view5Outer}>
        <View style={styles.view5}>
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.view6Outer}>
        <View style={styles.view6}>
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text}>7</Text>
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    flex: 1,
    height: "100%",
    flexDirection: "column",
    width: "100%",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: "flex",
  },

  view1Outer: {
    height: '10%',
    flexDirection: "row",
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: "flex",
  },
  view1: {
    backgroundColor: "aliceblue",
    height: "100%",
    width: '20%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  view2: {
    backgroundColor: "pink",
    height: "100%",
    width: '30%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  view3: {
    backgroundColor: "yellow",
    height: "100%",
    width: '50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  view4Outer: {
    height: "10%",
    flexDirection: "row",
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: "flex",
  },

  view4: {
    backgroundColor: "red",
    height: "100%",
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  view5: {
    backgroundColor: "green",
    height: "100%",
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  view5Outer:{
    height: "10%",
    flexDirection: "row",
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: "flex",
  },
  view6Outer:{
    flex: 1,
    height: "70%",
    flexDirection: "row",
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: "flex",
  },
  view6: {
    backgroundColor: "white",
    height: "100%",
    width: '50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  view7: {
    backgroundColor: "blue",
    height: "100%",
    width: '50%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
  }
});

