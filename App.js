import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from "./screens/HomeScreen";

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        skipLoadingScreen: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
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
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };
    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };
    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };



    componentWillMount() {
        this.state = {
            view : <SplashScreen/>
        };


        setTimeout(() => {
            //IF FALSE NAVIGATE TO ERROR
            if(true) {
                this.setState({
                    view : <HomeScreen/>
                })
            } else {
                this.setState({
                    view : <Error/>
                })
            }
        }, 2000) //TIME OF WAITING


    }

    render() {
        return (
            this.state.view
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
