import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultStyles} from "../../assets/Styles";
import globals from "../../assets/Globals";

import firebase from "firebase";
import {LinearGradient} from "expo";
import TicketPoster from "./TicketPoster";


export default class TicketCheckinConfirmation extends Component {

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
      ticketColour: "",
      currentTicketNumber: 0,
      venueName: '',
      timeoutDone: false,
      initialData: 0,
    };
  }


  async getVenueInfo() {
    let that = this;
    await firebase.database().ref(that.venuePATH).once('value', function (snapshot) {
      let obj = snapshot.val();
      that.state.venueName = obj.venueName;
      that.state.ticketID = obj.ticketsInfo.ticketIDCounter;
      that.state.ticketColour = obj.ticketsInfo.ticketColour;
      that.state.currentTicketNumber = obj.ticketsInfo.currentTicketNumber;
    });
    this.checkin();
  }

  /**
   * ComponentWillMont er brugt som "delay" til at sørge for vores data er klar
   */
  componentWillMount() {
    let that = this;
    firebase.database().ref(`${this.userPATH}/Tickets/Active`).on('value', function (snapshot) {
      that.setState({initialData: snapshot.val()});
    });
  }

  /**
   * Checkin henter data fra initialData som bliver sat i component will mount,
   * det gøres her for ellers var der problemer med den kørte videre uden at have fået dataen
   */
  async checkin() {
    let that = this;
    const active = this.state.initialData;
    if (active !== null && active) {
      Object.keys(active).forEach(function (key) {
        if (active[key].name === that.state.venueName) {
          that.alreadyCheckedIn = true;
        }
      });
    }
    if (this.alreadyCheckedIn) {
      alert("you have already checked in");
    } else {
      this.generateTickets();
      this.incrementCounter();
      alert("You've checked in to the bar");
    }
    this.props.navigation.popToTop();
  }

  /**
   * IncrementCounter bruges til at incrementere 2 values i firebase
   * 1. currentTicketNumber --> nummeret på billetten
   * 2. ticketID --> ID på billetten i firebase
   */
  async incrementCounter() {
    let that = this;
    await firebase.database().ref(`${that.venuePATH}/ticketsInfo`).update({
      currentTicketNumber: that.state.currentTicketNumber + 1,
      ticketIDCounter: that.state.ticketID + 1,
    });
  }

  /**
   * Bruges til at oprette tickets i databasen for både barer og brugere.
   * Der er anvendt .child for mulighed for selv at angive push_key (id) i firebase
   *
   *
   * Oprettelse af billetter af en brugers billet for baren
   */
  async generateTickets() {
     let that = this;
    const ticketID = this.state.ticketID;
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

    /**
     * Oprettelse af billetter for en bruger
     */
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
            // Go back when pressed
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