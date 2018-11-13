import React from 'react';
import {Text, View,} from 'react-native';
import Styles from "../assets/Styles";
import {Button} from "react-native-elements";
import firebase from 'firebase';

const debug = true;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      debug && console.log("LOGGED OUT");
    } catch (e) {
      debug && console.log(e);
    }
  };

  renderLogOutButton() {
    return (
      <Button title="logout" onPress={() => this.signOutUser()}/>
    )
  }

  render() {
    return (
      <View style={Styles.containerStyle}>
        <Text> Dette er home screen bøsse</Text>
        {this.renderLogOutButton()}
      </View>
    );
  }
}