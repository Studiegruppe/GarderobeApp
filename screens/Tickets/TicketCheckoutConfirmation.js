import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {defaultStyles} from "../../assets/Styles";
import firebase from "firebase";
import globals from "../../assets/Globals";
import TicketPoster from "./TicketPoster";
import CheckoutPopup from "./CheckoutPopup";
import {LinearGradient} from "expo";

export default class TicketCheckoutConfirmation extends Component {


  params = this.props.navigation.state.params;
  ticket = this.params.ticket;
  userId = globals.uid;
  userEmail = globals.userEmail;
  barID = this.ticket.barID || 0;
  userPATH = `/Brugere/${this.userId}`;
  barPATH = `/Barer/${this.barID}`;
  ticketID = this.ticket.ticketId;
  barImage = this.ticket.barImage;

  constructor(props) {
    super(props);
    this.state = {
      initialTicketData: 0,
    }
  }

  static navigationOptions = {
    header: null,
  };

  async moveTicketsToInactive() {
    let that = this;
    console.log(this.params);
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