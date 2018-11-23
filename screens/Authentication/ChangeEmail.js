import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {Text, TextInput, StyleSheet, View, ActivityIndicator, Button, ScrollView} from 'react-native';



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
      <ScrollView>
        <TextInput style={styles.textInput} value={this.state.newEmail}
                   placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
                   onChangeText={(text) => { this.setState({newEmail: text}) }}
        />

        <Button title="Change Email" onPress={this.onChangeEmailPress} />
      </ScrollView>
    );
  }
}


