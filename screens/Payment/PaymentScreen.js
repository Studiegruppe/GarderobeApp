import React from 'react';
import {ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from "expo";

// Get screen dimensions
const {width, height} = Dimensions.get('window');

export default class PaymentScreen extends React.Component {


	params = this.props.navigation.state.params;

	constructor(props) {
		super(props);
	}


	componentDidMount() {
		setTimeout(() => {
			this.props.navigation.navigate('ConfirmCheckin', {
				code: this.params.code,
				barName: this.params.barName,
				amount: this.params.amount,
				barID: this.params.barID,
				barImage: this.params.barImage,
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
						source={require('../../assets/images/dankort.png')} resizeMode="contain"
						style={styles.image}
					/>
					<Text style={{
						textAlign: 'center',
						marginBottom: 30,
					}}>
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
});