import React from 'react';
import Styles from "../../assets/Styles";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { LinearGradient } from 'expo';
import TabBar from "react-native-underline-tabbar";
import AktivScreen from '../AktivScreen';
import HistoryScreen from '../HistoryScreen';
import CheckinScreen from '../CheckinScreen';
import BarListScreen from "../BarListScreen";
import Tabs from './Tabs';
import {Text, View, StyleSheet} from "react-native";





export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (

      <View style={styles.container}>

        <Tabs>

          <View title="BAR" style={styles.content}>

            <BarListScreen navigation={this.props.navigation}/>

          </View>
          <View title="ACTIVE" styles={styles.content}>
            <AktivScreen navigation={this.props.navigation}/>
          </View>
          <View title="HISTORY" style={styles.content}>
            <HistoryScreen navigation={this.props.navigation}/>
          </View>
          <View title="CHECKIN" style={styles.content}>
            <CheckinScreen navigation={this.props.navigation}/>

          </View>

        </Tabs>

      </View>



    );
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1,                            // Take up all screen
    backgroundColor: '#673ab7',         // Background color
  },
  // Tab content container
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    backgroundColor: '#FFFFFF',         // Darker background for content area
  },
  // Content header
  header: {
    margin: 10,                         // Add margin
    color: '#673ab7',                   // White color
    fontFamily: 'Avenir',               // Change font family
    fontSize: 26,                       // Bigger font size
  },
  // Content text
  text: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    textAlign: 'center',                // Center
    fontFamily: 'Avenir',
    fontSize: 18,
  },
});