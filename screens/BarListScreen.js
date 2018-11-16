import React from "react";
import {View} from "react-native";
import {Button} from "react-native-elements";

export default class BarListScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('BarDetails', {bar: 'Cucaracha'})}
        />
      </View>
    );
  }
}
