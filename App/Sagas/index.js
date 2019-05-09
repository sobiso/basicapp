import { takeLatest, takeEvery, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import {
  SIGN_OUT,
  LOGIN_EMAIL,
  CONFIRM_CODE,
  REGISTER_EMAIL,
  LOGIN_FACEBOOK,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  CHECK_USER_AUTH,
  SEND_VERIFY_CODE, REGISTER_FACEBOOK,
} from '../Redux/AuthRedux'

import {
  BLOCK_USER,
  REPORT_USER,
  SET_INACTIVE,
  UPDATE_PROFILE,
  GET_USER_PROFILE,
  ADD_USER_OBSERVING,
  ADD_USER_OBSERVING_BULK,
  REMOVE_USER_LOCATION,
  UPDATE_USER_LOCATION,
  REMOVE_USER_OBSERVING,
  REMOVE_USER_OBSERVING_BULK,
  SET_NOTIFICATION_TOKEN,
} from '../Redux/UserRedux'

import {
  GET_EVENTS,
  PREPARE_EVENTS,
  SET_HANGOUTS_FILTERS,
  PREPARE_EVENT_TO_REMOVE,
  GET_USER_ACTIVITIES,
} from '../Redux/HangoutRedux'

import {
  SEND_MESSAGE,
  GET_MESSAGES,
  GET_LAST_MESSAGE,
  GET_EVENT_PARTICIPANTS,
  RECEIVED_NEW_CHAT_MESSAGE,
} from '../Redux/ChatRedux'
import {
  GET_CONVERSATIONS,
  REMOVE_CONVERSATION,
  PREPARE_CONVERSATION,
  MARK_CONVERSATION_READ,
  PREPARE_CONVERSATION_USER,
  RECEIVED_NEW_CONVERSATION,
  REMOVE_INVALID_CONVERSATION,
} from '../Redux/ConversationsRedux'

import {
  PREPARE_INVITE,
  GET_SENT_INVITES,
  CANCEL_SENT_INVITE,
  GET_RECEIVED_INVITES,
  SEND_EVENT_INVITATION,
  REJECT_EVENT_INVITATION,
  ACCEPT_EVENT_INVITATION,
  PREPARE_RECEIVED_INVITE,
  RECEIVED_NEW_INVITATION_MESSAGE, ACCEPT_SENT_INVITATION_MESSAGE,
  RECEIVED_INVITES_WEBSOCKET,
  SENT_INVITES_WEBSOCKET,
  REJECT_SENT_INVITATION_MESSAGE,
} from '../Redux/InvitesRedux'

import {
  SEND_FEEDBACK,
  DELETE_MY_ACCOUNT,
  LOAD_INITIAL_VALUES,
  UPDATE_USER_SETTINGS,
} from '../Redux/SettingsRedux'

import {
  CREATE_EVENT,
  GET_ACTIVITIES_IDS,
  FETCH_SELECTED_LOCATION,
  UPDATE_PLACES_AUTOCOMPLETE,
} from '../Redux/CreateActivityRedux'

import {
  LEAVE_EVENT,
  REMOVE_MY_EVENT,
  GET_MY_ACTIVITIES,
  GET_JOINED_ACTIVITIES,
  PREPARE_JOINED_ACTIVITY,
  EVENT_REMOVED,
} from '../Redux/ActivitiesRedux'

import {
  GET_USER_DATA,
  GET_USERS_BULK_DATA,
  GET_EVENT_DATA,
} from '../Redux/StoreRedux'

/* ------------- Sagas ------------- */

import {
  signOut,
  loginEmail,
  confirmCode,
  registerEmail,
  resetPassword,
  loginFacebook,
  failureFacebook,
  changePassword,
  sendVerificationCode,
  checkUserAuthenticated, registerFacebook,
} from './AuthSagas'

import {
  blockUser,
  reportUser,
  getUserData,
  getUsers,
  getEventData,
  updateProfile,
  getUserProfile,
  setUserInactive,
  removeUserLocation,
  updateUserLocation,
  addUserToObserving,
  addUserToObservingBulk,
  setNotificationToken,
  removeUserFromObserving,
  removeUserFromObservingBulk,
} from './UserSagas'

import {
  getEvents,
  prepareEvents,
  setHangoutsFilters,
  prepareToRemoveEvent,
  getUserActivities,
} from './HangoutSagas'

import {
  getMessages,
  getLastMessage,
  sendChatMessage,
  getConversations,
  prepareNewMessage,
  removeConversation,
  prepareConversation,
  getEventParticipants,
  markConversationRead,
  prepareNewConversation,
  prepareConversationUser,
  removeInvalidConversation,
} from './ChatSagas'

import {
  prepareInvite,
  getSentInvites,
  cancelSentInvite,
  getReceivedInvites,
  sendEventInvitation,
  acceptEventInvitation,
  rejectEventInvitation,
  prepareReceivedInvite,
  prepareReceivedWebsocketInvite, getJoinedActivitiesAfterAcceptInvitationMessage,
  receivedInvitesWebsocket,
  getSentInvitesWebsocket,
  rejectSentInvitationMessage,
  acceptSentInvitationMessage,
} from './InvitesSagas'

import {
  sendFeedback,
  deleteMyAccount,
  loadInitialValues,
  updateUserSettings,
} from './SettingsSagas'

import {
  createEvent,
  getActivitiesIds,
  fetchSelectedLocation,
  updateAutocompleteResults,
} from './CreateActivitySagas'

import {
  leaveEvent,
  getMyActivities,
  removeMyActivity,
  getJoinedActivities,
  prepareJoinedActivity,
  eventRemoved,
} from './ActivitiesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(LOGIN_FACEBOOK.ATTEMPT, loginFacebook),
    // takeLatest(LOGIN_FACEBOOK.FAILURE, failureFacebook),
    
    takeLatest(REGISTER_FACEBOOK.ATTEMPT, registerFacebook),
    takeLatest(REGISTER_EMAIL.ATTEMPT, registerEmail),
    takeLatest(LOGIN_EMAIL.ATTEMPT, loginEmail),
    takeLatest(SEND_VERIFY_CODE.ATTEMPT, sendVerificationCode),
    takeLatest(CONFIRM_CODE.ATTEMPT, confirmCode),
    takeLatest(CHECK_USER_AUTH.ATTEMPT, checkUserAuthenticated),
    takeLatest(SIGN_OUT.ATTEMPT, signOut),
    takeLatest(RESET_PASSWORD.ATTEMPT, resetPassword),
    takeLatest(CHANGE_PASSWORD.ATTEMPT, changePassword),

    takeLatest(UPDATE_PROFILE.ATTEMPT, updateProfile),
    takeLatest(GET_USER_PROFILE.ATTEMPT, getUserProfile),
    takeLatest(UPDATE_USER_LOCATION.ATTEMPT, updateUserLocation),
    takeLatest(BLOCK_USER.ATTEMPT, blockUser),
    takeLatest(REPORT_USER.ATTEMPT, reportUser),
    takeLatest(SET_INACTIVE.ATTEMPT, setUserInactive),
    takeEvery(GET_USER_DATA.ATTEMPT, getUserData),
    takeEvery(GET_USERS_BULK_DATA.ATTEMPT, getUsers),
    takeEvery(GET_EVENT_DATA.ATTEMPT, getEventData),
    takeEvery(LEAVE_EVENT.ATTEMPT, leaveEvent),

    takeLatest(SET_HANGOUTS_FILTERS.ATTEMPT, setHangoutsFilters),
    takeLatest(GET_EVENTS.ATTEMPT, getEvents),
    takeLatest(GET_USER_ACTIVITIES.ATTEMPT, getUserActivities),
    takeEvery(PREPARE_EVENTS.ATTEMPT, prepareEvents),
    takeEvery(PREPARE_EVENT_TO_REMOVE.ATTEMPT, prepareToRemoveEvent),

    takeLatest(SEND_MESSAGE.ATTEMPT, sendChatMessage),
    takeLatest(REMOVE_CONVERSATION.ATTEMPT, removeConversation),
    takeEvery(REMOVE_INVALID_CONVERSATION.ATTEMPT, removeInvalidConversation),
    takeLatest(GET_CONVERSATIONS.ATTEMPT, getConversations),
    takeEvery(GET_LAST_MESSAGE.ATTEMPT, getLastMessage),
    takeEvery(PREPARE_CONVERSATION.ATTEMPT, prepareConversation),
    takeEvery(PREPARE_CONVERSATION_USER.ATTEMPT, prepareConversationUser),
    takeEvery(GET_MESSAGES.ATTEMPT, getMessages),
    takeEvery(RECEIVED_NEW_CHAT_MESSAGE.ATTEMPT, prepareNewMessage),
    takeEvery(RECEIVED_NEW_CONVERSATION.ATTEMPT, prepareNewConversation),
    takeLatest(GET_EVENT_PARTICIPANTS.ATTEMPT, getEventParticipants),
    takeEvery(MARK_CONVERSATION_READ.ATTEMPT, markConversationRead),

    takeLatest(SEND_EVENT_INVITATION.ATTEMPT, sendEventInvitation),
    takeLatest(ACCEPT_EVENT_INVITATION.ATTEMPT, acceptEventInvitation),
    takeLatest(REJECT_EVENT_INVITATION.ATTEMPT, rejectEventInvitation),
    takeLatest(GET_SENT_INVITES.ATTEMPT, getSentInvites),
    takeLatest(SENT_INVITES_WEBSOCKET.ATTEMPT, getSentInvitesWebsocket),
    takeLatest(GET_RECEIVED_INVITES.ATTEMPT, getReceivedInvites),
    takeEvery(RECEIVED_INVITES_WEBSOCKET.ATTEMPT,receivedInvitesWebsocket),
    takeEvery(PREPARE_INVITE.ATTEMPT, prepareInvite),
    takeEvery(PREPARE_RECEIVED_INVITE.ATTEMPT, prepareReceivedInvite),
    takeEvery(RECEIVED_NEW_INVITATION_MESSAGE, prepareReceivedWebsocketInvite),
    takeEvery(CANCEL_SENT_INVITE.ATTEMPT, cancelSentInvite),
    takeEvery(ACCEPT_SENT_INVITATION_MESSAGE.ATTEMPT, getJoinedActivitiesAfterAcceptInvitationMessage),
    takeEvery(ACCEPT_SENT_INVITATION_MESSAGE.ATTEMPT, acceptSentInvitationMessage),
    takeEvery(REJECT_SENT_INVITATION_MESSAGE.ATTEMPT, rejectSentInvitationMessage),
    takeEvery(EVENT_REMOVED, eventRemoved),

    takeLatest(UPDATE_USER_SETTINGS.ATTEMPT, updateUserSettings),
    takeLatest(LOAD_INITIAL_VALUES.ATTEMPT, loadInitialValues),
    takeLatest(SEND_FEEDBACK.ATTEMPT, sendFeedback),
    takeLatest(DELETE_MY_ACCOUNT.ATTEMPT, deleteMyAccount),

    takeLatest(UPDATE_PLACES_AUTOCOMPLETE.ATTEMPT, updateAutocompleteResults),
    takeLatest(CREATE_EVENT.ATTEMPT, createEvent),
    takeLatest(GET_ACTIVITIES_IDS.ATTEMPT, getActivitiesIds),
    takeLatest(FETCH_SELECTED_LOCATION.ATTEMPT, fetchSelectedLocation),

    takeEvery(ADD_USER_OBSERVING.ATTEMPT, addUserToObserving),
    takeEvery(ADD_USER_OBSERVING_BULK.ATTEMPT, addUserToObservingBulk),
    takeEvery(REMOVE_USER_OBSERVING.ATTEMPT, removeUserFromObserving),
    takeEvery(REMOVE_USER_OBSERVING_BULK.ATTEMPT, removeUserFromObservingBulk),
    takeLatest(SET_NOTIFICATION_TOKEN.ATTEMPT, setNotificationToken),

    takeLatest(GET_MY_ACTIVITIES.ATTEMPT, getMyActivities),
    takeLatest(GET_JOINED_ACTIVITIES.ATTEMPT, getJoinedActivities),
    takeEvery(PREPARE_JOINED_ACTIVITY.ATTEMPT, prepareJoinedActivity),
    takeEvery(REMOVE_MY_EVENT.ATTEMPT, removeMyActivity),
    takeLatest(REMOVE_USER_LOCATION.ATTEMPT, removeUserLocation),
  ])
}
