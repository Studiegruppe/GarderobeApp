import React from 'react';
import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import globals from "../../assets/Globals";
import {Button, Icon, Input} from "react-native-elements";
import {LinearGradient} from "expo";


export default class LoginForm extends React.Component {

	//Remove the default header
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: '',
		}
	}

	/**
	 * Sign in using firebase
	 * @returns {Promise<void>}
	 */
	async signIn() {
		const {email, password} = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onSignInSuccess.bind(this))
			.catch(this.onSignInFailed.bind(this));
	}

	//This method is called upon successfully logging in
	//It sets the states of email and password to blank for safety, then it sets
	// our globals variable to utilize the email and uid later
	onSignInSuccess() {
		this.setState({
			email: '',
			password: '',
		});
		const loggedInUser = firebase.auth().currentUser;
		if (loggedInUser !== null) {
			globals.email = firebase.auth().currentUser.email;
			globals.uid = firebase.auth().currentUser.uid;
		}
	}

	//Show the error message
	onSignInFailed(error) {
		this.setState({
			error: error.message,
		})
	}

	render() {
		return (
			//Ensures that when we press anywhere else on the screen we dismiss the keyboard
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<LinearGradient style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
				}} colors={['#80d0c7', '#13547a']}>
					<View>
						<Image
							style={{width: 150, height: 150, left: 5, right: 5, marginTop: 110, alignSelf: 'center'}}
							source={require('../../assets/images/jckt_logo_300x300.png')}
						/>
					</View>
					<Input
						leftIcon={
							<Icon
								name='email'
								color='white'
								size={25}
							/>
						}
						containerStyle={{marginTop: 50, alignSelf: 'center', justifyContent: 'space-between'}}
						onChangeText={email => this.setState({email})}
						value={this.state.email}
						inputStyle={{marginLeft: 10, color: 'white'}}
						keyboardAppearance="light"
						placeholder="E-mail"
						autoFocus={false}
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="email-address"
						placeholderTextColor="white"
					/>
					<Input
						leftIcon={
							<Icon
								name='lock'
								color='white'
								size={25}
							/>
						}
						containerStyle={{marginBottom: 50, alignSelf: 'center', justifyContent: 'space-between'}}
						onChangeText={password => this.setState({password})}
						value={this.state.password}
						inputStyle={{marginLeft: 10, color: 'white'}}
						keyboardAppearance="light"
						placeholder="Password"
						secureTextEntry={true}
						autoFocus={false}
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="default"
						placeholderTextColor="white"
					/>
					<Text style={{alignSelf: 'center', color: 'red', marginBottom: 10, marginTop: 20}}>{this.state.error}</Text>
					<View style={{flex: 1, marginBottom: 10, marginTop: 20}}>
						<Button title={'Sign in'} clear buttonStyle={Styles.buttonStyleLogin}
										titleStyle={{fontWeight: 'bold', fontSize: 23}} onPress={this.signIn.bind(this)}/>
						<Button title="Create Account" clear buttonStyle={Styles.buttonStyleText1}
										titleStyle={{fontSize: 15}} onPress={() => this.props.navigation.navigate('Register')}/>
						<Button title="Forgot Password?" clear buttonStyle={Styles.buttonStyleText2}
										titleStyle={{fontSize: 15}} onPress={() => this.props.navigation.navigate('ForgotPassword')}/>
					</View>
				</LinearGradient>
			</TouchableWithoutFeedback>
		)
			;
	}
}
