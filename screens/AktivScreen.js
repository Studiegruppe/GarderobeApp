import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import firebase from 'firebase';
import App from '../App';


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
    const {currentUser} = firebase.auth()
    this.setState({currentUser})
    /*console.log(currentUser);*/
  }

  getActiveTicketAsync() {
    let that = this;
    firebase.database().ref('Brugere/123').once('value', function (snapshot) {
      let user = snapshot.val();
      console.log(user);
      console.log("-------------------------------");
      that.setState({checkintime: user.Billetter.Aktive.TicketID.checkind});
      that.setState({color: user.Billetter.Aktive.TicketID.farve});
      that.setState({number: user.Billetter.Aktive.TicketID.nummer});
      that.setState({amount: user.Billetter.Aktive.TicketID.antal});

    });
  }


  static navigationOptions = {
    title: 'app.json',
  };


  render() {
    return (

      <View style={Styles.containerTab}>
        <Text style={Styles.welcomeTab}>
          AKTIV
        </Text>
      </View>

    );
  }
}
