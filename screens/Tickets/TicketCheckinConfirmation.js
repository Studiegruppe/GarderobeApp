import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultStyles} from "../../assets/Styles";
import globals from "../../assets/Globals";

import firebase from "firebase";
import {LinearGradient} from "expo";


export default class TicketCheckinConfirmation extends Component {

	//Remove the default header
	static navigationOptions = {
		header: null,
	};

	params = this.props.navigation.state.params;
	alreadyCheckedIn = false;
	venueID = this.params.venueID || 0;
	currentDate = new Date().toUTCString();
	venuePATH = `/Venues/${this.venueID}`;
	userId = globals.uid;
	userPATH = `/Users/${this.userId}`;
	userEmail = globals.email;
	checkinTimestamp = this.currentDate;
	checkoutTimestamp = null;
	venueImage = this.params.venueImage;
	address = this.params.address;

	constructor(props) {
		super(props);
		this.state = {
			selectedValue: this.params.amount,
			ticketID: 0,
			ticketColour: '',
			currentTicketNumber: 0,
			venueName: '',
			timeoutDone: false,
			initialData: 0,
		};
	}


	//Get information of the venue we've decided to check in to
	async getVenueInfo() {
		let that = this;
		await firebase.database().ref(that.venuePATH).once('value', function (snapshot) {
			let obj = snapshot.val();
			that.state.venueName = obj.venueName;
			that.state.ticketID = obj.ticketsInfo.ticketIDCounter;
			that.state.ticketColour = obj.ticketsInfo.ticketColour;
			that.state.currentTicketNumber = obj.ticketsInfo.currentTicketNumber;
		});
		//Call the checkin function
		this.checkin();
	}

	//Gets all the active tickets for the user when the component is about to be mounted
	componentWillMount() {
		let that = this;
		firebase.database().ref(`${this.userPATH}/Tickets/Active`).on('value', function (snapshot) {
			that.setState({initialData: snapshot.val()});
		});
	}

	//The checkin method
	async checkin() {
		let that = this;
		const activeTickets = this.state.initialData;
		//Ensures that we have some data to iterate through before we run the method to ensure we don't crash
		if (activeTickets !== null && activeTickets) {
			//For each active ticket in the initialData object in the state we run an if statement to see if an active
			//ticket already exists in the bar that our user is trying to check in to
			Object.keys(activeTickets).forEach(function (key) {
				if (activeTickets[key].name === that.state.venueName) {
					that.alreadyCheckedIn = true;
				}
			});
		}
		//If the user is checked in, we return an alert to notify them of this
		if (this.alreadyCheckedIn) {
			alert("you have already checked in");
		} else {
			//If the user isn't checked in we call the generateTickets method
			this.generateTickets();
			//Afterwards we increment the values in the database
			this.incrementCounter();
			alert("You've checked in to the bar");
		}
		//Send the user back to the homepage
		this.props.navigation.popToTop();
	}

	//The Increment counter method that increases the ticketID by 1, aswell as the current ticketNumber
	//Both are incremented in firebase of the venue
	async incrementCounter() {
		let that = this;
		await firebase.database().ref(`${that.venuePATH}/ticketsInfo`).update({
			currentTicketNumber: that.state.currentTicketNumber + 1,
			ticketIDCounter: that.state.ticketID + 1,
		});
	}

	//The method generateTickets that is used to generate the tickets for both the venue and the user
	async generateTickets() {
		let that = this;
		const ticketID = this.state.ticketID;

		//Insert a ticket object into the /Tickets/Active path of the venue with the name consisting of the venueID and the ticketID
		await firebase.database().ref(`${that.venuePATH}/Tickets/Active`).child(that.venueID.toString() + ':' + ticketID.toString()).set({
			amount: that.state.selectedValue,
			userID: that.userId,
			userEmail: that.userEmail,
			checkinTimestamp: that.checkinTimestamp,
			checkoutTimestamp: that.checkoutTimestamp,
			ticketColour: that.state.ticketColour,
			ticketNumber: that.state.currentTicketNumber,
			ticketID: ticketID,
			venueName: that.state.venueName,
			venueID: that.venueID,
			venueImage: that.venueImage,
			address: that.address,
		});

		//Insert a ticket object into the /Tickets/Active path of the user with the name consisting of the venueID and the ticketID
		await firebase.database().ref(`${this.userPATH}/Tickets/Active/`).child(that.venueID.toString() + ':' + ticketID.toString()).update({
			amount: that.state.selectedValue,
			userID: that.userId,
			userEmail: that.userEmail,
			checkinTimestamp: that.checkinTimestamp,
			checkoutTimestamp: that.checkoutTimestamp,
			ticketColour: that.state.ticketColour,
			ticketNumber: that.state.currentTicketNumber,
			ticketID: ticketID,
			venueName: that.state.venueName,
			venueID: that.venueID,
			venueImage: that.venueImage,
			address: that.address,
		});
	}

	//Render out the ticket information before we check in
	render() {
		const {code} = this.params;
		return (
			<LinearGradient style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
			}} colors={['#80d0c7', '#13547a']}>
				<View style={styles.container}>
					<Text style={styles.header}>Your confirmation code</Text>
					<Text style={styles.code}>{code}</Text>
					<TouchableOpacity
						style={styles.buttonContainer}
						// This begins the check in process by getting the current venue information
						onPress={() => this.getVenueInfo()}>
						<Text style={styles.button}>Confirm</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonContainer}
						// Go back when pressed
						onPress={() => this.props.navigation.popToTop()}>
						<Text style={styles.button}>Go Back</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		...defaultStyles.text,
		color: '#333',
		fontSize: 20,
		fontWeight: 'bold',
	},
	code: {
		...defaultStyles.text,
		color: '#333',
		fontSize: 36,
	},
	buttonContainer: {
		alignItems: 'center',
		backgroundColor: '#13547a',
		borderRadius: 100,
		margin: 20,
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	button: {
		...defaultStyles.text,
		color: '#FFFFFF',
		fontSize: 20,
	},
});