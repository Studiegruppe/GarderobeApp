import React from 'react';
import {ActivityIndicator, Image, ImageBackground, Text, TextInput, View} from 'react-native';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {Button, Icon, Input} from "react-native-elements";
import {LinearGradient} from "expo";

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
      <LinearGradient  style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }} colors={['#80d0c7', '#13547a']}>

          <View>
            <Image
              style={{width: 150, height: 150, left: 6, right: 6, marginTop: 110, alignSelf:'center'}}
              source={require('../../assets/images/send_reset_password.png')}
            />

          </View>

            <Text style={Styles.travelText}  titleStyle={{fontWeight: 'bold', letterSpacing: 50, }}>Forgot your password? </Text>



          <Input
          leftIcon={
            <Icon
              name='email'
              color='white'
              size={25}
            />
          }

          value={this.state.email}
          onChangeText={(text) => {this.setState({email: text})}}
                   placeholder="E-mail"
                   keyboardType="email-address"
                   autoCapitalize="none"
                   autoCorrect={false}
          containerStyle={{alignSelf: 'center', marginBottom: 35}}
          inputStyle={{marginLeft: 10, color: 'white'}}
          placeholderTextColor="white"


        />
      <View>
          <Button title={'Send Password'} buttonStyle={Styles.buttonStyleForgot} titleStyle={{fontWeight: 'bold', fontSize: 23}}
                  onPress={this.onResetPasswordPress.bind(this)}/>
      </View>
      </LinearGradient>



    )
  }
}