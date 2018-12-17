import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {defaultStyles} from "../../assets/Styles";
import firebase from "firebase";
import globals from "../../assets/Globals";
import TicketPoster from "./TicketPoster";
import {LinearGradient} from "expo";

export default class TicketCheckoutConfirmation extends Component {


  params = this.props.navigation.state.params;
  ticket = this.params.ticket;
  userID = globals.uid;
  userEmail = globals.userEmail;
  venueID = this.ticket.venueID || 0;
  userPATH = `/Users/${this.userID}`;
  venuePATH = `/Venues/${this.venueID}`;
  ticketID = this.ticket.ticketID;

  constructor(props) {
    super(props);
    this.state = {
      initialTicketData: 0,
    }
  }

  static navigationOptions = {
    header: null,
  };

  /**
   * Creates a database entry in "Inactive" with a currently active ticket
   *
   * @returns {Promise<void>}
   */
  async moveTicketsToInactive() {
    let that = this;
    this.ticket.checkoutTimestamp = new Date().toUTCString();
    console.log(that.ticket);
    await firebase.database().ref(`${that.userPATH}/Tickets/Inactive/`).child(that.venueID.toString() + ':' + that.ticketID.toString()).update(
      {
        amount: that.ticket.amount,
        userID: that.ticket.userID,
        userEmail: that.ticket.userEmail,
        checkinTimestamp: that.ticket.checkinTimestamp,
        checkoutTimestamp: that.ticket.checkoutTimestamp,
        ticketColour: that.ticket.ticketColour,
        ticketNumber: that.ticket.ticketNumber,
        ticketID: that.ticketID,
        venueName: that.ticket.venueName,
        venueID: that.ticket.venueID,
        venueImage: that.ticket.venueImage,
        address: that.ticket.address,
      });

    await firebase.database().ref(`${that.venuePATH}/Tickets/Inactive/`).child(that.venueID.toString() + ':' + that.ticketID.toString()).update(
      {
        amount: that.ticket.amount,
        userID: that.ticket.userID,
        userEmail: that.ticket.userEmail,
        checkinTimestamp: that.ticket.checkinTimestamp,
        checkoutTimestamp: that.ticket.checkoutTimestamp,
        ticketColour: that.ticket.ticketColour,
        ticketNumber: that.ticket.ticketNumber,
        ticketID: that.ticketID,
        venueName: that.ticket.venueName,
        venueID: that.ticket.venueID,
        venueImage: that.ticket.venueImage,
        address: that.ticket.address,
      });
  }

  /**
   * Removes the selected ticket from both venues and users
   * @returns {Promise<void>}
   */
  async removeTicketsFromActive() {
    let that = this;
    await firebase.database().ref(`${that.venuePATH}/Tickets/Active/${that.venueID.toString() + ':' + that.ticketID.toString()}`).remove();
    await firebase.database().ref(`${that.userPATH}/Tickets/Active/${that.venueID.toString() + ':' + that.ticketID.toString()}`).remove();
  }


  /**
   * Checkout navigation
   * @returns {Promise<void>}
   */
  async checkout() {
    this.moveTicketsToInactive();
    this.removeTicketsFromActive();
    this.params.onNavigateBack();
    this.props.navigation.pop();
  }

  render() {
    return (
      <LinearGradient style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }} colors={['#80d0c7', '#13547a']}>
        <View style={styles.container}>
          <TicketPoster
            ticket={this.ticket}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            // Go back when pressed
            onPress={() => this.checkout()}
          >
            <Text style={styles.button}>Check out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            // Go back when pressed
            onPress={() => this.props.navigation.pop()}>
            <Text style={styles.CancelButton}>Cancel</Text>
          </TouchableOpacity>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            // Hide all scroll indicators
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >

          </ScrollView>
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
    paddingTop: 40,
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
  CancelButton: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 16,
  },
});