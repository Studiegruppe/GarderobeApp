import React from 'react';
import {ActivityIndicator} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      isLoadingComplete: false,
      skipLoadingScreen: false,
    }
  }

  componentWillMount() {
    this.setState({view: <SplashScreen/>});
    firebase.initializeApp({
      apiKey: "AIzaSyCxecGEtoqgPPDWftVQpXVKIZLdsQNDPAs",
      authDomain: "garderobeapp-49283.firebaseapp.com",
      databaseURL: "https://garderobeapp-49283.firebaseio.com",
      projectId: "garderobeapp-49283",
      storageBucket: "garderobeapp-49283.appspot.com",
      messagingSenderId: "271748622389"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });


    setTimeout(() => {
      //IF TRUE NAVIGATE TO APP-NAVIGATOR
      this.setState({
        isLoadingComplete: true
      })
    }, 2000) //TIME OF WAITING
  }


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        this.state.view
      );
    } else {
      switch (this.state.loggedIn) {
        case true:
          return (
            <AppNavigator/>
          );
        case false:
          return (
            <AppNavigator/>
          );
        default:
          return <ActivityIndicator size="large"/>;
      }
    }
  }
}
