import React from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';
import globals from "./assets/Globals";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import LoginForm from "./screens/LoginForm";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import MapScreen from "./screens/MapScreen";
import OffersScreen from "./screens/OffersScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AktivScreen from "./screens/AktivScreen";
import HistoryScreen from "./screens/HistoryScreen";
import CheckinScreen from "./screens/CheckinScreen";
import BarListScreen from "./screens/BarListScreen";
import BarDetailsScreen from "./screens/BarDetailsScreen";
import {AppLoading, Icon} from 'expo';
import ForgotPassword from "./screens/ForgotPassword";
import ChangePassword from "./screens/ChangePassword";
import ChangeEmail from "./screens/ChangeEmail";

const LoginStack = createStackNavigator({
    Login: LoginForm,
    ForgotPassword: ForgotPassword,
    Register: RegisterScreen,
  },
  {
    navigationOptions: () => ({
      headerTransparent: true,
      headerBackTitle: 'Back',
      headerTintColor: 'white'
    }),
  }
);


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  BarList: BarListScreen,
  BarDetails: BarDetailsScreen,
  TicketsActive: AktivScreen,
  TicketsHistory: HistoryScreen,
  Checkin: CheckinScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  ChangePassword: ChangePassword,
  ChangeEmail: ChangeEmail,
});

const MapsStack = createStackNavigator({
  Maps: MapScreen,
  BarDetails: BarDetailsScreen,
});

const MainAppStack = createBottomTabNavigator({
    Home: HomeStack,
    Maps: MapsStack,
    Offers: OffersScreen,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Maps') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'Offers') {
          iconName = `ios-link${focused ? '' : '-outline'}`;
        } else {
          iconName = `ios-settings${focused ? '' : '-outline'}`
        }
        return <Icon.Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      currentUser: null,
      isLoadingComplete: false,
      skipLoadingScreen: false,
      appIsReady: false,
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
  }

  _cacheResourcesAsync() {
    return true;
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({appIsReady: true})}
          onError={console.warn}
        />
      )
    }
    switch (this.state.loggedIn) {
      case true:
        return (
          <MainAppStack/>
        );
      case false:
        return (
          <LoginStack/>
        );
      default:
        return <ActivityIndicator size="large"/>;
    }
  }
}
