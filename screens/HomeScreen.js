import React from 'react';
import {Text, View, StyleSheet,} from 'react-native';
/*import Styles from "../assets/Styles";*/
import {Button} from "react-native-elements";
import firebase from 'firebase';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";


const debug = true;


const Aktiv = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            Her kommer den aktive billet til at være
        </Text>
    </View>
);

const Historik = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            Her kommer historikken
        </Text>
    </View>
);

const Tilbud= ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            Tilbud
        </Text>
    </View>
);

const Checkind = ({label}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            Her kan man checke ind
        </Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 28,
    },
});


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      debug && console.log("LOGGED OUT");
    } catch (e) {
      debug && console.log(e);
    }
  };

  renderLogOutButton() {
    return (
      <Button title="logout" onPress={() => this.signOutUser()}/>
    )
  }

  render() {
    return (
      /*<View style={Styles.containerStyle}>
        <Text> Dette er home screen bøsse</Text>
      </View>*/
        <View style={[styles.container, {paddingTop: 20}]}>
            <ScrollableTabView
                tabBarActiveTextColor="#53ac49"
                renderTabBar={() => <TabBar underlineColor="#53ac49" />}>
                <Aktiv tabLabel={{label: "Aktiv"}} label="Aktiv"/>
                <Historik tabLabel={{label: "Historik", badge: 5}} label="Historik"/>
                <Tilbud tabLabel={{label: "Tilbud"}} label="Tilbud"/>
                <Checkind tabLabel={{label: "Checkind"}} label="Checkind"/>
            </ScrollableTabView>



        </View>
    );
  }
}