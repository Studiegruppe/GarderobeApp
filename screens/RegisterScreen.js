import React from 'react';
import {Text, TextInput, StyleSheet, View, ActivityIndicator, ImageBackground} from 'react-native';
import Styles from '../assets/Styles';
import firebase from 'firebase';
import {Button, Input} from "react-native-elements";
import Icon from "react-native-elements/src/icons/Icon";


export default class RegisterScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({
      error: '',
      loading: true
    });


    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onSignUpSucces.bind(this))
      .catch(this.onSignUpFailed.bind(this));

  }

  onSignUpSucces() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    alert("Bruger er nu oprettet")
    this.setProfile();
  }

  onSignUpFailed(err) {
    this.setState({
      loading: false,
      error: err.message
    });

  }

  setProfile = () => {
    const ref = firebase.database().ref(`/Brugere/${firebase.auth().currentUser.uid}`);
    const obj = {

      Billetter: {
        Inaktive: {
          ignore: 'ignore'
        },
        Aktive: {
          ignore: 'ignore'
        }
      }
    };
    ref.set(obj)
  };


  render() {
    return (
      <ImageBackground
        style={Styles.backgroundImage}
        resizeMode='cover'
        source={require('../assets/images/grad-670x376.jpg')}>

        <View style={{flexDirection: 'row'}}>
          <Text style={Styles.travelTextReg}  titleStyle={{fontWeight: 800, fontSize: 40}}>SIGN UP</Text>

        </View>

        <Input
          leftIcon={
            <Icon
              name='email'
              color='rgba(171, 189, 219, 1)'
              size={25}
            />
          }
          style={Styles.loginInput}
          placeholder='Email'
          value={this.state.email}
          containerStyle={{marginBottom: 30}}
          onChangeText={email => this.setState({email})}
          inputStyle={{marginLeft: 10, color: 'white'}}
          keyboardAppearance="light"
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
          placeholder='Password'
          containerStyle={{marginBottom: 100}}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({password})}
          inputStyle={{marginLeft: 10, color: 'white'}}
          keyboardAppearance="light"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          placeholderTextColor="white"
        />

        <Button title={'Sign Up'} clear buttonStyle={Styles.buttonStyleReg}
                titleStyle={{fontWeight: 'bold', fontSize: 23}}
                onPress={this.onButtonPress.bind(this)}/>


      </ImageBackground>
    );
  }
}










