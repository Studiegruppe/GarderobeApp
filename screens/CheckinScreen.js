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
      timeoutDone: false,
      initialData: 0,
    };
  }

  alreadyCheckedIn = false;
  barId = 'BarID';
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


  componentWillMount() {
    let that = this;
    firebase.database().ref(`/Brugere/${globals.uid}/Billetter/Aktive`).on('value', function (snapshot) {
      that.setState({initialData: snapshot.val()});
    });
  }

  async checkin() {
    let that = this;
    const active = this.state.initialData;

    console.log(active, "whatup");
    if (active === null || !active) {
      return;
    }
    Object.keys(active).forEach(function (key) {
      if (active[key].barNavn === that.state.venueName) {
        that.alreadyCheckedIn = true;
      }
    });
    console.log(this.alreadyCheckedIn);
    if (this.alreadyCheckedIn) {
      alert("you have already checked in");
    } else {
      this.generateTickets();
      this.incrementCounter();
    }
  }


  async incrementCounter() {
    let that = this;
    await firebase.database().ref(`${that.barPATH}/ticketsInfo`).update({
      currentNumber: that.state.currentNum,
      ticketidCounter: that.state.ticketId,
    });

  }

  async generateTickets() {
    let that = this;
    await firebase.database().ref(`/Barer/${this.barId}/AktiveBilletter`).child(this.state.ticketId.toString()).update({

      antal: that.state.selectedValue,
      [that.userId]: {
        Navn: "Jens",
      },
      checkind: that.checkinTimestamp,
      checkud: that.checkOut,
      farve: that.state.ticketColor,
      nummer: that.state.currentNum,
    });


    await firebase.database().ref(`/Brugere/${globals.uid}/Billetter/Aktive`).child(this.state.ticketId.toString()).update({

      antal: that.state.selectedValue,
      barNavn: that.state.venueName,
      checkind: that.checkinTimestamp,
      checkud: that.checkOut,
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
        <Button title="Checkin" onPress={() => this.getBarInfo()}/>

      </View>
    );
  }
}
