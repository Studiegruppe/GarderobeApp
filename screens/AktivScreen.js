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
      loggedinUserId: 123,
      checkintime: "",
      color: "",
      number: 123,
      amount: 0,
    }
  }

  componentWillMount() {
    this.getActiveTicketAsync();

  }

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser})

  }


  /*METODEN SKAL RETTES NÅR OPRET BRUGER ER FÆRDIG MED DE RIGTIGE UID'S*/
  getActiveTicketAsync() {
    let ticketArray = [];
    let that = this;
    firebase.database().ref('Brugere/123/'/*`Brugere/${globals.uid}`*/).once('value', function (snapshot) {
      let user = snapshot.val();
      console.log(`Brugere/${globals.uid}`);

      for (let i = 0; i < 3; i++) {
        ticketArray.push(
          <Text key={i}>
            Checkin time : {user.Billetter.Aktive.TicketID.checkind + "\n"}
            Color of ticket : {user.Billetter.Aktive.TicketID.farve + "\n"}
            Your number {user.Billetter.Aktive.TicketID.nummer + "\n"}
            The amount : {user.Billetter.Aktive.TicketID.antal + "\n"}
            TICKET ID : {user.Billetter.Aktive.TicketID.ticketid + "\n" + "\n"}
            {that.renderCheckOutButton(user.Billetter.Aktive.TicketID.ticketid)}
          </Text>
        )
      }
      that.setState({
        array: ticketArray
      });
    });
  }

  checkoutTicket(array, id) {
    array = this.state.array;
    const deleteItem = array[id];
    console.log(deleteItem);
    array.splice(deleteItem, 1);
    //firebase.database().ref('Brugere/123'/*`Brugere/${globals.uid}`*/).remove(id);

  }


  renderCheckOutButton(key) {
    return (
      <Button title="logout" key={key} onPress={() => this.checkoutTicket(key)}/>
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