import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import React from "react";
import firebase from 'firebase';
import globals from "../../assets/Globals";
import TicketPoster from "./TicketPoster";
import CheckoutPopup from "./CheckoutPopup";


/**
 * Class used to show an users active tickets
 */
export default class ActiveTicketsScreen extends React.Component {

	//Empty ticket array to be filled with active tickets
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

	//This function is called whenever we navigate back to the activeTicketsScreen after checking a ticket out.
	//It takes an index to delete the correct aspect of the array
	handleOnNavigateBack(index) {
		this.activeTicketsArray.splice(index, 1);
		this.forceUpdate();
	};


	/**
	 * Firebase call to get a users active tickets
	 */
	getActiveTicketAsync() {
		let that = this;
		firebase.database().ref(`Users/${globals.uid}/Tickets/Active`).on('value', function (snapshot) {
			//Get the snapshot data and transform it into a const
			const user = snapshot.val();
			let index = 0;
			for (let key in user) {
				if (!user.hasOwnProperty(key)) {
					continue;
				}
				//Sets an element called index to the accurate index, we'll see this for deletion later
				user[key]["index"] = index;
				//Each found object inside the object retrieved is pushed into our array
				that.activeTicketsArray.push(user[key]);
				//Increment index with 1 after we've pushed into the activeTicketsArray
				index += 1;
			}
		})
	};

	/**
	 * When a venue is selected an overlay appears with a tick in which is either open or closed
	 * @param ticket
	 * @param key
	 */
	openTicket = (ticket, key) => {
		this.setState({
			popupIsOpen: true,
			ticket,
			key,
		});
	};

	/**
	 * Sets the popupIsOpen state to false, which closes the opened ticket
	 */
	closeTicket = () => {
		this.setState({
			popupIsOpen: false,
		});
	};


	/**
	 * Closing pop-up and navigating to the ConfirmCheckout route and passing the ticket object and onNavigateBack function
	 */
	checkoutTicket = () => {
		if (!this.state.ticket) {
			return;
		}
		// Close popup
		this.closeTicket();
		// Navigate away to ConfirmCheckout route, whilst passing the necessary information along
		this.props.navigation.navigate('ConfirmCheckout', {
			ticket: this.state.ticket,
			index: this.state.key,
			onNavigateBack: this.handleOnNavigateBack.bind(this),
		})
	};

	render() {
		//If isLoadingComplete is false, we show our Activity Indicator
		if (!this.state.isLoadingComplete) {
			return (
				<View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch'}}>
					<ActivityIndicator size="large" color="#FFFFFF"/>
				</View>
			)
			//Else we show our active tickets that get generated below
		} else {
			return (
				<View style={styles.container}>
					<ScrollView
						contentContainerStyle={styles.scrollContent}
						// Hide all scroll indicators
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					>
						{/* For each ticket in our array, we generate a ticket poster */}
						{this.activeTicketsArray.map((ticket, index) =>
							<TicketPoster
								ticket={ticket}
								onOpen={this.openTicket}
								key={index}
							/>
						)}
					</ScrollView>
					{/* Create the CheckoutPopup element that takes information from the state that
					is passed into the state when the individual ticket calls the TicketPoster method */}
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