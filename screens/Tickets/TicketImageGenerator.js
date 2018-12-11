export const TicketImageGenerator = (color) => {
	let imageURI;

	if (color === 'yellow') {
		imageURI = require('../../assets/images/tickets/ticket_yellow.png');
	} else if (color === 'red') {
		imageURI = require( '../../assets/images/tickets/ticket_red.png');
	} else if (color === 'green') {
		imageURI = require( '../../assets/images/tickets/ticket_green.png');
	} else if (color === 'blue') {
		imageURI = require( '../../assets/images/tickets/ticket_blue.png');
	}
	else {
		imageURI = require( '../../assets/images/jckt_logo.png');
	}
	return imageURI;
};

