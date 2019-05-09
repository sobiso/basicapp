import {
  SingleEventDetailsScreen,
  MultiEventDetailsScreen,
  EmailVerificationScreen,
  TermsConditionsScreen,
  ForgotPasswordScreen,
  ChangePasswordScreen,
  ActivitiesTabScreen,
  PrivacyPolicyScreen,
  EventDetailsScreen,
  UserEventDetailsScreen,
  MyBuddiesTabScreen,
  MessagesTabScreen,
  HangoutTabScreen,
  DrawerMenuScreen,
  InvitesTabScreen,
  ContactUsScreen,
  SettingsScreen,
  RegisterScreen,
  ProfileScreen,
  LaunchScreen,
  LoginScreen,
  PendingLoginScreen,
  AcceptTermsScreen,
  ShareLocationScreen,
  ShareLocationQuestionScreen,
  SplashScreen,
  UserActivitiesScreen,
} from 'app/Containers'

import {
  ChatModal,
  FilterModal,
  CreateActivityModal,
  SelectLocationModal,
  EventParticipantsModal,
  ShowLocationModal,
  ShowAddActivityModal,
  ShowEventDescriptionModal

} from 'app/Components/Modals'

import { Colors, Metrics } from 'app/Themes'
import Fonts from '../Themes/Fonts'

const routeNames = {
  LoginScreen: 'com.test.LoginScreen',
  PendingLoginScreen: 'com.test.PendingLoginScreen',
  LaunchScreen: 'com.test.LaunchScreen',
  ProfileScreen: 'com.test.ProfileScreen',
  SettingsScreen: 'com.test.SettingsScreen',
  RegisterScreen: 'com.test.RegisterScreen',

  
}

const routeParams = {
  noNavbar: {
    navigatorStyle: {
      navBarHidden: true,
      screenBackgroundColor: Colors.background,
    },
  },
  noNavbarNoTabs: {
    navigatorStyle: {
      navBarHidden: true,
      // screenBackgroundColor: Colors.fontVioletDark,
      // navBarBackgroundColor: Colors.background,
    },
  },
  launchNavbar: {
    navigatorStyle: {
      navBarHidden: true,
      screenBackgroundColor: Colors.snow,
    },
  },
  transparentNavbar: {
    navigatorStyle: {
      navBarNoBorder: true,
      navBarTitleTextCentered: true,
      navBarButtonColor: Colors.fontVioletDark,
      navBarBackgroundColor: Colors.background,
      topBarElevationShadowEnabled: false,
      screenBackgroundColor: Colors.background,
    },
    appStyle: {
      navBarTitleTextCentered: true,
    },
  },
  tabParams: {
    navigatorStyle: {
      screenBackgroundColor: Colors.background,
      navBarButtonColor: Colors.fontGrayDark,
      navBarTransparent: true,
      navBarBackgroundColor: Colors.background,
      topBarElevationShadowEnabled: false,
      navBarTranslucent: !Metrics.isAndroid,
      drawUnderNavBar: true,
    },
  },
  defaultNavbar: {
    navigatorStyle: {
      screenBackgroundColor: Colors.snow,
      navBarButtonColor: Colors.fontGrayDark,
      topBarElevationShadowEnabled: false,
      navBarTitleTextCentered: true,
    },
  },
  modal: {
    style: {
      tapBackgroundToDismiss: true,
    },
  },
  eventDetailsNavbar: {
    navigatorStyle: {
      screenBackgroundColor: Colors.background,
      navBarHidden: true,
    },
  },
}

const routes = [
  { name: routeNames.ChatModal, component: () => ChatModal },
  { name: routeNames.FilterModal, component: () => FilterModal },
  { name: routeNames.LoginScreen, component: () => LoginScreen },
  { name: routeNames.PendingLoginScreen, component: () => PendingLoginScreen },
  { name: routeNames.LaunchScreen, component: () => LaunchScreen },
  { name: routeNames.ProfileScreen, component: () => ProfileScreen },

  { name: routeNames.SplashScreen, component: () => SplashScreen },
]

export { routeParams, routeNames, routes }
