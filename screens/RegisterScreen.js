import React from 'react';
import {Text, View} from 'react-native';
import Styles from '../assets/Styles';

export default class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  static navigationOptions = {
    title: 'Please register',
  };

  render() {
    return (
      <View style={Styles.containerStyle}>
        <Text>
          Register Screen
        </Text>
      </View>
    );
  }
}
