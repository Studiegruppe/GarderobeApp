import React from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import globals from "./assets/Globals";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import LoginForm from "./screens/Authentication/LoginForm";
import RegisterScreen from "./screens/Authentication/RegisterScreen";
import MapScreen from "./screens/Map/MapScreen";
import SettingsScreen from "./screens/Authentication/SettingsScreen";
import ActiveTicketsScreen from "./screens/Tickets/ActiveTicketsScreen";
import HistoryScreen from "./screens/Tickets/HistoryScreen";
import VenueListScreen from "./screens/Venues/VenueListScreen";
import {AppLoading, Icon} from 'expo';
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import ChangePassword from "./screens/Authentication/ChangePassword";
import ChangeEmail from "./screens/Authentication/ChangeEmail";
import TicketCheckinConfirmation from "./screens/Tickets/TicketCheckinConfirmation";
import VenuePopup from "./screens/Venues/VenuePopup";
import HomeScreen from "./screens/Home/HomeScreen";
import TicketCheckoutConfirmation from "./screens/Tickets/TicketCheckoutConfirmation";
import PaymentScreen from "./screens/Payment/PaymentScreen";

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
	BarList: VenueListScreen,
	BarPopUp: VenuePopup,
	ConfirmCheckin: TicketCheckinConfirmation,
	ConfirmCheckout: TicketCheckoutConfirmation,
	Payment: PaymentScreen,
	TicketsActive: ActiveTicketsScreen,
	TicketsHistory: HistoryScreen,
});

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen,
	ChangePassword: ChangePassword,
	ChangeEmail: ChangeEmail,
});

const MapsStack = createStackNavigator({
	Maps: MapScreen,
});

const MainAppStack = createBottomTabNavigator({
		Home: HomeStack,
		Maps: MapsStack,
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
				} else {
					iconName = `ios-settings${focused ? '' : '-outline'}`
				}
				return <Icon.Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
			},
		}),
		tabBarOptions: {
			activeTintColor: '#80D0C7',
			inactiveTintColor: '#13547A',
			style: {
				backgroundColor: 'transparent',
			},
		},
		initialRouteName: 'Home',
	}
);

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: null,
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
				globals.email = user.email;
				globals.uid = user.uid;
				this.setState({loggedIn: true});
			} else {
				this.setState({loggedIn: false});
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
