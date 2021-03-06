import React, {Component} from 'react';
import {
	Animated,
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import {defaultStyles} from "../../assets/Styles";
import {TicketImageGenerator} from "./TicketImageGenerator";

// Get screen dimensions
const {width, height} = Dimensions.get('window');
// Set default popup height to 50% of screen height
const defaultHeight = height * 0.5;

export default class CheckoutPopup extends Component {

	static propTypes = {
		// Boolean whether the popup is opened or not
		isOpen: PropTypes.bool.isRequired,
		// Ticket object
		ticket: PropTypes.object,
		// Gets called when user checks their ticket out
		onCheckout: PropTypes.func,
		// Gets called when popup is closed
		onClose: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			// Animates slide ups and downs when popup open or closed
			position: new Animated.Value(this.props.isOpen ? 0 : height),
			// Backdrop opacity
			opacity: new Animated.Value(0),
			// Popup height that can be changed by pulling it up or down
			height: defaultHeight,
			// Expanded mode with bigger poster flag
			expanded: false,
			// Visibility flag
			visible: this.props.isOpen,
		};
	}

	// Handle isOpen changes to either open or close popup
	componentWillReceiveProps(nextProps) {
		// isOpen prop changed to true from false
		if (!this.props.isOpen && nextProps.isOpen) {
			this.animateOpen();
		}
		// isOpen prop changed to false from true
		else if (this.props.isOpen && !nextProps.isOpen) {
			this.animateClose();
		}
	}

	// Open popup
	animateOpen() {
		// Update state first
		this.setState({visible: true}, () => {
			Animated.parallel([
				// Animate opacity
				Animated.timing(
					this.state.opacity, {toValue: 0.5} // semi-transparent
				),
				// And slide up
				Animated.timing(
					this.state.position, {toValue: 0} // top of the screen
				),
			]).start();
		});
	}

	// Dynamic styles that depend on state
	getStyles = () => {
		return {
			imageContainer: {
				width: width,         // 100% of screen width
			},
			ticketContainer: this.state.expanded ? {
				//If expanded
				flexDirection: 'column',  // arrange image and ticket info in a column
				alignItems: 'center',     // and center them
			} : {
				//If not expanded
				flexDirection: 'row',     // arrange image and ticket info in a row
			},
			ticketInfo: this.state.expanded ? {
				//If expanded
				flex: 0,
				alignItems: 'center',     // center horizontally
				paddingTop: 20,
			} : {
				//If not expanded
				flex: 1,
				justifyContent: 'center', // center vertically
			},
			title: this.state.expanded ? {
				//If expanded
				textAlign: 'center',
			} : {
				//If not expanded do nothing
			},
		};
	};

	// Close popup
	animateClose() {
		// Slide down
		Animated.timing(
			this.state.position, {toValue: height}  // bottom of the screen
		).start(() => this.setState({visible: false}));
	}

	render() {
		// Pull out the object/functions from the passed props
		const {
			ticket,
			onCheckout,
		} = this.props;
		// Pull out ticket data and assign to constants
		const {venueName, address, amount, ticketColour, checkinTimestamp, ticketNumber} = ticket || {};
		// Render nothing if not visible
		if (!this.state.visible) {
			return null;
		}
		return (
			<View style={styles.container}>
				{/* Closes popup if user taps on semi-transparent backdrop */}
				<TouchableWithoutFeedback onPress={this.props.onClose}>
					<Animated.View style={[styles.backdrop, {opacity: this.state.opacity}]}/>
				</TouchableWithoutFeedback>
				<Animated.View
					style={[styles.modal, {
						// Animates height
						height: this.state.height,
						// Animates position on the screen
						transform: [{translateY: this.state.position}, {translateX: 0}]
					}]}
				>
					{/* Content */}
					<View style={styles.content}>
						{/* Ticket poster, title and type + postal area */}
						<View
							style={[styles.ticketContainer, this.getStyles().ticketContainer]}>
							{/* Ticket poster */}
							<View style={[styles.imageContainer, this.getStyles().imageContainer]}>
								<ImageBackground
									source={TicketImageGenerator(ticketColour)} resizeMode="contain"
									style={styles.image}>

									<Text style={[styles.imageText1, styles.firstTextOnTicket]} numberOfLines={1}>Items: {amount}</Text>
									<Text style={styles.imageText} numberOfLines={1}>{venueName}</Text>
									<Text style={styles.imageText} numberOfLines={1}>{address}</Text>
									<Text style={styles.imageText}
												numberOfLines={1}>{checkinTimestamp.substr(0, checkinTimestamp.length - 7).slice(5, checkinTimestamp.length)}</Text>
									<Text style={styles.ticketNumberTextRight} numberOfLines={1}>NR: {ticketNumber}</Text>
									<Text style={styles.ticketNumberTextLeft} numberOfLines={1}>NR: {ticketNumber}</Text>
								</ImageBackground>
							</View>
						</View>
					</View>

					{/* Footer */}
					<View style={styles.footer}>
						<TouchableHighlight
							underlayColor="#9575CD"
							style={styles.buttonContainer}
							onPress={onCheckout}
						>
							<Text style={styles.button}>Checkout</Text>
						</TouchableHighlight>
					</View>

				</Animated.View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	// Main container
	container: {
		...StyleSheet.absoluteFillObject,   // fill up all screen
		justifyContent: 'flex-end',         // align popup at the bottom
		backgroundColor: 'transparent',     // transparent background
	},
	// Semi-transparent background below popup
	backdrop: {
		...StyleSheet.absoluteFillObject,   // fill up all screen
		backgroundColor: 'black',
	},
	// Popup
	modal: {
		backgroundColor: 'white',
	},
	content: {
		flex: 1,
		margin: 20,
		marginBottom: 0,
	},
	// Ticket container
	ticketContainer: {
		flex: 1,                            // take up all available space
		marginBottom: 20,
	},
	imageContainer: {
		flex: 1,                            // take up all available space
	},
	image: {
		borderRadius: 10,                   // rounded corners
		...StyleSheet.absoluteFillObject,   // fill up all space in a container
	},
	imageText: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
	ticketNumberTextRight: {
		transform: [{rotate: '90deg'}],
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontSize: 25,
		marginLeft: 240,
		marginTop: -60,
	},
	ticketNumberTextLeft: {
		transform: [{rotate: '270deg'}],
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontSize: 25,
		marginLeft: -240,
		marginTop: -35,
	},
	imageText1: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontSize: 20,
		paddingTop: 55,
		fontWeight: 'bold',
	},
	ticketInfo: {
		backgroundColor: 'transparent',
		// looks nicer when switching to/from expanded mode
	},
	title: {
		...defaultStyles.text,
		fontSize: 20,
	},
	genre: {
		...defaultStyles.text,
		color: '#BBBBBB',
		fontSize: 14,
	},
	sectionHeader: {
		...defaultStyles.text,
		color: '#AAAAAA',
	},
	// Footer
	footer: {
		padding: 20,
	},
	buttonContainer: {
		backgroundColor: 'rgba(19,84,122, 1)',
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 15,
		alignItems: 'center',
	},
	button: {
		...defaultStyles.text,
		color: '#FFFFFF',
		fontSize: 18,
	},
});