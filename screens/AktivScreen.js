import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";





export default class AktivScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };

    render() {
        return (

            <View style={Styles.containerTab}>
                <Text style={Styles.welcomeTab}>
                    AKTIV
                </Text>
            </View>

        );
    }
}
