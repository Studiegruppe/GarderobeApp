import React from 'react';
import {View, Text} from 'react-native';

import {Permissions, Location, MapView} from 'expo';
import firebase from 'firebase';
import Marker from 'react-native-maps';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            barLat: 0,
            barLong: 0,
            flex: 0
        }
    }

    componentWillMount() {
        this._getLocationAsync();
        this.generateMarkers();

    }

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
                /*<MapView.Marker
                    coordinate={{
                        latitude: this.state.barLat,
                        longitude: this.state.barLong
                    }}
                    title={"title"}
                    description={"description"}
                />*/
            </MapView>

        );
    }

    generateMarkers() {
        let markerArray = [];

        var that = this;
        firebase.database().ref('Barer').once('value', function (snapshot) {

            let barer = snapshot.val();
            console.log(barer);

            for (var key in barer) {
                var bar = barer[key];
                markerArray.push(
                    <MapView.Marker
                        coordinate={{
                            latitude: bar.Latitude,
                            longitude: bar.Longitude
                        }}
                        title={"title"}
                        description={"description"}
                    />
                )
            }

            that.setState({
                markers: markerArray
            });
        });

        }
}