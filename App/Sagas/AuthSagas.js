import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import SplashScreen from 'react-native-splash-screen'

import { UserSelectors, GetUserProfileActions } from 'app/Redux/UserRedux'
import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import {
  LoginFacebookActions,
  LoginEmailActions,
  RegisterEmailActions,
  SendVerifyCodeActions,
  ConfirmCodeActions,
  SignOutActions,
  ResetPasswordActions,
  ChangePasswordActions,
  resetAuthLoading,
  setAccessData,
  AuthSelectors,
} from 'app/Redux/AuthRedux'

import { showAlert } from 'app/Services/Helpers'
import NavigationActions from 'app/Navigation/NavigationActions'
import { LoadInitialValuesActions, UpdateUserSettingsActions } from 'app/Redux/SettingsRedux'
import { UpdateUserLocationActions } from 'app/Redux/UserRedux'
import { InitWebsocketsActions, CloseWebsocketsActions } from 'app/Redux/ConfigRedux'
import { startApp, startMainView, startSplashScreen } from 'app/Navigation/ConfigureNavigation'
import API from 'app/Services/Api'
import { Metrics } from 'app/Themes'
import { Rollbar } from 'app/Services/Rollbar'
import { persistStore } from 'redux-persist';

const isIos = !Metrics.isAndroid

export function * loginFacebook (action) {
  try {
    yield put(NavigationActions.push(
      routeNames.PendingLoginScreen,
      { ...routeParams.defaultNavbar, backButtonHidden: false },
    ))
    const logoutresult = yield call(API.logoutFacebookSdk)
    const result = yield call(API.loginFacebookSdk)
    if (result.isCancelled) {
      yield put(LoginFacebookActions.Failure())
      yield put(NavigationActions.pop())
    } else {
      const data = yield call(API.getAccessTokenData)

      if (!data) {
        yield put(LoginFacebookActions.Failure())
      } else {
        yield put(setAccessData({ accessToken: data.accessToken }))
        // error response if user did not register previously and accept terms
        const { token, userId } = yield call(API.loginFacebook, data.accessToken)

        yield call(API.updateApiHeaders, token)

        const profile = yield call(API.getUser, userId)

        const { email, accountConfirmed, firstName, gender, about, imgUrl, lastName, birthDate, showNotifications: settings } = profile
        const { new_message, invite_received, invite_accepted, user_joined, optIn } = settings

        const profileObject = {
          email,
          firstName,
          lastName,
          birthDate,
          userId,
          gender,
          about,
          imgUrl,
        }

        yield put(LoginEmailActions.Success({
          token,
          profile: profileObject,
        }))

        yield put(UpdateUserSettingsActions.Success({
          settings: {
            newMessagesNotif: new_message,
            inviteReceivedNotif: invite_received,
            inviteAnswerNotif: invite_accepted,
            userJoinedNotif: user_joined,
            optIn: optIn,
          },
        }))
    

        if (!birthDate) {
          yield put(NavigationActions.push(
            routeNames.ProfileScreen,
            { ...routeParams.defaultNavbar, backButtonHidden: true, title: 'Profile' },
          ))
        } else {
          yield put(InitWebsocketsActions.Attempt())
          yield put(LoadInitialValuesActions.Attempt())
          yield delay(2000)
          startMainView()
        }
      }
    }
  } catch (error) {
    console.log(error)
    yield put(LoginFacebookActions.Failure())
    if (error.status === 406) {
      yield put(NavigationActions.push(routeNames.AcceptTermsScreen, routeParams.noNavbar, { registerType: 'FACEBOOK_REGISTER' }, 0))
    } else {
      SignOutActions.Attempt()
    }
  }
}

export function * registerFacebook (action) {
  try {
    yield put(NavigationActions.push(
      routeNames.PendingLoginScreen,
      { ...routeParams.defaultNavbar, backButtonHidden: false },
    ))
    const accessToken = yield select(AuthSelectors.accessToken)
    const { token, userId } = yield call(API.registerFacebook, accessToken)
    yield call(API.updateApiHeaders, token)

    const profile = yield call(API.getUser, userId)

    const { email, accountConfirmed, firstName, gender, about, imgUrl, lastName, birthDate } = profile
    const profileObject = {
      email,
      firstName,
      lastName,
      birthDate,
      userId,
      gender,
      about,
      imgUrl,
    }

    yield put(LoginEmailActions.Success({
      token,
      profile: profileObject,
    }))
    yield put(UpdateUserLocationActions.Attempt({latitude: 0, longitude: 0}))

    if (!birthDate) {
      yield put(NavigationActions.push(
        routeNames.ProfileScreen,
        { ...routeParams.defaultNavbar, backButtonHidden: true, title: 'Profile' },
      ))
    } else {
      yield put(LoadInitialValuesActions.Attempt())
      yield delay(2000)
      startMainView()
    }
  } catch (error) {
    // showAlert(error.message)
    yield put(LoginFacebookActions.Failure())
    yield put(SignOutActions.Attempt())
    Rollbar.error(error)
    console.log(error)
  }
}

export function * failureFacebook(action) {
  // SignOutActions.Attempt()
}

export function * registerEmail (action) {
  try {
    const { email, password, optIn } = action
    const { userId, token } = yield call(API.register, email, password, optIn)
    yield call(API.updateApiHeaders, token)

    const profileObject = {
      email,
      userId,
    }

    yield put(RegisterEmailActions.Success({ profile: profileObject }))


    yield put(NavigationActions.push(
      routeNames.EmailVerificationScreen,
      routeParams.transparentNavbar,
      { initialValues: { email, token, code: '' } }
    ))

  } catch (error) {
    console.log(error)
    const { data, message, status } = error
    if (data && data.message === 'User already taken') {
      showAlert('User already exists. Log in to the application')
    } else if (!data && !status) {
      showAlert('Check your connection or try again later.')
    } else if (data && data.message) {
      showAlert(data.message)
    }
    yield put(RegisterEmailActions.Failure(error))
  }
}

export function * signOut (action) {
  try {
    persistStore().purge();

    yield put(CloseWebsocketsActions.Attempt())
    startApp()
    yield put(SignOutActions.Success())
  } catch (error) {
    yield put(SignOutActions.Failure())
    startApp()
  }
}

export function * resetPassword (action) {
  try {
    const { email } = action

    const { userId } = yield call(API.forgotPassword, email)
    yield put(ResetPasswordActions.Success({ email, userId }))
    yield put(NavigationActions.push(
      routeNames.ChangePasswordScreen,
      routeParams.transparentNavbar,
      { initialValues: { email, code: '' } },
    ))
  } catch (error) {
    const { data, message } = error
    if (data && data.message === 'User Not found') {
      showAlert(`User doesn't exist`)
    } else {
      showAlert(message)
    }
    yield put(ResetPasswordActions.Failure())
  }
}

export function * changePassword (action) {
  const { code, password, email } = action

  try {
    yield call(API.changePassword, email, code, password)
    yield put(NavigationActions.popToRoot())
    yield put(ChangePasswordActions.Success())

    showAlert('Password successfully changed!')
  } catch (error) {
    showAlert(error.message)
    yield put(ChangePasswordActions.Failure())
  }
}
