import React from 'react';
import {
  ActivityIndicator, ImageBackground, StatusBar, Text, TextInput, TouchableWithoutFeedback,
  View,Keyboard
} from 'react-native';
import Orientation from "react-native-orientation";
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import globals from "../../assets/Globals";
import Avatar from "react-native-elements/src/avatar/Avatar";
import {Button, Icon, Input} from "react-native-elements";
import {LinearGradient} from "expo";



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
        <LinearGradient  style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }} colors={['#e53935', '#e35d5b'] }>

        <Input
              leftIcon={
                <Icon
                  name='email'
                  color='white'
                  size={25}
                />
              }

              containerStyle={{marginTop: 320, alignSelf: 'center', justifyContent: 'space-between'}}
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
              color='white'
              size={25}
            />
          }

          containerStyle={{marginBottom: 150, alignSelf: 'center', justifyContent: 'space-between'}}
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



<View>

          <Button title={'Sign in'} clear  buttonStyle={Styles.buttonStyleLogin} titleStyle={{fontWeight: 'bold', fontSize: 23}} onPress={this.signIn.bind(this)}/>

          <Button title="Create Account" clear buttonStyle={Styles.buttonStyleText1}
                 titleStyle={{fontSize: 15}} onPress={() => this.props.navigation.navigate('Register')}/>
        <Button title="Forgot Password?" clear buttonStyle={Styles.buttonStyleText2}
                titleStyle={{fontSize: 15}} onPress={() => this.props.navigation.navigate('ForgotPassword')}/>
</View>


        </LinearGradient>
      </TouchableWithoutFeedback>

    );
  }




}
