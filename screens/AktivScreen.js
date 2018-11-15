import {Text, View} from "react-native";
import React from "react";
import Styles from "../assets/Styles";
import firebase from 'firebase';
import App from '../App';



export default class AktivScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loggedinUserId: 123,
        }

    }

    componentWillMount(){
        this.getActiveTicketAsync();

    }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        /*console.log(currentUser);*/
    }

    getActiveTicketAsync() {

        firebase.database().ref('Brugere').once('value',function(snapshot){
            let uid = snapshot.val();



        });

    }



    static navigationOptions = {
        title: 'app.json',
    };



    render() {
        return (

            <View style={Styles.scrollableTab}>
                <Text style={Styles.welcomeTab}>
                    AKTIV
                </Text>
            </View>

        );
    }
}
