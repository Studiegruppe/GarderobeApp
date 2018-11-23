import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
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

  static navigationOptions = {
    title: 'Settings',
  }

  // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
  }


  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>


        <Button title="Change Password" onPress={() => this.props.navigation.navigate('ChangePassword')}/>


        <Button title="Change Email" onPress={() => this.props.navigation.navigate('ChangePassword')}/>

        <Button title="Sign out" onPress={this.onSignoutPress}/>

      </ScrollView>
    );
  }

}





