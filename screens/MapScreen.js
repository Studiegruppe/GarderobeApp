import React from 'react';
import {Location, MapView, Permissions} from 'expo';
import firebase from 'firebase';


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


  async _getBarCoords() {

    this.setState({
      barLat: firebase.database().ref('Barer/BarID/Longitude'),
      barLong: firebase.database().ref('Barer/BarID/Latitude')
    })
    console.log(this.state.barLat, this.state.barLong);
  }


  componentWillMount() {
    this._getLocationAsync();
    this._getBarCoords();
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
        <MapView.Marker
          coordinate={{
            latitude: this.state.barLat,
            longitude: this.state.barLong
          }}
          title={"title"}
          description={"description"}
        />
      </MapView>

    );
  }
}
