import React from 'react';
import Styles from "../assets/Styles";
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from "react-native-underline-tabbar";
import AktivScreen from '../screens/AktivScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CheckinScreen from '../screens/CheckinScreen';
import BarListScreen from "./BarListScreen";

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollableTabView
        style={Styles.scrollableTab}
        /*tabBarActiveTextColor="#5887F9"*/
        renderTabBar={() => <TabBar underlineColor="#5887F9" navigation={this.props.navigation}/>}>
        <BarListScreen navigation={this.props.navigation} tabLabel={{label: "BARS"}} label="BARS"/>
        <AktivScreen navigation={this.props.navigation} tabLabel={{label: "ACTIVE"}} label="ACTIVE"/>
        <HistoryScreen navigation={this.props.navigation} tabLabel={{label: "HISTORY"}} label="HISTORY"/>
        <CheckinScreen navigation={this.props.navigation} tabLabel={{label: "CHECKIN"}} label="CHECKIN"/>
      </ScrollableTabView>
    );
  }
}