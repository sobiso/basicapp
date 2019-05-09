import { call, put, select, all } from 'redux-saga/effects'
import { path } from 'ramda'

import {
  HangoutSelectors,
  GetEventsActions,
  PrepareEventsActions,
  SetHangoutFiltersActions,
  GetUserActivitiesActions,
  PrepareToRemoveEventActions,
} from 'app/Redux/HangoutRedux'

import {
  UserSelectors,
  AddUserObservingActions,
  AddUserObservingBulkActions,
  RemoveUserObservingActions,
  RemoveUserObservingBulkActions
} from 'app/Redux/UserRedux'

import {
  StoreSelectors,
  GetUserDataActions,
  GetUsersBulkDataActions,
  addEventDataAttempt
} from 'app/Redux/StoreRedux'

import {
  ConfigSelectors,
} from 'app/Redux/ConfigRedux'

import NavigationActions from 'app/Navigation/NavigationActions'
import API from 'app/Services/Api'
import { Activities } from 'app/Constants/Activities'

export function * setHangoutsFilters (action) {
  try {
    const { type, ...filters } = action
    yield put(SetHangoutFiltersActions.Success({ filters }))
    yield put(GetEventsActions.Attempt())
  } catch (error) {
    yield put(SetHangoutFiltersActions.Failure())
  }
}


export function * getUserActivities (action) {
  const { id } = action
  try {
    const { results } = yield call(API.getUserActivities, id)
    yield put(GetUserActivitiesActions.Success({ activities: results }))
  } catch (error) {
    console.log(error)
    yield put(GetUserActivitiesActions.Failure())
  }
}