import React from 'react';
import firebase from 'firebase';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import VenuePoster from "./VenuePoster";
import VenuePopup from "./VenuePopup";

//The potential amounts a user can select
const possibleAmounts = ['1', '2', '3', '4', '5'];

export default class VenueListScreen extends React.Component {

	//An empty array of venues
	venueArray = [];
	mounted;

	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			popupIsOpen: false,
			// Amount of items to check in chosen by user
			chosenAmount: null,
		}
	}

	//Get all venues from the database
	get venuesFromApiAsync() {
		const that = this;
		firebase.database().ref('Venues').on('value', function (snapshot) {
			const venues = snapshot.val();

			for (let key in venues) {
				if (!venues.hasOwnProperty(key)) {
					continue;
				}
				const specificVenue = venues[key];
				//Add possible amounts to each individual bar aswell as their venueID
				Object.assign(specificVenue, {possibleAmounts: possibleAmounts, venueID: key});
				//Add the specificVenue object to the venueArray array
				that.venueArray.push(specificVenue);
			}
		});
	}

	//When the component mounted we load all venues from our firebase API
	componentDidMount() {
		this.mounted = true;
		this.venuesFromApiAsync;
		setTimeout(() => {
			if (this.mounted) {
				this.setState({
					isLoadingComplete: true
				})
			}
		}, 2000);
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	//When our venue is clicked set the popupIsOpen to true set the state to include the venue
	openVenue = (venue) => {
		this.setState({
			popupIsOpen: true,
			venue,
		});
	};

	//When our user closes the venue popup (either by tapping outside the box, or by navigating to checkin), we close the venue popup
	closeVenue = () => {
		this.setState({
			popupIsOpen: false,
			// Reset values to default ones
			chosenAmount: null,
		});
	};

	//Sets the amount chosen by our user into our state
	chooseAmount = (amount) => {
		this.setState({
			chosenAmount: amount,
		});
	};

	//If the user has selected an amount we close the venue and pass along information to the Payment screen
	buyWardrobeTicket = () => {
		// Make sure they selected amount
		if (!this.state.chosenAmount) {
			alert('Please select amount of items');
		} else {
			// Close popup
			this.closeVenue();
			// Navigate away to ConfirmCheckin route
			this.props.navigation.navigate('Payment', {
				code: Math.random().toString(36).substring(6).toUpperCase() + Math.random().toString(36).substring(6).toUpperCase(),
				venueName: this.state.venue.venueName,
				amount: this.state.chosenAmount + 1,
				venueID: this.state.venue.venueID,
				venueImage: this.state.venue.venueImage,
				address: this.state.venue.address,
			})
		}
	};

	render() {
		//If we haven't loaded show the activityindicator
		if (!this.state.isLoadingComplete) {
			return (
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch'}}>
					<ActivityIndicator size="large" color="#FFFFFF"/>
				</View>
			)
		} else {
			//Render out all our venues
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
								onOpen={this.openVenue}
								key={index}
							/>
						)}
					</ScrollView>
					{/*Add a venue popup that starts hidden*/}
					<VenuePopup
						venue={this.state.venue}
						isOpen={this.state.popupIsOpen}
						onClose={this.closeVenue}
						chosenAmount={this.state.chosenAmount}
						onChooseAmount={this.chooseAmount}
						onBuyWardrobeTicket={this.buyWardrobeTicket}
					/>
				</View>
			)
		}
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