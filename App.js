import React from 'react';
import {ActivityIndicator} from 'react-native';
import AppNavigator from './navigation/MainTabSwitchNavigator';
import firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';
import LoginNavigator from "./navigation/AuthStackSwitchNavigator";
import globals from "./assets/Globals";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      currentUser: null,
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
        globals.uid = firebase.auth().currentUser.uid;
        this.setState({loggedIn: true, currentUser: user});
      } else {
        this.setState({loggedIn: false, currentUser: null});
      }
    });

    setTimeout(() => {
      this.setState({
        isLoadingComplete: true
      })
    }, 2000);

    return this.currentUser;
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
            <LoginNavigator/>
          );
        default:
          return <ActivityIndicator size="large"/>;
      }
    }
  }
}
