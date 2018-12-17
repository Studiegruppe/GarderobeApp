/**
 * Grabbing ticket colours and returning the correct ticket image, if none are found it returns our logo
 *
 * @param ticketColour
 * @returns {*}
 * @constructor
 */
export const TicketImageGenerator = (ticketColour) => {
	let imageURI;

	if (ticketColour === 'yellow') {
		imageURI = require('../../assets/images/tickets/ticket_yellow.png');
	} else if (ticketColour === 'red') {
		imageURI = require('../../assets/images/tickets/ticket_red.png');
	} else if (ticketColour === 'green') {
		imageURI = require('../../assets/images/tickets/ticket_green.png');
	} else if (ticketColour === 'blue') {
		imageURI = require('../../assets/images/tickets/ticket_blue.png');
	} else {
		imageURI = require('../../assets/images/jckt_logo.png');
	}
	return imageURI;
};

