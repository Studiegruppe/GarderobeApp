import React from 'react';
import firebase from 'firebase';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import BarPoster from "./BarPoster";
import BarPopup from "./BarPopup";


const possibleAmounts = ['0', '1', '2', '3', '4', '5'];

export default class BarListScreen extends React.Component {

	barArray = [];

	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			popupIsOpen: false,
			// Amount of items to checkin chosen by user
			chosenAmount: null,
		}
	}

	get barsFromApiAsync() {
		const that = this;
		firebase.database().ref('Barer').on('value', function (snapshot) {
			const barer = snapshot.val();

			for (let key in barer) {
				if (!barer.hasOwnProperty(key)) {
					continue;
				}
				const specifikBar = barer[key];
				//Add possible amounts to each individual bar
				Object.assign(specifikBar, {possibleAmounts: possibleAmounts, barID: key});
				that.barArray.push(specifikBar);
			}
		});
	}

	componentDidMount() {
		this.barsFromApiAsync;
		setTimeout(() => {
			this.setState({
				isLoadingComplete: true
			})
		}, 2000);
	}

	openBar = (bar) => {
		this.setState({
			popupIsOpen: true,
			bar,
		});
	};

	closeBar = () => {
		this.setState({
			popupIsOpen: false,
			// Reset values to default ones
			chosenAmount: null,
		});
	};

	chooseAmount = (amount) => {
		this.setState({
			chosenAmount: amount,
		});
	};

	buyWardrobeTicket = () => {
		// Make sure they selected amount
		if (!this.state.chosenAmount) {
			alert('Please select amount of items');
		} else {
			// Close popup
			this.closeBar();
			// Navigate away to ConfirmCheckin route
			this.props.navigation.navigate('ConfirmCheckin', {
				code: Math.random().toString(36).substring(6).toUpperCase() + Math.random().toString(36).substring(6).toUpperCase(),
				bar: this.state.bar.Navn,
				amount: this.state.chosenAmount,
				barID: this.state.bar.barID,
			})
		}
	};

	render() {
		if (!this.state.isLoadingComplete) {
			return (
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch'}}>
					<ActivityIndicator size="large"/>
				</View>
			)
		} else
			return (
				<View style={styles.container}>
					<ScrollView
						contentContainerStyle={styles.scrollContent}
						// Hide all scroll indicators
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					>
						{this.barArray.map((bar, index) =>
							<BarPoster
								bar={bar}
								onOpen={this.openBar}
								key={index}
							/>
						)}

					</ScrollView>
					<BarPopup
						bar={this.state.bar}
						isOpen={this.state.popupIsOpen}
						onClose={this.closeBar}
						chosenAmount={this.state.chosenAmount}
						onChooseAmount={this.chooseAmount}
						onBuyWardrobeTicket={this.buyWardrobeTicket}
					/>
				</View>
			)
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