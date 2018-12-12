import React from 'react';
import Tabs from './Tabs';
import {StyleSheet, View} from "react-native";
import VenueListScreen from "../Venues/VenueListScreen";
import ActiveTicketsScreen from "../Tickets/ActiveTicketsScreen";
import HistoryScreen from "../Tickets/HistoryScreen";
import {LinearGradient} from "expo";

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <LinearGradient style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }} colors={['#80d0c7', '#13547a']}>
        <View style={styles.container}>
          <Tabs>
            <View title="VENUES" style={styles.content}>
              <VenueListScreen navigation={this.props.navigation}/>
            </View>
            <View title="ACTIVE" style={styles.content}>
              <ActiveTicketsScreen navigation={this.props.navigation}/>
            </View>
            <View title="HISTORY" style={styles.content}>
              <HistoryScreen navigation={this.props.navigation}/>
            </View>
          </Tabs>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1,                            // Take up all screen
    backgroundColor: 'transparent',         // Background color
  },
  // Tab content container
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    backgroundColor: 'transparent',         // Darker background for content area
  },
});