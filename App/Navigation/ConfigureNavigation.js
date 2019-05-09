import { Navigation, NativeEventsReceiver } from 'react-native-navigation'
import { Colors, Fonts, Metrics } from 'app/Themes'

import { routes, routeNames, routeParams } from './RouteConst'
import { CheckUserAuthActions } from 'app/Redux/AuthRedux'

import { Platform } from 'react-native'
import Permissions from 'app/Lib/react-native-permissions'

const leftTabButtons = [
  {
    id: 'menu',
    buttonColor: 'black',
    icon: require('../Images/menu.png'),
  },
]

export default (store, Provider) => {
  const registerScreen = ({ name, component }) =>
    Navigation.registerComponent(
      name,
      component,
      store,
      Provider,
    )
  routes.forEach(props => registerScreen(props))

  if (Platform.OS == 'ios') {
    store.dispatch(CheckUserAuthActions.Attempt())

  } else {

    Navigation.isAppLaunched().then(appManuallyLaunched => {
      if (appManuallyLaunched) {
        store.dispatch(CheckUserAuthActions.Attempt({ appManuallyLaunched }))
      } else {
        // otherwise, code is headless and got triggered from push notification handler
        new NativeEventsReceiver().appLaunched(() => {store.dispatch(CheckUserAuthActions.Attempt({ appManuallyLaunched }))}) // save launcher for when push notification gets clicked
      }

    }).catch(err => console.log(err))
  }

}
// withoutContent  -> android bugfix
export const startApp = (withoutContent) => {
  return Navigation.startSingleScreenApp({
    screen: {
      screen: routeNames.LaunchScreen,
      ...routeParams.launchNavbar,
    },
    passProps: { withoutContent: withoutContent || false },
    animationType: 'fade',
    appStyle: {
      hideBackButtonTitle: true,
    },
  })

}

export const startSplashScreen = (withoutContent) => {
  return Navigation.startSingleScreenApp({
    screen: {
      screen: routeNames.SplashScreen,
      ...routeParams.launchNavbar,
    },
    passProps: { withoutContent: withoutContent || false },
    animationType: 'fade',
    appStyle: {
      hideBackButtonTitle: true,
    },
  })

}

const sleep = m => new Promise(r => setTimeout(r, m))

export const startMainView = async() => {

  Permissions.check('location')
  .then(isGranted => {
    if (isGranted == 'denied') {
      return Navigation.startSingleScreenApp({
        screen: {
          screen: routeNames.ShareLocationScreen,
          ...routeParams.noNavbarNoTabs,
        },
        // passProps: { withoutContent: withoutContent || false },
        animationType: 'fade',
        appStyle: {
          hideBackButtonTitle: true,
        },
      })
    }
  
    if (isGranted == 'restricted' || isGranted == 'undetermined') {
      startApp(false)
      return Navigation.startSingleScreenApp({
        screen: {
          screen: routeNames.ShareLocationQuestionScreen,
          ...routeParams.noNavbarNoTabs,
        },
        // passProps: { withoutContent:  false },
        animationType: 'fade',
        appStyle: {
          hideBackButtonTitle: true,
        },
      })

    }
  
    return Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Map',
          screen: routeNames.HangoutTabScreen,
          icon: require('../Images/mapIcon.png'),
          ...routeParams.noNavbar,
          navigatorButtons: {
            leftButtons: leftTabButtons,
          },
        },
        {
          label: 'Activities',
          screen: routeNames.ActivitiesTabScreen,
          icon: require('../Images/tab2.png'),
          ...routeParams.noNavbar,
          navigatorButtons: {
            leftButtons: leftTabButtons,
          },
        },
        {
          label: 'Invites',
          screen: routeNames.InvitesTabScreen,
          icon: require('../Images/tab1.png'),
          ...routeParams.noNavbar,
          navigatorButtons: {
            leftButtons: leftTabButtons,
          },
        },
        {
          label: 'Messages',
          screen: routeNames.MessagesTabScreen,
          icon: require('../Images/chat.png'),
          ...routeParams.tabParams,
          navigatorButtons: {
            leftButtons: leftTabButtons,
          },
        },
  
        /* {
          label: 'My buddies',
          screen: routeNames.MyBuddiesTabScreen,
          icon: require('../Images/tab3.png'),
          ...routeParams.noNavbar,
          navigatorButtons: {
            leftButtons: leftTabButtons
          }
        }, */
      ],
      tabsStyle: {
        tabBarButtonColor: Colors.fontGrayDark,
        tabBarSelectedButtonColor: Colors.fontVioletDark,
        tabBarBackgroundColor: Colors.snow,
        initialTabIndex: 0,
        tabBarTextFontSize: Fonts.scale(10),
        tabBarTextFontFamily: Fonts.type.base,
        drawUnderTabBar: true
      },
      appStyle: {
        orientation: 'portrait',
        navBarNoBorder: true,
        systemItem: 'sideMenu',
        forceTitlesDisplay: true,
        tabBarTextFontSize: Fonts.scale(10),
        hideBackButtonTitle: true,
  
        tabBarTextFontFamily: Fonts.type.base,
        tabBarButtonColor: Colors.fontGrayDark,
        tabBarSelectedButtonColor: Colors.fontVioletDark,
        tabBarBackgroundColor: Colors.snow,
        initialTabIndex: 0,
      },
      animationType: 'none',
  
      drawer: {
        left: {
          screen: routeNames.DrawerMenuScreen,
        },
        style: {
          drawerShadow: false,
          ...routeParams.noNavbar,
          leftDrawerWidth: Metrics.isAndroid ? 0 : 70,
          contentOverlayColor: 'rgba(0, 0, 0, 0.25)',
        },
        disableOpenGesture: true,
      },
    })

    
  })
  .catch(err => {
    console.log(err)

    // RNExitApp.exitApp()
  })



}
