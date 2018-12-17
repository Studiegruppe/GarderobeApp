import React from 'react';
import firebase from 'firebase';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import VenuePoster from "./VenuePoster";
import VenuePopup from "./VenuePopup";


const possibleAmounts = [ '1', '2', '3', '4', '5'];

export default class VenueListScreen extends React.Component {

	venueArray = [];

	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			popupIsOpen: false,
			// Amount of items to checkin chosen by user
			chosenAmount: null,
		}
	}

	/**
	 * Getting all venues from the database
	 */
	get barsFromApiAsync() {
		const that = this;
		firebase.database().ref('Venues').on('value', function (snapshot) {
			const venues = snapshot.val();

			for (let key in venues) {
				if (!venues.hasOwnProperty(key)) {
					continue;
				}
				const specificVenue = venues[key];
				//Add possible amounts to each individual bar
				Object.assign(specificVenue, {possibleAmounts: possibleAmounts, venueID: key});
				that.venueArray.push(specificVenue);
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

	/**
	 * popup for the selected venue
	 * @param venue
	 */
	openBar = (venue) => {
		this.setState({
			popupIsOpen: true,
			venue,
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

	/**
	 * Selecting amount of items to checkin, and navigating to payment
	 */
	buyWardrobeTicket = () => {
		// Make sure they selected amount
		if (!this.state.chosenAmount) {
			alert('Please select amount of items');
		} else {
			// Close popup
			this.closeBar();
			// Navigate away to ConfirmCheckin route
			this.props.navigation.navigate('Payment', {
				code: Math.random().toString(36).substring(6).toUpperCase() + Math.random().toString(36).substring(6).toUpperCase(),
				venueName: this.state.venue.venueName,
				amount: this.state.chosenAmount,
				venueID: this.state.venue.venueID,
				venueImage: this.state.venue.venueImage,
				address: this.state.venue.address,
			})
		}
	};

render() {
		if (!this.state.isLoadingComplete) {
			return (
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch'}}>
          <ActivityIndicator size="large" color="#FFFFFF"/>
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
						{this.venueArray.map((venue, index) =>
							<VenuePoster
								venue={venue}
								onOpen={this.openBar}
								key={index}
							/>
						)}
					</ScrollView>
					<VenuePopup
						venue={this.state.venue}
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