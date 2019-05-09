import React, { PureComponent } from 'react'
import { View, PushNotificationIOS,Platform } from 'react-native'
import { connect } from 'react-redux'

import { SetNotificationTokenActions } from 'app/Redux/UserRedux'
import PushNotification from 'react-native-push-notification'

class NotificationClass extends PureComponent {
  componentDidMount () {
    const { registerToken } = this.props

    PushNotificationIOS.addEventListener('registrationError', console.log)

    PushNotification.configure({
      onRegister: function (token) {
        registerToken(token )
      },
      onNotification: function (notification) {
        if (Platform.OS == 'android' && !notification.foreground && !notification['google.message_id']) {

          PushNotification.localNotification({
            title: notification.title,
            message: notification.msg,
            soundName: 'default',
            playSound: true,
          })
  
        }
      },
      senderID: "",
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
      
  }

  componentWillUnmount () {
    // this.messageListener()
  }

  render () {
    return <View />
  }
}

const mapDispatchToProps = {
  registerToken: SetNotificationTokenActions.Attempt,
}

const mapStateToProps = (state) => {
  return {
    selectedTabIndex: state.config.selectedTabIndex
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationClass)
