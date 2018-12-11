import React from 'react';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {ListItem} from 'react-native-elements';
import {Text, TextInput, StyleSheet, View, ActivityIndicator, ScrollView, FlatList,} from 'react-native';
import {Input, Icon, Button} from "react-native-elements";
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

  static navigationOptions = {
    header: null,
  };

  // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <LinearGradient style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }} colors={['#80d0c7', '#13547a']}>

        <View style={{flex: 1,}}>

            <View style={{flex: 1, marginBottom: 10, marginTop: 200}}>
              <Button title={"Change Password"} clear buttonStyle={Styles.SettingsButton}
                      onPress={() => this.props.navigation.navigate('ChangePassword')}
                      icon={<Icon name='vpn-key' color='white' size={25}/>}
              />
            </View>

            <View style={{flex: 1,marginBottom: 100}}>
              <Button title="Change Email"
                      clear buttonStyle={Styles.SettingsButton}
                      onPress={() => this.props.navigation.navigate('ChangeEmail')}
                      icon={<Icon name='email' color='white' size={25}/>}
              />
            </View>

            <View style={{flex: 1, marginBottom: 0,}}>
              <Button title="Sign out" onPress={this.onSignoutPress}
                      buttonStyle={Styles.SignoutButton}
                      icon={<Icon name='exit-to-app' color='white' size={25}/>}
              />
            </View>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});





