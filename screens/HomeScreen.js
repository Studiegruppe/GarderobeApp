import React from 'react';
import {Text, View,} from 'react-native';
import Styles from "../assets/Styles";
import {Button} from "react-native-elements";
import firebase from 'firebase';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from "react-native-underline-tabbar";
import AktivScreen from '../screens/AktivScreen';
import HistoryScreen from '../screens/HistoryScreen';
import OfferScreen from '../screens/OfferScreen';
import CheckinScreen from '../screens/CheckinScreen';


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
      <View style={[Styles.containerTab, {paddingTop: 40}]}>
        <ScrollableTabView
          /*tabBarActiveTextColor="#5887F9"*/
          renderTabBar={() => <TabBar underlineColor="#5887F9"/>}>
          <AktivScreen tabLabel={{label: "ACTIVE"}} label="ACTIVE"/>
          <HistoryScreen tabLabel={{label: "HISTORY"}} label="HISTORY"/>
          <OfferScreen tabLabel={{label: "OFFERS"}} label="OFFERS"/>
          <CheckinScreen tabLabel={{label: "CHECKIN"}} label="CHECKIN"/>
        </ScrollableTabView>
        {this.renderLogOutButton()}
      </View>
    );
  }
}