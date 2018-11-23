import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import firebase from 'firebase';
import {Button} from "react-native-elements";
import globals from "../assets/Globals";


export default class AktivScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      checkintime: "",
      color: "",
      number: 123,
      amount: 0,
      activeTicketArray: [],
    }
  }

  componentWillMount() {
    this.getActiveTicketAsync();

  }

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser})

  }


  getActiveTicketAsync() {
    let ticketArray = [];
    let tempArray = [];
    let that = this;
    firebase.database().ref(`Brugere/${globals.uid}/Billetter/Aktive`).once('value', function (snapshot) {
      let user = snapshot.val();
      for (let key in user) {
        if (user.hasOwnProperty(key)) {
          let usr = user[key];
          ticketArray.push(
            <Text key={key}>
              Your number {usr.nummer + "\n"}
              Checkin time : {usr.checkind + "\n"}
              Location : {usr.barNavn + "\n"}
              Color : {usr.farve + "\n"}
              Amount of items : {usr.antal + "\n"}
              {that.renderCheckOutButton(key)}
            </Text>
          ),
            tempArray.push(
              {
                number: usr.nummer,
                checkinTime: usr.checkind,
                location: usr.barNavn,
                color: usr.farve,
                amount: usr.antal
              }
            )
        }
      }
      that.setState({
        array: ticketArray,
        activeTicketArray: tempArray,
      });
    });
  }


  async checkoutTicket(array, key) {
    const items = this.state.activeTicketArray[key];
    array.splice(items, 1);
    let result = await firebase.database().ref(`Brugere/${globals.uid}/Billetter/Inaktive/`).child(key).update({
      antal: items.amount,
      barNavn: items.location,
      checkind: items.checkinTime,
      checkud: true,
      farve: items.color,
      nummer: items.number,
    });
    await firebase.database().ref(`Brugere/${globals.uid}/Billetter/Aktive/${key}`).remove();
    await firebase.database().ref(`/Barer/BarID/AktiveBilletter/${key}/${globals.uid}`).
    console.log(result);
  }


  /**
   *
   */

  renderCheckOutButton(key) {
    return (
      <Button title="Checkout" key={key} onPress={() => this.checkoutTicket(this.state.array, key)}/>
    )
  }

  static
  navigationOptions = {
    title: 'app.json',
  };


  render() {
    return (

      <View style={Styles.scrollableTab}>
        <Text style={Styles.welcomeTab}>
          AKTIV
        </Text>
        {this.state.array}

      </View>

    );
  }
}