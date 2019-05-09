import { call, put, select, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import SplashScreen from 'react-native-splash-screen'
import { path } from 'ramda'

import {
  UserSelectors,
  UpdateProfileActions,
  GetUserProfileActions,
  AddUserObservingActions,
  AddUserObservingBulkActions,
  UpdateUserLocationActions,
  RemoveUserObservingActions,
  RemoveUserObservingBulkActions,
} from 'app/Redux/UserRedux'

import {
  SettingsSelectors,
  LoadInitialValuesActions,
  UpdateUserSettingsActions,
} from 'app/Redux/SettingsRedux'

import {
  ConfigSelectors,
} from 'app/Redux/ConfigRedux'

import {
  filterJoinedActivities,
} from 'app/Redux/ActivitiesRedux'

import {
  filterInvitesAttempt,
} from 'app/Redux/InvitesRedux'

import {
  GetConversationsActions,
  RemoveInvalidConversationActions,
} from 'app/Redux/ConversationsRedux'

import {
  addUserDataAttempt,
  GetUserDataActions,
  addEventDataAttempt,
  GetEventDataActions,
  filterEventsAttempt,
} from 'app/Redux/StoreRedux'

import {
  GetEventsActions,
  toggleUsersCardsModal,
} from 'app/Redux/HangoutRedux'

import { startMainView, startApp } from 'app/Navigation/ConfigureNavigation'
import NavigationActions from 'app/Navigation/NavigationActions'
import API from 'app/Services/Api'
import { Metrics } from 'app/Themes'
import { GetUsersBulkDataActions } from '../Redux/StoreRedux';
import { InitWebsocketsActions, CloseWebsocketsActions } from 'app/Redux/ConfigRedux'

const isIos = !Metrics.isAndroid


export function * getUserProfile (action) {

  try {
    const { withRedirect = null } = action
    const userId = yield select(UserSelectors.userIdSelector)
    const profile = yield call(API.getUser, userId)

    const { email, firstName, gender, about, imgUrl, lastName, birthDate, showNotifications: settings } = profile
    const { new_message, invite_received, invite_accepted, user_joined, optIn } = settings

    const profileObject = {
      email,
      firstName,
      gender,
      about,
      imgUrl,
      lastName,
      birthDate,
    }

    yield put(GetUserProfileActions.Success({ profile: profileObject }))
    yield put(UpdateUserSettingsActions.Success({
      settings: {
        newMessagesNotif: new_message,
        inviteReceivedNotif: invite_received,
        inviteAnswerNotif: invite_accepted,
        userJoinedNotif: user_joined,
        optIn: optIn,
      },
    }))

    yield put(addUserDataAttempt({
      _id: userId,
      ...profileObject,
    }))
    
    if (withRedirect) {
      yield put(LoadInitialValuesActions.Attempt())
      startMainView()
    }
    isIos && SplashScreen.hide()
  } catch (error) {
    console.log(error)
    startApp()
    yield put(GetUserProfileActions.Failure())
    // isIos && SplashScreen.hide()
  }
}


export function * removeUserLocation () {
  try {
    const userId = yield select(UserSelectors.userIdSelector)
    yield call(API.removeUserLocation, userId)
  } catch (error) {
    console.log(error)
  }
}


