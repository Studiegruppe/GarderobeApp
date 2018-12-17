import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import React from "react";
import firebase from 'firebase';
import globals from "../../assets/Globals";
import TicketPoster from "./TicketPoster";
import CheckoutPopup from "./CheckoutPopup";


/**
 * Class used to show an useres active tickets
 */
export default class ActiveTicketsScreen extends React.Component {

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

	handleOnNavigateBack() {
		this.activeTicketsArray.splice(0, 1);
		this.forceUpdate();
	};


	/**
	 * Firebase call to get a users active tickets --> push into activeTicketArray
	 */
	getActiveTicketAsync() {
		let that = this;
		firebase.database().ref(`Users/${globals.uid}/Tickets/Active`).on('value', function (snapshot) {
			const user = snapshot.val();
			for (let key in user) {
				if (!user.hasOwnProperty(key)) {
					continue;
				}
				that.activeTicketsArray.push(user[key]);
			}
		})
	};

	/**
	 * When a venue is selected an overlay appears with a tick in which is either open or closed
	 * @param ticket
	 */
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


	/**
	 * Closing pop-up and navigating to the ConfirmCheckout route
 	 */
	checkoutTicket = () => {
		if (!this.state.ticket) {
			return;
		}
		// Close popup
		this.closeTicket();
		// Navigate away to ConfirmCheckout route
		this.props.navigation.navigate('ConfirmCheckout', {
			ticket: this.state.ticket,
			onNavigateBack: this.handleOnNavigateBack.bind(this),
		})
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
		flex: 1,
		backgroundColor: 'transparent',         // Background color
	},
	scrollContent: {
		flexDirection: 'row',   // arrange posters in rows
		flexWrap: 'wrap',       // allow multiple rows
	},
});