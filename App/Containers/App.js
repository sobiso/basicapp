import '../Config'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { setJSExceptionHandler } from 'react-native-exception-handler'
import { PushNotificationIOS, Platform } from 'react-native'

import configureNavigation, { startApp } from '../Navigation/ConfigureNavigation'
import createStore from '../Redux'
import PushNotification from 'react-native-push-notification'
import { Rollbar } from 'app/Services/Rollbar'

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Rollbar.error(e)
  } else {
    Rollbar.warning(e)
  }
}

setJSExceptionHandler(errorHandler, true)


const App = async () => {
  if (Platform.OS == 'ios') {
    PushNotificationIOS.setApplicationIconBadgeNumber(0)
  }

  PushNotification.configure({
    onRegister: function (token) {
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

      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },
    senderID: '698726728132',
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  })

  try {
    const store = createStore ()
    persistStore(store, { }, () => {
      configureNavigation(store, Provider)
    })
  } catch (e) {
    Rollbar.error(e)
    console.log(e)
  }

}

export default App
