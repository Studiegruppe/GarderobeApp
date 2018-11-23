import React, {Component} from 'react';

import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={
            require('../../assets/images/b72fb7e3-cbb6-40c8-af35-4d74eccfb82c.png')
          }
          style={styles.welcomeImage}
        />

        <ActivityIndicator
          size="large" color="#ffffff"/>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B9EFF',
  },
  welcomeImage: {
    width: 300,
    height: 150,
    marginTop: 3,
    marginLeft: -10,
  }
});
