import React from 'react';
import Tabs from './Tabs';
import {StyleSheet, View} from "react-native";
import BarListScreen from "../Bars/BarListScreen";
import AktivScreen from "../Tickets/AktivScreen";
import HistoryScreen from "../Tickets/HistoryScreen";
import CheckinScreen from "../Tickets/CheckinScreen";

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
					<View title="ACTIVE" style={styles.content}>
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
});