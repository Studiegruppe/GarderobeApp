import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";

const debug = false;

export default class BarDetailsScreen extends React.Component {

  barObjekt = null;

  constructor(props) {
    super(props);
    this.barObjekt = this.props.navigation.state.params;
  }

  renderCheckinButton() {
    return (
      <Button title={"Check In (sends back currently)"} onPress={() => this.props.navigation.goBack()}/>
    )
  }

  renderOpeningHours(openingHoursObject) {
    if (!openingHoursObject) {
      return;
    }
    let returnObject = [];
    const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (let i = 0; i < daysOfTheWeek.length; i++) {
      Object.keys(openingHoursObject).forEach(function (key) {
        if (daysOfTheWeek[i] === key) {
          returnObject.push(`${key}: ${openingHoursObject[key].open} to ${openingHoursObject[key].close}\n`);
        }
      });
    }

    return (
      <Text>
        Åbningstider: {'\n'}
        {returnObject}
      </Text>
    )
  }

  render() {
    debug && console.log(Object.keys(this.barObjekt));
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>
          Navn: {this.barObjekt.Navn + '\n'}
          Adresse: {this.barObjekt.Adresse + '\n'}
          ID: {this.barObjekt.Adresse + '\n'}
          {console.log(this.barObjekt.openingHours)}
        </Text>
        {this.renderOpeningHours(this.barObjekt.openingHours)}
        {this.renderCheckinButton()}
      </View>

    );
  }
}
