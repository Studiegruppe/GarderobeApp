import React from "react";
import {View} from "react-native";
import globals from "../assets/Globals";

export default class BarListScreen extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    return (
      <View>
        {globals.uid}
      </View>

    );
  }
}
