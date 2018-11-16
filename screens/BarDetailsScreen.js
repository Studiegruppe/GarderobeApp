import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";

const debug = false;

export default class BarListScreen extends React.Component {

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


  render() {
    debug && console.log(Object.keys(this.barObjekt));
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* other code from before here */}
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>
          Navn: {this.barObjekt.Navn + '\n'}
          Adresse: {this.barObjekt.Adresse + '\n'}
          ID: {this.barObjekt.Adresse + '\n'}
        </Text>
        {this.renderCheckinButton()}
      </View>

    );
  }
}
