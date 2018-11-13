import React from 'react';
import {Button, Text, View} from 'react-native';
import Styles from '../assets/Styles';
import LoginForm from "./LoginForm";

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
        {this.renderButton()}
      </View>
    );
  }

  renderButton() {
    return (
      <Button title={'Back'} style={Styles.buttonStyle} onPress={RegisterScreen.sendToLogin.bind(this)}/>
    );
  }

  static sendToLogin() {
    return (
      <LoginForm/>
    )
  }

}
