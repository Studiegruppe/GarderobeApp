import React from 'react';
import Styles from "../../assets/Styles";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "react-native-underline-tabbar";
import ActiveOffersScreen from "./ActiveOffersScreen";
import ClaimedOffersScreen from "./ClaimedOffersScreen";

export default class OffersScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollableTabView
        style={Styles.scrollableTab}
        /*tabBarActiveTextColor="#5887F9"*/
        renderTabBar={() => <TabBar underlineColor="#5887F9"/>}>
        <ActiveOffersScreen tabLabel={{label: "ACTIVE"}} label="ACTIVE OFFERS"/>
        <ClaimedOffersScreen tabLabel={{label: "CLAIMED"}} label="CLAIMED OFFERS"/>
      </ScrollableTabView>
    );
  }
}

