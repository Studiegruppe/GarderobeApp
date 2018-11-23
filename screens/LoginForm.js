import React from 'react';
import {
  ActivityIndicator, ImageBackground, StatusBar, Text, TextInput, TouchableWithoutFeedback,
  View,Keyboard
} from 'react-native';
import firebase from 'firebase';
import Styles from '../assets/Styles';
import globals from "../assets/Globals";
import Avatar from "react-native-elements/src/avatar/Avatar";
import {Button, Icon, Input} from "react-native-elements";



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
    header: null,
  };
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size={'small'}/>

    }
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

  render() {
    return (
      //nedenstående function gør at når man trykker på skærmen så forsvinder keyboardet.
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>



      <ImageBackground
        style={Styles.backgroundImage}
        resizeMode='cover'
       source={require('../assets/images/grad-670x376.jpg')}>

        <Input
              leftIcon={
                <Icon
                  name='email'
                  color='rgba(171, 189, 219, 1)'
                  size={25}
                />
              }
              style={Styles.loginInput}
              containerStyle={{marginVertical: 10}}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            inputStyle={{marginLeft: 10, color: 'white'}}
            keyboardAppearance="light"
            placeholder="E-mail"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTextColor="white"

          />
        <Input
          leftIcon={
            <Icon
              name='lock'
              color='rgba(171, 189, 219, 1)'
              size={25}
            />
          }
          style={Styles.loginInput}
          containerStyle={{marginVertical: 15}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          inputStyle={{marginLeft: 10, color: 'white'}}
          keyboardAppearance="light"
          placeholder="Password"
          secureTextEntry={true}
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          placeholderTextColor="white"

        />




          <Button title={'Sign in'} buttonStyle={Styles.buttonStyleLogin} titleStyle={{fontWeight: 'bold', fontSize: 23}} onPress={this.signIn.bind(this)}/>

          <Button title="Create Account" clear buttonStyle={Styles.buttonStyleText1}
                 titleStyle={{fontSize: 15}} onPress={() => this.props.navigation.navigate('Register')}/>
        <Button title="Forgot Password" clear buttonStyle={Styles.buttonStyleText2}
                titleStyle={{fontSize: 15}} onPress={() => this.props.navigation.navigate('ForgotPassword')}/>



      </ImageBackground>
      </TouchableWithoutFeedback>

    );
  }




}
