import React from 'react';
import firebase from 'firebase';
import Styles from '../../assets/Styles';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Icon, Input} from "react-native-elements";
import {LinearGradient} from "expo";


export default class SettingsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPassword: "",
			newPassword: "",
			newEmail: "",
		};
	}
	static navigationOptions = {
		header: null,
	};

	/**
	 * Reauthenticates the current user and returns a promise
	 * @param currentPassword
	 * @returns {Promise<firebase.auth.UserCredential>}
	 */
	reauthenticate = (currentPassword) => {
		const user = firebase.auth().currentUser;
		const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
		return user.reauthenticateAndRetrieveDataWithCredential(credential);
	};


	/**
	 * Changes user's email
	 */
	onChangeEmailPress = () => {
		const user = firebase.auth().currentUser;
		user.updateEmail(this.state.newEmail).then(() => {
			if (alert("Email was changed")) {
				this.props.navigation.goBack()
			}
		}).catch((error) => {
			console.log(error.message);
		});
	};


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

          <Input
            leftIcon={
              <Icon
                name='email'
                color='white'
                size={25}
              />
						}

            containerStyle={{marginTop: 220,marginBottom: 240, alignSelf: 'center', justifyContent: 'space-between'}}
            onChangeText={newEmail => this.setState({newEmail})}
            value={this.state.newEmail}
            inputStyle={{marginLeft: 10, color: 'white'}}
            keyboardAppearance="light"
            placeholder="Ny email"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTextColor="white"

          />

          <View>
            <Button title="Change Email" clear buttonStyle={Styles.ButtonChangeEmail}  titleStyle={{fontWeight: 'bold', fontSize: 23, color: 'white'}} onPress={this.onChangeEmailPress()} />
          </View>

        </LinearGradient>
      </TouchableWithoutFeedback>
		);
	}

}


