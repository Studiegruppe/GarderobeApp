import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {defaultStyles} from "../../assets/Styles";


// Get screen dimensions
const {width, height} = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 3;


export default class BarPoster extends Component {

	// Component prop types
	static propTypes = {
		// Bar object with title, genre, and poster
		bar: PropTypes.object.isRequired,
		// Called when user taps on a poster
		onOpen: PropTypes.func.isRequired,
	};

	render() {
		const {bar, bar: {Navn, image, type, postalCode}, onOpen} = this.props;
		return (
			<TouchableOpacity style={styles.container} onPress={() => onOpen(bar)}>
				<View style={styles.imageContainer}>
					<Image
						source={{uri: image ? image : 'https://ichef.bbci.co.uk/news/660/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg'}}
						style={styles.image}/>
				</View>
				<Text style={styles.title} numberOfLines={1}>{Navn}</Text>
				<Text style={styles.genre} numberOfLines={1}>{type + ', ' + postalCode}</Text>
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