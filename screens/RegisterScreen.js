import React from 'react';
import {Text, TextInput, StyleSheet, View, ActivityIndicator, Button} from 'react-native';
import Styles from '../assets/Styles';
import firebase from 'firebase';

export default class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({
      error: '',
      loading: true
    });


    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onSignUpSucces.bind(this))
      .catch(this.onSignUpFailed.bind(this));

  }

  onSignUpSucces() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    alert("Bruger er nu oprettet")
    this.setProfile();
  }

  onSignUpFailed(err) {
    this.setState({
      loading: false,
      error: err.message
    });

  }

  setProfile = () => {
    const ref = firebase.database().ref(`/Brugere/${firebase.auth().currentUser.uid}`);
    const obj = {
      name: this.state.name,
      Billetter: {
        Inaktive: {
          ignore: 'ignore'
        },
        Aktive: {
          ignore: 'ignore'
        }
      }
    };
    ref.set(obj)
  };


  render() {
    return (
      <View style={Styles.containerStyle}>
        <TextInput
          label='Username'
          placeholder='Email'
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          placeholder='Password'
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({password})}
        />

        <TextInput
          placeholder='Name'
          value={this.state.name}
          onChangeText={name => this.setState({name})}
        />
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        {this.renderButton()}

      </View>
    );
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='small'/>
    }
    return (
      <Button title="Sign up" onPress={this.onButtonPress.bind(this)}>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});










