import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { LoginFacebookActions } from 'app/Redux/AuthRedux'
import { GradientButton, Label } from 'app/Components'
import { Images } from 'app/Themes'
import SplashScreen from 'react-native-splash-screen'

import styles from './LaunchScreenStyles'

class LaunchScreenView extends Component {
  constructor (props) {
    super(props)
    NavigationActions.setNavigator(props.navigator)
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  
  handleOnLoginPress = () => {
    const { navigateTo } = this.props

    navigateTo(routeNames.LoginScreen, routeParams.transparentNavbar)
  }

  handleOnRegisterPress = () => {
    const { navigateTo } = this.props
    navigateTo(routeNames.RegisterScreen, routeParams.transparentNavbar)
  }

  handleOnFacebookSignInPress = () => this.props.loginFacebook()

  render () {
    const { withoutContent } = this.props
    if (!!withoutContent) return <View />

    return (
      <View style={styles.background} accessibilityLabel={'launchscreen'}>
        <View style={styles.center}>
          <Image
            source={Images.topLaunchImage}
            style={styles.topImage}
          />
          <Text style={styles.text}>
            {'Connect   Make friends   Have fun'}
          </Text>
        </View>

        <View style={styles.centerButtons}>
          <GradientButton
            launch
            accessibilityLabel={'loginButton'}
            testID={'loginButton'}
            label='Log in'
            onPress={this.handleOnLoginPress}
            containerStyle={styles.buttonMargin}
          />
          <View style={styles.marginSmall} />
          <GradientButton
            launch
            label='Sign up'
            onPress={this.handleOnRegisterPress}
          />
        </View>
        <View style={styles.label}>
          <Label
            linkBig
            label='Connect with Facebook'
            onPress={this.handleOnFacebookSignInPress}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = {
  navigateTo: NavigationActions.push,
  onSubmit: LoginFacebookActions.Attempt,
  loginFacebook: LoginFacebookActions.Attempt,
}

export const LaunchScreen = connect(null, mapDispatchToProps)(LaunchScreenView)
