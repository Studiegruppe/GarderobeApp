import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import firebase from 'firebase';
import Styles from '../assets/Styles';
import { ListItem } from 'react-native-elements';
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

  // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateAndRetrieveDataWithCredential(credential);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    console.log("hej")
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
  }

  // Changes user's email...
  onChangeEmailPress = () => {

    var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        alert("Email was changed");
      }).catch((error) => { console.log(error.message); });

  }

  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>

        <TextInput style={styles.textInput} value={this.state.currentPassword}
                   placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
                   onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />

        <TextInput style={styles.textInput} value={this.state.newPassword}
                   placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
                   onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <Button title="Change Password" onPress={this.onChangePasswordPress} />

        <TextInput style={styles.textInput} value={this.state.newEmail}
                   placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
                   onChangeText={(text) => { this.setState({newEmail: text}) }}
        />

        <Button title="Change Email" onPress={this.onChangeEmailPress} />

        <Button title="Sign out" onPress={this.onSignoutPress} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
});


