import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, View} from 'react-native';
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
			Object.values(snapshot.val()).forEach(function (key) {
				that.oldTicketsArray.push(key);
			});
			//that.oldTicketsObj = snapshot.val();
		});
	}

	render() {
		console.log(this.oldTicketsArray);
		if (!this.state.isLoadingComplete) {
			return (
				<View style={styles.container}>
					<ActivityIndicator/>
				</View>
			)
		}
		return (
			<FlatList
				data={this.oldTicketsArray}
				renderItem={({item}) =>
					<ListItem
						avatar={
							<Image
								style={{width: 65, height: 65}}
								source={{uri: item.image}}
							/>
						}
						title={item.barNavn}
						titleStyle={{color: 'tomato', fontWeight: 'bold'}}
						subtitle={item.artist}
						subtitleStyle={{color: 'tomato'}}
						chevronColor={'tomato'}
						containerStyle={{backgroundColor: 'white'}}
						onPress={() => alert("Album trykket på: " + item.title + "\n her kan vi clickhandle")}
					/>
				}
				keyExtractor={(item, index) => index.toString()}
			/>

		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
