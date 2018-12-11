import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import firebase from 'firebase';
import globals from "../../assets/Globals";
import TicketPoster from "./TicketPoster";
import CheckoutPopup from "./CheckoutPopup";


export default class AktivScreen extends React.Component {

	activeTicketsArray = [];

	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			popupIsOpen: false,
		}
	}

	componentDidMount() {
		this.getActiveTicketAsync();
		setTimeout(() => {
			this.setState({
				isLoadingComplete: true
			})
		}, 1000);

	}


	getActiveTicketAsync() {
		let that = this;
		firebase.database().ref(`Brugere/${globals.uid}/Billetter/Aktive`).on('value', function (snapshot) {
			const user = snapshot.val();
			for (let key in user) {
				if (!user.hasOwnProperty(key)) {
					continue;
				}
				let specifikBillet = user[key];
				that.activeTicketsArray.push(specifikBillet);
			}
		})
	};

	openTicket = (ticket) => {
		this.setState({
			popupIsOpen: true,
			ticket,
		});
	};

	closeTicket = () => {
		this.setState({
			popupIsOpen: false,
		});
	};


	checkoutTicket = () => {
		console.log("toasdasd");
	};

	render() {
		if (!this.state.isLoadingComplete) {
			return (
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch'}}>
					<ActivityIndicator size="large" color="#FFFFFF"/>
				</View>
			)
		} else {
			return (
				<View style={styles.container}>
					<ScrollView
						contentContainerStyle={styles.scrollContent}
						// Hide all scroll indicators
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					>
						{this.activeTicketsArray.map((ticket, index) =>
							<TicketPoster
								ticket={ticket}
								onOpen={this.openTicket}
								key={index}
							/>
						)}
					</ScrollView>
					<CheckoutPopup
						ticket={this.state.ticket}
						isOpen={this.state.popupIsOpen}
						onClose={this.closeTicket}
						onCheckout={this.checkoutTicket}
					/>
				</View>
			);
		}
	}
}
const styles = StyleSheet.create({
	container: {
		paddingTop: 20,         // start below status bar
		backgroundColor: 'transparent',         // Background color
	},
	scrollContent: {
		flexDirection: 'row',   // arrange posters in rows
		flexWrap: 'wrap',       // allow multiple rows
	},
});