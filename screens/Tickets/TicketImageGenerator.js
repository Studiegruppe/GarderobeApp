export const TicketImageGenerator = (color) => {
	let imageURI;
	if (color === 'yellow') {
		imageURI = 'https://image.freepik.com/free-photo/empty-ticket-picture_1101-20.jpg';
		//imageURI = 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/46636041_213433969549292_6829561577658646528_n.png?_nc_cat=103&_nc_ht=scontent-arn2-1.xx&oh=4e281feee833eda368d71f27a58b0f7f&oe=5CAD2761';
	} else if (color === 'pink') {
		imageURI = 'https://1j8vqu12z4ao3hpwrd3z97lp-wpengine.netdna-ssl.com/wp-content/uploads/2015/09/pinkadmitonerollticket.jpg';
	} else {
		imageURI = 'https://1j8vqu12z4ao3hpwrd3z97lp-wpengine.netdna-ssl.com/wp-content/uploads/2015/09/blueadmitonerolltickets.jpg';
	}
	return {
		uri: imageURI
	};
};