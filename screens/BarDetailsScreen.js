import React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";

export default class BarListScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.navigation.state.params.bar);
    console.log(this.props.bar);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* other code from before here */}
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>
          {this.props.navigation.state.params.bar + '\n'}
          {this.props.navigation.state.params.bar + '\n'}
          {this.props.navigation.state.params.bar + '\n'}
        </Text>
      </View>

    );
  }
}
