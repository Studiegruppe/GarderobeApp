import React from 'react';
import {ActivityIndicator, Image, ImageBackground, Text, TextInput, View} from 'react-native';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {Button, Icon, Input} from "react-native-elements";

export default class ForgotPassword extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  onResetPasswordPress = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert("Password reset email has been sent.");
      }, (error) => {
        alert(error.message);
      })

  };


  render() {
    return (

        <ImageBackground
          style={Styles.backgroundImage}
          resizeMode='cover'
          source={require('../../assets/images/grad-670x376.jpg')}>

          <View>
            <Image
              style={{width: 150, height: 150, left: 6, right: 6, marginBottom: 0}}
              source={require('../../assets/images/send_reset_password.png')}
            />

          </View>

            <Text style={Styles.travelText}  titleStyle={{fontWeight: 'bold', letterSpacing: 50, }}>Forgot your password? </Text>



          <Input
          leftIcon={
            <Icon
              name='email'
              color='rgba(171, 189, 219, 1)'
              size={25}
            />
          }
          style={Styles.loginInput}
          value={this.state.email}
          onChangeText={(text) => {this.setState({email: text})}}
                   placeholder="E-mail"
                   keyboardType="email-address"
                   autoCapitalize="none"
                   autoCorrect={false}
          containerStyle={{marginBottom: 35}}
          inputStyle={{marginLeft: 10, color: 'white'}}
          placeholderTextColor="white"


        />

          <Button title={'Send Password'} buttonStyle={Styles.buttonStyleForgot} titleStyle={{fontWeight: 'bold', fontSize: 23}}
                  onPress={this.onResetPasswordPress.bind(this)}/>



        </ImageBackground>

    )
  }
}