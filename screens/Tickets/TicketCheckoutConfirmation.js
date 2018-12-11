import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {defaultStyles} from "../../assets/Styles";
import firebase from "firebase";
import globals from "../../assets/Globals";

export default class TicketCheckoutConfirmation extends Component {


	params = this.props.navigation.state.params;
	ticket = this.params.ticket;
	userId = globals.uid;
	userEmail = globals.userEmail;
	barID = this.ticket.barID || 0;
	userPATH = `/Brugere/${this.userId}`;
	barPATH = `/Barer/${this.barID}`;
	ticketID = this.ticket.ticketId;
	barImage = this.params.image;

	constructor(props) {
		super(props);
		this.state = {
			initialTicketData: 0,
		}
	}

	async moveTicketsToInactive() {
		let that = this;
		this.ticket.checkud = new Date().toUTCString();
		await firebase.database().ref(`${that.userPATH}/Billetter/Inaktive/`).child(that.barID.toString() + ':' + that.ticketID.toString()).update(
			{
				antal: that.ticket.antal,
				userID: that.ticket.userID,
				userEmail: that.ticket.userEmail,
				checkind: that.ticket.checkind,
				checkud: that.ticket.checkud,
				farve: that.ticket.farve,
				nummer: that.ticket.nummer,
				ticketId: that.ticketID,
				barNavn: that.ticket.barNavn,
				barID: that.ticket.barID,
				barImage: that.barImage,
			});

		await firebase.database().ref(`${that.barPATH}/InaktiveBilletter/`).child(that.barID.toString() + ':' + that.ticketID.toString()).update(
			{
				antal: that.ticket.antal,
				userID: that.ticket.userID,
				userEmail: that.ticket.userEmail,
				checkind: that.ticket.checkind,
				checkud: that.ticket.checkud,
				farve: that.ticket.farve,
				nummer: that.ticket.nummer,
				ticketId: that.ticketID,
				barNavn: that.ticket.barNavn,
				barID: that.ticket.barID,
				barImage: that.barImage,
			});
	}

	async removeTicketsFromActive() {
		let that = this;
		await firebase.database().ref(`${that.barPATH}/AktiveBilletter/${that.barID.toString() + ':' + that.ticketID.toString()}`).remove();
		await firebase.database().ref(`${that.userPATH}/Billetter/Aktive/${that.barID.toString() + ':' + that.ticketID.toString()}`).remove();
	}


	async checkout() {
		this.moveTicketsToInactive();
		this.removeTicketsFromActive();
		this.params.onNavigateBack();
		this.props.navigation.pop();
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.buttonContainer}
					// Go back when pressed
					onPress={() => this.props.navigation.pop()}>
					<Text style={styles.button}>Cancel</Text>
				</TouchableOpacity>
				<Text style={styles.header}>:)</Text>
				<TouchableOpacity
					style={styles.buttonContainer}
					// Go back when pressed
					onPress={() => this.checkout()}
				>
					<Text style={styles.button}>Check out</Text>
				</TouchableOpacity>
			</View>
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
	},
	code: {
		...defaultStyles.text,
		color: '#333',
		fontSize: 36,
	},
	buttonContainer: {
		alignItems: 'center',
		backgroundColor: '#673AB7',
		borderRadius: 100,
		margin: 20,
		paddingVertical: 10,
		paddingHorizontal: 30,
	},
	button: {
		...defaultStyles.text,
		color: '#FFFFFF',
		fontSize: 18,
	},
});