import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Login = ({navigation}) => {
  return (
    <View style={styles.view}>
    <Text>TODO APP</Text>
    <Button
        title="GO TO APP"
        onPress={
            () => navigation.navigate("HomeTab")
        }
    />
</View>
  )
}

export default Login

const styles = StyleSheet.create({
    view: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        height: "100%",
        width: "100%"

    }
})