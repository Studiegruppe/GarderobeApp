import React from 'react';
import {ActivityIndicator, Button, Text, TextInput, View} from 'react-native';
import firebase from 'firebase';
import Styles from '../assets/Styles';
import globals from "../assets/Globals";

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  static navigationOptions = {
    title: 'Please log in',
  };

  render() {
    return (
      <View style={Styles.containerStyle}>
        <TextInput
          style={Styles.inputStyle}
          label={'Username'}
          placeholder={'User@mail.com'}
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          label={'Password'}
          placeholder={'password'}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({password})}
        />
        <Text style={Styles.errorStyle}>
          {this.state.error}
        </Text>
        {this.renderButton()}
      </View>
    );
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size={'small'}/>
    }
    return (
      <Button title={'Sign in'} style={Styles.buttonStyle} onPress={this.signIn.bind(this)}/>
    );
  }

  async signIn() {
    const {email, password} = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onSignInSuccess.bind(this))
      .catch(this.onSignInFailed.bind(this));
  }

  onSignInSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
    globals.uid = firebase.auth().currentUser.uid;
    alert("User signed in successfully");
  }

  onSignInFailed(error) {
    this.setState({
      loading: false,
      error: error.message,
    })
  }
}
