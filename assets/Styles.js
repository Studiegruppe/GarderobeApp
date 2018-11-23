import {StyleSheet} from 'react-native';

export const defaultStyles = {
	text: {
		fontFamily: 'Avenir',
	}
};

export default StyleSheet.create({
	/** Transform into default styles*/
	backgroundStyle: {},
	containerForLogin: {
		flex: 1,

	},
	containerStyle: {
		flex: 1,
		backgroundColor: 'yellow',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginInput: {
		marginBottom: '0',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	loginInputPassword: {

		justifyContent: 'center',
		alignItems: 'center',
		width: '100'
	},
	buttonStyleLogin: {
		borderWidth: 2,
		height: 50,
		width: 250,
		backgroundColor: 'transparent',
		borderColor: 'white',
		borderRadius: 30,
		marginBottom: 0,
	},
	buttonStyleForgot: {
		borderWidth: 2,
		height: 50,
		width: 250,
		backgroundColor: 'transparent',
		borderColor: 'white',
		borderRadius: 30,
		marginBottom: 220,
	},
	travelTextReg: {
		flex: 1,
		color: 'white',
		fontSize: 25,
		marginBottom: 0,
		marginVertical: 120,
		textAlign: 'center',
		justifyContent: 'flex-start',

	},
	travelText: {
		flex: 1,
		color: 'white',
		fontSize: 25,
		marginBottom: 10,
		textAlign: 'center',
		justifyContent: 'flex-start',

	},
	regInput: {
		marginBottom: 400,
	},
	buttonStyleReg: {
		borderWidth: 2,
		height: 50,
		width: 250,
		backgroundColor: 'transparent',
		borderColor: 'white',
		borderRadius: 30,
		marginTop: -230,
		alignItems: 'center',
		alignSelf: 'center',

	},
	buttonStyleText1: {
		height: 50,
		width: 250,
		backgroundColor: 'transparent',
		marginBottom: 160,

	},
	buttonStyleText2: {
		height: 50,
		width: 250,
		backgroundColor: 'transparent',
		marginTop: -175,

	},
	textField: {
		backgroundColor: 'transparent',
		borderColor: 'red',
		borderWidth: 1,
		marginBottom: 10,
	},
	errorStyle: {
		color: 'red',
	},
	scrollableTab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingTop: 40,
		width: '100%',

	},
	welcomeTab: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructionsTab: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
		fontSize: 28,
	},
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},


	loginView: {
		marginTop: 150,
		backgroundColor: 'transparent',
		width: 250,
		height: 400,
	},
	loginTitle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},


	forgotEmailText: {
		color: 'white',
		fontSize: 15,
		marginBottom: 10,
	},
	forgotEmailHeader: {
		color: 'white',
	},

	footerView: {
		marginTop: 20,
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},

	backgroundImage: {
		height: '100%',
		flexDirection: 'column',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
});


/*
farve top : #60C3FF
farve bot : #5887F9
*/
