import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {defaultStyles} from "../../assets/Styles";


// Get screen dimensions
const {width, height} = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 3;


export default class VenuePoster extends Component {

	// Component prop types
	static propTypes = {
		// Bar object with title, genre, and poster
		venue: PropTypes.object.isRequired,
		// Called when user taps on a poster
		onOpen: PropTypes.func.isRequired,
	};

	render() {
		const {venue, venue: {venueName, venueImage, type, postalArea}, onOpen} = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={() => onOpen(venue)}>
				<View style={styles.imageContainer}>
					<Image
						source={{uri: venueImage ? venueImage : 'https://static.designmynight.com/uploads/2016/10/Generic-1-optimised.jpg'}}
						style={styles.image}/>
				</View>
				<Text style={styles.title} numberOfLines={1}>{venueName}</Text>
				<Text style={styles.genre} numberOfLines={1}>{type + ', ' + postalArea}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginBottom: 10,
		height: (height - 20 - 20) / rows - 10,
		width: (width - 10) / cols - 10,
	},
	imageContainer: {
		flex: 1,                          // take up all available space
	},
	image: {
		borderRadius: 10,                 // rounded corners
		...StyleSheet.absoluteFillObject, // fill up all space in a container
	},
	title: {
		...defaultStyles.text,
		fontSize: 14,
		marginTop: 4,
	},
	genre: {
		...defaultStyles.text,
		color: '#BBBBBB',
		fontSize: 12,
		lineHeight: 14,
	},
});