import React from 'react';

import {Location, MapView, Permissions} from 'expo';
import firebase from 'firebase';

const debugBarer = false;
const debug = false;

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

  generateMarkers() {
    let markerArray = [];
    let that = this;

    firebase.database().ref('Barer').once('value', function (snapshot) {

      let barer = snapshot.val();
      debugBarer && console.log(barer);

      for (let key in barer) {
        if (barer.hasOwnProperty(key)) {
          debug && console.log(key);
          let bar = barer[key];
          markerArray.push(
            <MapView.Marker
              coordinate={{
                latitude: bar.Latitude,
                longitude: bar.Longitude
              }}
              title={bar.Navn}
              description={"description"}
              key={key}
            />
          )
        }
      }

      that.setState({
        markers: markerArray
      });
    });
  }

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