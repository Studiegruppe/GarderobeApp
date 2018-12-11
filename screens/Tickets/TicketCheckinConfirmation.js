import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultStyles} from "../../assets/Styles";
import globals from "../../assets/Globals";

import firebase from "firebase";
import {LinearGradient} from "expo";


export default class TicketCheckinConfirmation extends Component {

  params = this.props.navigation.state.params;
  alreadyCheckedIn = false;
  barID = this.params.barID || 0;
  currentDate = new Date().toUTCString();
  barPATH = `/Barer/${this.barID}`;
  userId = globals.uid;
  userPATH = `/Brugere/${this.userId}`;
  userEmail = globals.email;
  checkinTimestamp = this.currentDate;
  checkOut = false;
  barImage = this.params.barImage;

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.params.amount,
      ticketId: 0,
      ticketColor: "",
      currentNum: 0,
      venueName: '',
      timeoutDone: false,
      initialData: 0,
    };
  }


  static navigationOptions = {
    header: null,
  };

  alreadyCheckedIn = false;
  barId = this.props.navigation.state.params.barID || 0;
  dt = new Date();
  currentDate = this.dt.toUTCString();
  barPATH = `/Barer/${this.barId}`;
  userPATH = `/Brugere/${globals.uid}`;
  userId = globals.uid;
  checkinTimestamp = this.currentDate;
  checkOut = false;

  async getBarInfo() {
    let that = this;
    await firebase.database().ref(that.barPATH).once('value', function (snapshot) {
      let obj = snapshot.val();
      that.state.venueName = obj.Navn;
      that.state.ticketId = obj.ticketsInfo.ticketidCounter;
      that.state.ticketColor = obj.ticketsInfo.colour;
      that.state.currentNum = obj.ticketsInfo.currentNumber;
    });
    this.checkin();
  }

  /**
   * ComponentWillMont er brugt som "delay" til at sørge for vores data er klar
   */
  componentWillMount() {
    let that = this;
    firebase.database().ref(`${this.userPATH}/Billetter/Aktive`).on('value', function (snapshot) {
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
        if (active[key].barNavn === that.state.venueName) {
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
    this.props.navigation.pop();
  }

  /**
   * IncrementCounter bruges til at incrementere 2 values i firebase
   * 1. currentNum --> nummeret på billetten
   * 2. ticketID --> ID på billetten i firebase
   */
  async incrementCounter() {
    let that = this;
    await firebase.database().ref(`${that.barPATH}/ticketsInfo`).update({
      currentNumber: that.state.currentNum + 1,
      ticketidCounter: that.state.ticketId + 1,
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
    console.log(this.params);
    let that = this;
    const ticketId = this.state.ticketId;
    await firebase.database().ref(`${that.barPATH}/AktiveBilletter`).child(that.barID.toString() + ':' + ticketId.toString()).set({
      antal: that.state.selectedValue,
      userID: that.userId,
      userEmail: that.userEmail,
      checkind: that.checkinTimestamp,
      checkud: that.checkOut,
      farve: that.state.ticketColor,
      nummer: that.state.currentNum,
      ticketId: ticketId,
      barNavn: that.state.venueName,
      barID: that.barID,
      barImage: that.barImage,
    });

    /**
     * Oprettelse af billetter for en bruger
     */
    await firebase.database().ref(`${this.userPATH}/Billetter/Aktive/`).child(that.barID.toString() + ':' + ticketId.toString()).update({
      antal: that.state.selectedValue,
      userID: that.userId,
      userEmail: that.userEmail,
      checkind: that.checkinTimestamp,
      checkud: that.checkOut,
      farve: that.state.ticketColor,
      nummer: that.state.currentNum,
      ticketId: ticketId,
      barNavn: that.state.venueName,
      barID: that.barID,
      barImage: that.barImage,
    });
  }

  render() {
    const {code, bar, amount, barID} = this.params;
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
            onPress={() => this.getBarInfo()}>
            <Text style={styles.button}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            // Go back when pressed
            onPress={() => this.props.navigation.pop()}>
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