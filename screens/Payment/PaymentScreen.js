import React from 'react';
import {ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from "expo";
import {defaultStyles} from "../../assets/Styles";

// Get screen dimensions
const {width, height} = Dimensions.get('window');

//Simulate payment
export default class PaymentScreen extends React.Component {


	params = this.props.navigation.state.params;

	constructor(props) {
		super(props);
	}


	componentDidMount() {
		//Idle for two seconds whilst showing an image of a creditcard before passing on information into ConfirmCheckin
		setTimeout(() => {
			this.props.navigation.navigate('ConfirmCheckin', {
				code: this.params.code,
				venueName: this.params.venueName,
				amount: this.params.amount,
				venueID: this.params.venueID,
				venueImage: this.params.venueImage,
				address: this.params.address,
			})
		}, 2000);
	}

	render() {
		return (
			<LinearGradient style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
			}} colors={['#80d0c7', '#13547a']}>
				<View style={styles.container}>
					<ImageBackground
						source={require('../../assets/images/creditCard.png')} resizeMode="contain"
						style={styles.image}
					/>
					<Text style={styles.text}>
						Payment processing
					</Text>
					<ActivityIndicator size="large" color="#FFFFFF"
														 style={{marginBottom: 150}}/>
				</View>
			</LinearGradient>
		)
	}
}
const styles = StyleSheet.create({
	image: {
		flex: 1,
	},
	// App container
	container: {
		paddingTop: 20,
		height: (height - 40) / 2 - 10,
		width: width,
		flex: 1,                          // take up all available space
	},
	text: {
		...defaultStyles.text,
		color: '#333',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 30,
	},
});