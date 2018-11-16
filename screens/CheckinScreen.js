import {Text, View, Picker} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import {Button} from "react-native-elements";
import Timestamp from 'react-timestamp';
import globals from "../assets/Globals";
import * as firebase from "firebase";


export default class CheckinScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 1,
      ticketId: 0,
      ticketColor: "",
      currentNum: 0,
      venueName: '',

    };
  }

  checkBool = false;

  componentWillMount() {
  }


  checkin() {
    const that = this;
    let dt = new Date();
    let currentDate = dt.toUTCString();
    let barId = 'BarID';
    let barPATH = `/Barer/${barId}`;
    let userPATH = `/Brugere/${globals.uid}`;
    let amount = this.state.selectedValue;
    let userId = globals.uid;
    //let userName = '';
    let checkinTimestamp = currentDate;
    let checkOut = false;



    firebase.database().ref(barPATH).once('value', function (snapshot) {
      let obj = snapshot.val();
      that.state.venueName = obj.Navn;
      that.state.ticketId = obj.ticketsInfo.ticketidCounter;
      that.state.ticketColor = obj.ticketsInfo.colour;
      that.state.currentNum = obj.ticketsInfo.currentNumber;


    });

    firebase.database().ref(`/Brugere/${globals.uid}/billetter/Aktive`).once('value', function (snapshot) {
      let active = snapshot.val();

      Object.keys(active).forEach(function (key) {
        if (active[key].barNavn === venueName) {
          console.log("hej");
          that.checkBool = true;
        }
      });
      if (that.checkBool) {
        error("you have already checked in");
      } else {
        firebase.database().ref(`${barPATH}/ticketsInfo`).update({
          currentNumber: that.state.currentNum + 1,
          ticketidCounter: that.state.ticketId + 1,
        });
      }

    });


    console.log(that.state.ticketColor);
    firebase.database().ref(`/Barer/${barId}/AktiveBilletter`).child(that.state.ticketId.toString()).update({

      antal: amount,
      [userId]: {
        Navn: "Jens",
      },
      checkind: checkinTimestamp,
      checkud: checkOut,
      farve: that.state.ticketColor,
      nummer: that.state.currentNum,
    });


    firebase.database().ref(`/Brugere/${globals.uid}/Aktive`).child(that.state.ticketId.toString()).update({

      antal: amount,
      barNavn: that.state.venueName,
      checkind: checkinTimestamp,
      checkud: checkOut,
      farve: that.state.ticketColor,
      nummer: that.state.currentNum,
    });
  }


  renderPickerItems() {

    return (
      <Picker
        style={{width: 100}}
        selectedValue={this.state.selectedValue}
        onValueChange={(value) => this.setState({selectedValue: value})}>
        <Picker.Item label="1" value="1"/>
        <Picker.Item label="2" value="2"/>
        <Picker.Item label="3 " value="3"/>
        <Picker.Item label="4" value="4"/>
        <Picker.Item label="5" value="5"/>
      </Picker>
    );
  }


  render() {
    return (
      <View style={Styles.scrollableTab}>
        <Text style={Styles.welcomeTab}>
          CHECK IN
        </Text>
        <Timestamp time="1450663457" component={Text}/>
        {this.renderPickerItems()}
        <Button title="Checkin" onPress={() => this.checkin()}/>

      </View>
    );
  }
}
