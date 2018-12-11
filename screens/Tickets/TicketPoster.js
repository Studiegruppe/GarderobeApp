import React, {Component} from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {TicketImageGenerator} from "./TicketImageGenerator";


// Get screen dimensions
const {width, height} = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 1, rows = 2;


export default class TicketPoster extends Component {

  // Component prop types
  static propTypes = {
    // Ticket object
    ticket: PropTypes.object.isRequired,
    // Called when user taps on an active ticket
    onOpen: PropTypes.func.isRequired,
  };

  ticketContainerStyle = function (color) {
    return {
      flex: 1,
      backgroundColor: color,
      borderRadius: 10,
    }
  };


  render() {
    const {ticket, ticket: {barNavn, antal, farve, checkind, nummer}, onOpen} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(ticket)}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={TicketImageGenerator(farve)} resizeMode="contain"
            style={styles.image}>
            <Text style={[styles.imageText1, styles.firstTextOnTicket]} numberOfLines={1}>Antal: {antal}</Text>
            <Text style={styles.imageText} numberOfLines={1}>{barNavn}</Text>
            <Text style={styles.imageText}
                  numberOfLines={1}>{checkind.substr(0, checkind.length - 7).slice(5, checkind.length)}</Text>
            <Text style={styles.amountText} numberOfLines={1}> NR: {nummer}</Text>
            <Text style={styles.amountText2} numberOfLines={1}> NR: {nummer}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  imageText1: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 20,
  },
  imageText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 0,
  },
  firstTextOnTicket: {
    marginTop: '25%',
  },

  amountText2: {
    transform: [{rotate: '270deg'}],
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 30,
    marginLeft: -250,
    marginTop: -25,
  },
  amountText: {
    transform: [{rotate: '90deg'}],
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 250,
    marginTop: -54,
  },

  image: {
    flex: 1,
  },
});