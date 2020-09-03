import React, {Component} from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar, Button, Image } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false
    }
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '51762242444-d23q56ii1ek63upolf4m0mliscj166qu.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.sectionContainer}>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
              disabled={this.state.isSigninInProgress} />
          </View>
          <View style={styles.buttonContainer}>
            {!this.state.loggedIn && <Text>You are currently logged out</Text>}
            {this.state.loggedIn && <Button onPress={this.signOut} title="Signout" color="#841584"/>
            }
          </View>
          {this.state.loggedIn && <View>
            <View style={styles.listHeader}>
              <Text>User Info</Text>
            </View>
            <View style={styles.dp}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo }}
              />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.title}>ID</Text>
              <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text>
            </View>
          </View>}
        </SafeAreaView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
  },
  detailContainer: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  dp:{
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default App;