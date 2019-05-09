import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import { connect } from 'react-redux'

import NavigationActions from 'app/Navigation/NavigationActions'
import { LoginFacebookActions, AuthSelectors } from 'app/Redux/AuthRedux'
import styles from './SplashScreenStyles'
// import SplashScreen from 'react-native-splash-screen'

class SplashScreenView extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      // SplashScreen.hide();
  }

  render () {

    return (

        <View style={styles.mainContainer}>
          <Text>testtttt</Text>
          <Image
            source={ require('app/Images/splashscreen.gif') }
            style={{
              width:'100%',
              height: '100%'
            }}
          />
        </View>

    )
  }
}


const mapStateToProps = state => ({
  isAuthLoading: AuthSelectors.authLoadingSelector(state),

})

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  loginFacebook: LoginFacebookActions.Attempt,

}

export const SplashScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreenView)
