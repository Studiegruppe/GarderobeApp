import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {
	Text, TextInput, StyleSheet, View, ActivityIndicator, ScrollView,
	TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {Input, Icon,Button} from "react-native-elements";
import {LinearGradient} from "expo";




export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }
  // Reauthenticates the current user and returns a promise
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateAndRetrieveDataWithCredential(credential);
  }

// Changes user's email
  onChangeEmailPress = () => {
    var user = firebase.auth().currentUser;
    user.updateEmail(this.state.newEmail).then(() => {
      if (alert("Email was changed")){
        console.log("hej")
        this.props.navigation.goBack()
      }
    }).catch((error) => { console.log(error.message); });



  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient  style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
				}} colors={[ '#F2F2F2', '#F2F2F2'] }>

          <Input
            leftIcon={
              <Icon
                name='email'
                color='grey'
                size={25}
              />
						}

            containerStyle={{marginTop: 220, alignSelf: 'center', justifyContent: 'space-between'}}
            onChangeText={newEmail => this.setState({newEmail})}
            value={this.state.newEmail}
            inputStyle={{marginLeft: 10, color: 'grey'}}
            keyboardAppearance="light"
            placeholder="Ny email"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTextColor="grey"

          />

          <View>
            <Button title="Change Email" clear buttonStyle={Styles.ButtonChangeEmail}  titleStyle={{fontWeight: 'bold', fontSize: 23, color: 'grey'}} onPress={this.onChangeEmailPress()} />
          </View>

        </LinearGradient>
      </TouchableWithoutFeedback>

		);
	}

}


