import React from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';
import globals from "./assets/Globals";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import LoginForm from "./screens/LoginForm";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import OffersScreen from "./screens/OffersScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AktivScreen from "./screens/AktivScreen";
import HistoryScreen from "./screens/HistoryScreen";
import CheckinScreen from "./screens/CheckinScreen";
import BarListScreen from "./screens/BarListScreen";
import BarDetailsScreen from "./screens/BarDetailsScreen";
import {Icon} from 'expo';
import ForgotPassword from "./screens/ForgotPassword";

const LoginStack = createStackNavigator({
  Login: LoginForm,
  ForgotPassword: ForgotPassword,
});

const AuthStack = createBottomTabNavigator({
    Login: LoginStack,
    Register: RegisterScreen,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Login') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else {
          iconName = `ios-link${focused ? '' : '-outline'}`
        }
        return <Icon.Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Login',
  });

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  BarList: BarListScreen,
  BarDetails: BarDetailsScreen,
  TicketsActive: AktivScreen,
  TicketsHistory: HistoryScreen,
  Checkin: CheckinScreen,
});

const MainAppStack = createBottomTabNavigator({
    Home: HomeStack,
    Maps: MapScreen,
    Offers: OffersScreen,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Maps') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'Offers') {
          iconName = `ios-link${focused ? '' : '-outline'}`;
        } else {
          iconName = `ios-options${focused ? '' : '-outline'}`
        }
        return <Icon.Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Home',
  }
);

const timeoutTime = 1;
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
    }, timeoutTime);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <SplashScreen/>
      );
    } else {
      switch (this.state.loggedIn) {
        case true:
          return (
            <MainAppStack/>
          );
        case false:
          return (
            <AuthStack/>
          );
        default:
          return <ActivityIndicator size="large"/>;
      }
    }
  }
}
