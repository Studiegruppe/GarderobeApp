import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import firebase from "firebase";
import globals from "../../assets/Globals";
import {ListItem} from 'react-native-elements';

export default class HistoryScreen extends React.Component {

	userId = globals.uid;
	userPATH = `/Brugere/${this.userId}`;

	oldTicketsArray = [];

	constructor(props) {
		super(props);
		this.state = {
			isLoadingComplete: false,
			data: null,
		}
	};

	componentWillMount() {
		this.retrieveOldTickets();
		setTimeout(() => {
			this.setState({
				isLoadingComplete: true
			})
		}, 2000);
	}

	async retrieveOldTickets() {
		const that = this;
		await firebase.database().ref(`${that.userPATH}/Billetter/Inaktive`).on('value', function (snapshot) {
			if (snapshot.val() !== null) {
				Object.values(snapshot.val()).forEach(function (key) {
					that.oldTicketsArray.push(key);
				});
			}
		});
	}

	render() {
		if (!this.state.isLoadingComplete) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size='large' color='white'/>
				</View>
			)
		}
		if (this.oldTicketsArray.length > 0) {
			return (
				<FlatList
					data={this.oldTicketsArray}
					renderItem={({item}) =>
						<ListItem
							leftAvatar={
								<Image
									style={{width: 65, height: 65}}
									source={{uri: item.barImage}}
								/>
							}
							title={item.barNavn}
							titleStyle={{color: 'black', fontWeight: 'bold'}}
							subtitle={'Checked out: ' + item.checkud.substr(0, item.checkud.length - 7).slice(5, item.checkud.length)}
							subtitleStyle={{color: 'black'}}
							containerStyle={{backgroundColor: 'transparent'}}
							onPress={() => alert("on press her")}
						/>
					}
					keyExtractor={(item, index) => index.toString()}
				/>

			);
		} else {
			return (
				<View style={styles.container}>
					<Text>No tickets in your history</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
