import { createAsyncAction, createAsyncType, createReducer } from 'app/Services/reduxHelpers'
import { path } from 'ramda'
import { createSelector } from 'reselect'
import {
  REGISTER_EMAIL,
  LOGIN_FACEBOOK,
  RESET_PASSWORD,
  LOGIN_EMAIL,
  CONFIRM_CODE,
  SIGN_OUT,
} from './AuthRedux'
import {initialRegionValues } from 'app/Redux/HangoutRedux'
/* ------------- Types ------------- */

const UPDATE_PROFILE_TYPE = 'UPDATE_PROFILE_TYPE'

const GET_USER_PROFILE_TYPE = 'GET_USER_PROFILE_TYPE'
const UPDATE_USER_LOCATION_TYPE = 'UPDATE_USER_LOCATION_TYPE'
const ADD_USER_OBSERVING_TYPE = 'user/ADD_USER_OBSERVING'
const ADD_USER_OBSERVING_BULK_TYPE = 'user/ADD_USER_OBSERVING_BULK'
const REMOVE_USER_OBSERVING_TYPE = 'user/REMOVE_USER_OBSERVING'
const REMOVE_USER_OBSERVING_BULK_TYPE = 'user/REMOVE_USER_OBSERVING_BULK'
const BLOCK_USER_TYPE = 'user/BLOCK_USER_TYPE'
const REPORT_USER_TYPE = 'user/REPORT_USER_TYPE'
const SET_NOTIFICATION_TOKEN_TYPE = 'user/SET_NOTIFICATION_TOKEN'
const SET_INACTIVE_TYPE = 'user/SET_INACTIVE'
const REMOVE_USER_LOCATION_TYPE = 'user/REMOVE_USER_LOCATION'

/* ------------- Action Creators ------------- */

export const UPDATE_PROFILE = createAsyncType(UPDATE_PROFILE_TYPE)
export const UpdateProfileActions = createAsyncAction(UPDATE_PROFILE)

export const GET_USER_PROFILE = createAsyncType(GET_USER_PROFILE_TYPE)
export const GetUserProfileActions = createAsyncAction(GET_USER_PROFILE)

export const UPDATE_USER_LOCATION = createAsyncType(UPDATE_USER_LOCATION_TYPE)
export const UpdateUserLocationActions = createAsyncAction(UPDATE_USER_LOCATION)

export const ADD_USER_OBSERVING = createAsyncType(ADD_USER_OBSERVING_TYPE)
export const AddUserObservingActions = createAsyncAction(ADD_USER_OBSERVING)

export const ADD_USER_OBSERVING_BULK = createAsyncType(ADD_USER_OBSERVING_BULK_TYPE)
export const AddUserObservingBulkActions = createAsyncAction(ADD_USER_OBSERVING_BULK)

export const REMOVE_USER_OBSERVING = createAsyncType(REMOVE_USER_OBSERVING_TYPE)
export const RemoveUserObservingActions = createAsyncAction(REMOVE_USER_OBSERVING)

export const REMOVE_USER_OBSERVING_BULK = createAsyncType(REMOVE_USER_OBSERVING_BULK_TYPE)
export const RemoveUserObservingBulkActions = createAsyncAction(REMOVE_USER_OBSERVING_BULK)

export const BLOCK_USER = createAsyncType(BLOCK_USER_TYPE)
export const BlockUserActions = createAsyncAction(BLOCK_USER)

export const REPORT_USER = createAsyncType(REPORT_USER_TYPE)
export const ReportUserActions = createAsyncAction(REPORT_USER)

export const SET_NOTIFICATION_TOKEN = createAsyncType(SET_NOTIFICATION_TOKEN_TYPE)
export const SetNotificationTokenActions = createAsyncAction(SET_NOTIFICATION_TOKEN)

export const SET_INACTIVE = createAsyncType(SET_INACTIVE_TYPE)
export const SetInactiveActions = createAsyncAction(SET_INACTIVE)

export const REMOVE_USER_LOCATION = createAsyncType(REMOVE_USER_LOCATION_TYPE)
export const RemoveUserLocationActions = createAsyncAction(REMOVE_USER_LOCATION)

/* ------------- Initial State ------------- */

export const initialState = {
  isUserLoading: false,
  profile: null,
  location: initialRegionValues,
  token: null,
  observing: {},
}

/* ------------- Selectors ------------- */
const stateSelector = state => state.user

const observingSelector = state => stateSelector(state).observing

const isObservingSelector = createSelector(
  observingSelector,
  (state, userId) => userId,
  (observing, userId) => !!observing[userId],
)

const isAdmin = createSelector(
  stateSelector,
  (user) => {
    const {firstName, lastName } = (user ||{}).profile
    return firstName == '' && lastName == '.useradmin.'
  }
)

export const UserSelectors = {
  isObservingSelector,
  isAdmin,
  userLoadingSelector: state => state.user.isUserLoading,
  userIdSelector: state => path(['user', 'profile', 'userId'], state),
  userTokenSelector: state => path(['user', 'token'], state),
  userEmailSelector: state => path(['user', 'profile', 'email'], state),
  userAvatarSelector: state => path(['user', 'profile', 'imgUrl'], state),
  userFirstNameSelector: state => path(['user', 'profile', 'firstName'], state),
  userLastNameSelector: state => path(['user', 'profile', 'lastName'], state),
  userBirthDateSelector: state => path(['form', 'ProfileForm', 'values', 'birthDate'], state),
  userLocationSelector: state => path(['user', 'location'], state),
  userBirthDateErrorSelector: state => path(['form', 'ProfileForm', 'syncErrors', 'birthDate'], state),
}

/* ------------- Reducers ------------- */

export const registerEmailSuccess = (state, { profile }) => ({
  profile,
})

export const loginSuccess = (state, { profile, token }) => ({
  profile,
  token,
})

export const confirmCodeSuccess = (state, { token }) => ({
  token,
})

export const loginFacebookSuccess = (state, { user, keys }) => ({
  profile: { ...user },
  keys: {
    ...state.keys,
    keys,
  },
})

export const loginAttempt = () => ({
  profile: null,
})

export const resetPasswordSuccess = (state, { email }) => ({
  profile: { email },
})

export const updateProfileAttempt = () => ({
  isUserLoading: true,
})

export const updateProfileSuccess = (state, { profile }) => ({
  profile: {
    ...state.profile,
    ...profile,
  },
  isUserLoading: false,
})

export const updateProfileFailure = (state) => ({
  isUserLoading: false,
})

export const clearUserData = (state) => ({
  ...initialState,
  profile: {
    email: state.profile.email,
  },
})

export const updateUserLocation = (state, { location }) => ({
  location,
})

export const addToObserve = ({ observing }, { userId }) => ({
  observing: {
    ...observing,
    [userId]: userId,
  },
})

export const addToObserveBulk = ({ observing }, { userIds }) => {
  let newObserving = {};
  
  userIds.forEach(userId => {
    newObserving[userId] = userId;
  });

  return {
    observing: {
      ...observing,
      ...newObserving
    }
  }
}

export const removeFromObserve = ({ observing }, { userId }) => ({
  observing: [...observing].filter(observedId => observedId !== userId),
})

export const removeFromObserveBulk = ({ observing }, { userIds }) => ({
  observing: [...observing].filter(observedId =>  !userIds.includes(observedId)),
})
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [REGISTER_EMAIL.SUCCESS]: registerEmailSuccess,

  [CONFIRM_CODE.SUCCESS]: confirmCodeSuccess,

  [LOGIN_EMAIL.ATTEMPT]: loginAttempt,
  [LOGIN_EMAIL.SUCCESS]: loginSuccess,

  [LOGIN_FACEBOOK.ATTEMPT]: loginAttempt,
  [LOGIN_FACEBOOK.SUCCESS]: loginFacebookSuccess,

  [RESET_PASSWORD.SUCCESS]: resetPasswordSuccess,

  [UPDATE_PROFILE.ATTEMPT]: updateProfileAttempt,
  [UPDATE_PROFILE.SUCCESS]: updateProfileSuccess,
  [UPDATE_PROFILE.FAILURE]: updateProfileFailure,

  [GET_USER_PROFILE.ATTEMPT]: updateProfileAttempt,
  [GET_USER_PROFILE.SUCCESS]: updateProfileSuccess,
  [GET_USER_PROFILE.FAILURE]: updateProfileFailure,

  [SIGN_OUT.FAILURE]: clearUserData,
  [SIGN_OUT.SUCCESS]: clearUserData,

  [UPDATE_USER_LOCATION.SUCCESS]: updateUserLocation,

  [ADD_USER_OBSERVING.SUCCESS]: addToObserve,
  [ADD_USER_OBSERVING_BULK.SUCCESS]: addToObserveBulk,
  [REMOVE_USER_OBSERVING.SUCCESS]: removeFromObserve,
  [REMOVE_USER_OBSERVING_BULK.SUCCESS]: removeFromObserveBulk,
})
