import React from 'react';

import {Location, MapView, Permissions} from 'expo';
import firebase from 'firebase';
import {Text, View} from "react-native";

const debugBarer = false;
const debug = false;

export default class MapScreen extends React.Component {

	/**
	 * Header removal
	 * @type {{header: null}}
	 */
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			barLat: 0,
			barLong: 0,
			flex: 0
		};
	}

	/**
	 * When mapScreen is loaded below functions are called
	 */
	componentWillMount() {
		this._getLocationAsync();
		this.generateMarkers();

	}

	/**
	 * Getting users location PERMISSION
 	 * @returns {Promise<void>}
	 * @private
	 */
	_getLocationAsync = async () => {
		let {status} = await Permissions.askAsync(Permissions.LOCATION);
		if (status === 'granted') {
			let location = await Location.getCurrentPositionAsync({});
			this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude});
			this.setState({flex: 1});
		} else {
			alert("Permission to access location was denied");
		}
	};

	/**
	 * Function for generating map-pins using Latitude and longitude storing rendable code in array
 	 */
	generateMarkers() {
		let markerArray = [];
		let that = this;

		firebase.database().ref('Venues/').once('value', function (snapshot) {
			let venues = snapshot.val();
			debugBarer && console.log(venues);
			for (let key in venues) {
				if (venues.hasOwnProperty(key)) {
					let venue = venues[key];
					debug && !venue.longitude && console.log(`${venue.venueName}: is missing longitude in the database`);
					debug && !venue.latitude && console.log(`${venue.venueName}: is missing latitude in the database`);
					markerArray.push(
						<MapView.Marker
							coordinate={{
								latitude: venue.latitude,
								longitude: venue.longitude,
							}}
							key={key}
						>
							<MapView.Callout>
								<View>
									{
										venue.venueName ? <Text style={{fontWeight: 'bold',}}>{venue.venueName}</Text> : <Text style={{color: 'red'}}>missing name</Text>
									}
									{
										venue.address ? <Text>{venue.address}</Text> : <Text style={{color: 'red'}}>Missing address</Text>
									}
								</View>
							</MapView.Callout>
						</MapView.Marker>
					);
				}
			}

			that.setState({
				markers: markerArray
			});
		});
	}

	/**
	 * Render method setting region + zoom distances(delta)
	 */
	render() {
		return (
			<MapView
				style={{flex: this.state.flex}}
				showsUserLocation={true}
				showsMyLocationButton={true}
				followsUserLocation={false}
				region={{
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
				{this.state.markers}
			</MapView>

		);
	}
}