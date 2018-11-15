import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import firebase from 'firebase';


export default class AktivScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

  getActiveTicketAsync() {
    let ticketArray = [];
    let that = this;

    firebase.database().ref('Brugere/123').once('value', function (snapshot) {
      let user = snapshot.val();

      for (let i = 0; i < 3; i++) {
        ticketArray.push(
          <Text>
            Checkin time : {user.Billetter.Aktive.TicketID.checkind + "\n"}
            Color of ticket : {user.Billetter.Aktive.TicketID.farve + "\n"}
            Your number {user.Billetter.Aktive.TicketID.nummer + "\n"}
            The amount : {user.Billetter.Aktive.TicketID.antal + "\n"}
          </Text>
        )
      }
      that.setState({
        array: ticketArray
      });
    });
  }


  static navigationOptions = {
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