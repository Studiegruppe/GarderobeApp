import React from 'react';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {Button, Icon} from 'react-native-elements';
import {View,} from 'react-native';
import {LinearGradient} from "expo";
import globals from "../../assets/Globals";


export default class SettingsScreen extends React.Component {

	//Remove the default header
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			currentPassword: "",
			newPassword: "",
			newEmail: "",
		};
	}

	//Sets our global variables to nothing and then calls the firebase function signOut to sign us out in the database
	onSignoutPress = () => {
		globals.email = '';
		globals.uid = '';
		firebase.auth().signOut();
	};

	render() {
		return (
			<LinearGradient style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
			}} colors={['#80d0c7', '#13547a']}>
				<View style={{flex: 1}}>
					<View style={{flex: 1, marginBottom: 10, marginTop: 200}}>
						<Button title={"Change Password"} clear buttonStyle={Styles.SettingsButton}
										onPress={() => this.props.navigation.navigate('ChangePassword')}
										icon={<Icon name='vpn-key' color='white' size={25}/>}
						/>
					</View>
					<View style={{flex: 1, marginBottom: 100}}>
						<Button title="Change Email"
										clear buttonStyle={Styles.SettingsButton}
										onPress={() => this.props.navigation.navigate('ChangeEmail')}
										icon={<Icon name='email' color='white' size={25}/>}
						/>
					</View>
					<View style={{flex: 1, marginBottom: 0}}>
						<Button title="Sign out" onPress={this.onSignoutPress}
										buttonStyle={Styles.SignoutButton}
										icon={<Icon name='exit-to-app' color='white' size={25}/>}
						/>
					</View>
				</View>
			</LinearGradient>
		);
	}
}





