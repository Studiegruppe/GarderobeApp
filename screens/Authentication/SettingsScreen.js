import React from 'react';
import firebase from 'firebase';
import {Button, ScrollView} from 'react-native';


export default class SettingsScreen extends React.Component {

	static navigationOptions = {
		title: 'Settings',
	};

	constructor(props) {
		super(props);
		this.state = {
			currentPassword: "",
			newPassword: "",
			newEmail: "",
		};
	}

	// Occurs when signout is pressed...
	onSignoutPress = () => {
		firebase.auth().signOut();
	};


	render() {
		return (
			<ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>


				<Button title="Change Password" onPress={() => this.props.navigation.navigate('ChangePassword')}/>


				<Button title="Change Email" onPress={() => this.props.navigation.navigate('ChangeEmail')}/>

				<Button title="Sign out" onPress={this.onSignoutPress}/>

			</ScrollView>
		);
	}

}





