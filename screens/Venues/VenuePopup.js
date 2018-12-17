import React, {Component} from 'react';
import {
	Animated,
	Dimensions,
	Image,
	LayoutAnimation,
	PanResponder,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import {defaultStyles} from "../../assets/Styles";
import VenueOptions from "./VenueOptions";

// Get screen dimensions
const {width, height} = Dimensions.get('window');
// Set default popup height to 50% of screen height
const defaultHeight = height * 0.5;

export default class VenuePopup extends Component {

	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		// Venue object that contains all the needed info about a given venue
		venue: PropTypes.object,
		// Index of chosen amount
		chosenAmount: PropTypes.number,
		// Gets called when user chooses amount
		onChooseAmount: PropTypes.func,
		// Gets called when user books their ticket
		onBuyWardrobeTicket: PropTypes.func,
		// Gets called when popup is closed
		onClose: PropTypes.func,
	};
	// When user starts pulling popup previous height gets stored here
	// to help us calculate new height value during and after pulling
	_previousHeight = 0;


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

	componentWillMount() {
		// Initialize PanResponder to handle move gestures
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				const {dx, dy} = gestureState;
				// Ignore taps
				return dx !== 0 && dy === 0;

			},
			onPanResponderGrant: (evt, gestureState) => {
				// Store previous height before user changed it
				this._previousHeight = this.state.height;
			},
			onPanResponderMove: (evt, gestureState) => {
				// Pull delta and velocity values for y axis from gestureState
				const {dy, vy} = gestureState;
				// Subtract delta y from previous height to get new height
				let newHeight = this._previousHeight - dy;

				// Animate heigh change so it looks smooth
				LayoutAnimation.easeInEaseOut();

				// Switch to expanded mode if popup pulled up above 80% mark
				if (newHeight > height - height / 3) {
					this.setState({expanded: true});
				} else {
					this.setState({expanded: false});
				}

				// Expand to full height if pulled up rapidly
				if (vy < -0.75) {
					this.setState({
						expanded: true,
						height: height
					});
				}

				// Close if pulled down rapidly
				else if (vy > 0.75) {
					this.props.onClose();
				}
				// Close if pulled below 75% mark of default height
				else if (newHeight < defaultHeight * 0.75) {
					this.props.onClose();
				}
				// Limit max height to screen height
				else if (newHeight > height) {
					this.setState({height: height});
				} else {
					this.setState({height: newHeight});
				}
			},
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: (evt, gestureState) => {
				const {dy} = gestureState;
				const newHeight = this._previousHeight - dy;

				// Close if pulled below default height
				if (newHeight < defaultHeight) {
					this.props.onClose();
				}

				// Update previous height
				this._previousHeight = this.state.height;
			},
			onShouldBlockNativeResponder: (evt, gestureState) => {
				// Returns whether this component should block native components from becoming the JS
				// responder. Returns true by default. Is currently only supported on android.
				return true;
			},
		});
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
			imageContainer: this.state.expanded ? {
				width: width / 1.5,         // half of screen width
			} : {
				maxWidth: 110,            // limit width
				marginRight: 10,
			},
			venueContainer: this.state.expanded ? {
				flexDirection: 'column',  // arrange image and venue info in a column
				alignItems: 'center',     // and center them
			} : {
				flexDirection: 'row',     // arrange image and venue info in a row
			},
			venueInfo: this.state.expanded ? {
				flex: 0,
				alignItems: 'center',     // center horizontally
				paddingTop: 20,
			} : {
				flex: 1,
				justifyContent: 'center', // center vertically
			},
			title: this.state.expanded ? {
				textAlign: 'center',
			} : {},
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
		const {
			venue,
			chosenAmount,
			onChooseAmount,
			onBuyWardrobeTicket
		} = this.props;
		// Pull out venue data
		const {venueName, type, venueImage, postalArea, possibleAmounts} = venue || {};
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
						{/* Venue poster, title and type + postal area */}
						<View
							style={[styles.venueContainer, this.getStyles().venueContainer]}
							{...this._panResponder.panHandlers}
						>
							{/* Poster */}
							<View style={[styles.imageContainer, this.getStyles().imageContainer]}>
								<Image source={{uri: venueImage}} style={styles.image}/>
							</View>
							{/* Name, type and postal area */}
							<View style={[styles.venueInfo, this.getStyles().venueInfo]}>
								<Text style={[styles.title, this.getStyles().title]}>{venueName}</Text>
								<Text style={styles.genre}>{type + ', ' + postalArea}</Text>
							</View>
						</View>
						<View>
							{/* Amount */}
							<Text style={styles.sectionHeader}>Amount of items</Text>
							<VenueOptions
								values={possibleAmounts}
								chosen={chosenAmount}
								onChoose={onChooseAmount}
							/>
						</View>
					</View>

					{/* Footer */}
					<View style={styles.footer}>
						<TouchableHighlight
							underlayColor="#80D0C7"
							style={styles.buttonContainer}
							onPress={onBuyWardrobeTicket}
						>
							<Text style={styles.button}>Book My Tickets</Text>
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
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
	content: {
		flex: 1,
		margin: 20,
		marginBottom: 0,
	},
	// Venue container
	venueContainer: {
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
	venueInfo: {
		backgroundColor: 'transparent',     // looks nicer when switching to/from expanded mode
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