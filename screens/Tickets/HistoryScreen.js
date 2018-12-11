import {Text, View} from "react-native";
import React from "react";
import Styles from "../../assets/Styles";
import {LinearGradient} from "expo";


export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return (
      <LinearGradient style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }} colors={['#80d0c7', '#13547a']}>

        <View style={Styles.scrollableTab}>
          <Text style={Styles.welcomeTab}>
            HISTORY
          </Text>
        </View>

      </LinearGradient>

    );
  }
}
