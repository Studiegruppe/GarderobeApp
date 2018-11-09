import React from 'react';
import {Text, View,} from 'react-native';
import Styles from "../assets/Styles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={Styles.containerStyle}>
        <Text> Dette er home screen bøsse</Text>
      </View>
    );
  }
}