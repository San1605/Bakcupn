import { Text, View } from "react-native"

const AboutScreen = ({route}) =>{
    const {ItemName,ItemNo} = route.params
    return(
<View>
    <Text>
        aboutscreen

    </Text>
    <Text>{ItemName}</Text>
</View>
    )
}
export default AboutScreen