import React from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import Styles from '../../assets/Styles';
import firebase from 'firebase';
import {Button, Input} from "react-native-elements";
import Icon from "react-native-elements/src/icons/Icon";
import {LinearGradient} from "expo";

export default class RegisterScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loading: false,
			error: '',
		}
	}

	/**
	 * Button handler for creating user
	 */
	onButtonPress() {
		const {email, password} = this.state;
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(this.onSignUpSuccess.bind(this))
			.catch(this.onSignUpFailed.bind(this));

	}

	/**
	 * On creation success
	 */
	onSignUpSuccess() {
		this.setState({
			email: '',
			password: '',
			error: ''
		});
		alert("Bruger er nu oprettet");
	}

	/**
	 * On creation error
	 * @param err
	 */
	onSignUpFailed(err) {
		this.setState({
			error: err.message
		});

	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<LinearGradient style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
				}} colors={['#80d0c7', '#13547a']}>
					<View style={{flexDirection: 'row'}}>
						<Text style={Styles.travelTextReg} titleStyle={{fontWeight: 800, fontSize: 40}}>SIGN UP</Text>

					</View>

					<Input
						leftIcon={
							<Icon
								name='email'
								color='white'
								size={25}
							/>
						}

						placeholder='Email'
						value={this.state.email}
						containerStyle={{marginTop: 100, alignSelf: 'center'}}
						onChangeText={email => this.setState({email})}
						inputStyle={{marginLeft: 10, color: 'white'}}
						keyboardAppearance="light"
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

						placeholder='Password'
						containerStyle={{marginBottom: 270, alignSelf: 'center'}}
						value={this.state.password}
						secureTextEntry={true}
						onChangeText={password => this.setState({password})}
						inputStyle={{marginLeft: 10, color: 'white'}}
						keyboardAppearance="light"
						autoFocus={false}
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="default"
						placeholderTextColor="white"

					/>
						<Text style={{alignSelf: 'center', color: 'red', marginBottom: 10, marginTop: 20}}>{this.state.error}</Text>
					<View>
						<Button style={Styles.buttonStyleReg} clear title={"Sign Up"}
										titleStyle={{fontWeight: 'bold', fontSize: 23}}
										onPress={this.onButtonPress.bind(this)}/>

					</View>
				</LinearGradient>
			</TouchableWithoutFeedback>
		);
	}
}










