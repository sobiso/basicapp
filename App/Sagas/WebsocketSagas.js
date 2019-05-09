import { call, take, put, takeEvery, select, all } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import {
  UPDATE_USER_LOCATION_ATTEMPT
} from 'app/Redux/StoreRedux'

import {
  INVITE_CANCELLED_MESSAGE,
  REJECT_SENT_INVITATION_MESSAGE,
  ACCEPT_SENT_INVITATION_MESSAGE,
  RECEIVED_NEW_INVITATION_MESSAGE
} from 'app/Redux/InvitesRedux'

import { RECEIVED_NEW_CONVERSATION, FILTER_CONVERSATIONS, ConversationsSelectors } from 'app/Redux/ConversationsRedux'
import { ChatSelectors } from 'app/Redux/ChatRedux'
import { InvitesRedux } from 'app/Redux/InvitesRedux'
import { RECEIVED_NEW_CHAT_MESSAGE, RECEIVED_CURRENT_CONVERSATION } from 'app/Redux/ChatRedux'
import { UserSelectors } from 'app/Redux/UserRedux'
import { INIT_WEBSOCKETS, CLOSE_WEBSOCKETS } from 'app/Redux/ConfigRedux'
import AppConfig from 'app/Config/AppConfig'
import { InvitesSelectors, RECEIVED_INVITES_WEBSOCKET, SENT_INVITES_WEBSOCKET } from '../Redux/InvitesRedux'
import { EVENT_REMOVED } from 'app/Redux/ActivitiesRedux'

const prodApi = 'wss://test.com'
const devApi = 'wss://test.com'
const wsUrl = AppConfig.isDevConfiguration ? devApi : prodApi
let ws = null
let pingInterval = 5000
let pingTimeout = 15000
let pingTimer = null
let timeoutTimer = null
let messageReceived = false

const initWebsocket = (token, userId, lastConversation, currentConversation, conversationsIds, invitesReceived) => {

  if (ws) {
    ws.close()
    if (token) ws = new WebSocket(wsUrl + token)
  } else {
    if (token) ws = new WebSocket(wsUrl + token)
  }

  pingTimer = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({command: 'ping'}))
    }
  }, pingInterval)

  timeoutTimer = setInterval(() => {
    if (!messageReceived) {
      ws.close()
    } else {
      messageReceived = false
    }
  }, pingTimeout)

  return eventChannel(emitter => {
    ws.onopen = () => {

      if (ws.readyState === ws.OPEN) {
        const msg = {
          command: 'init',
          data: {
            conversation: {
              createdAt: (lastConversation || {}).createdAt,
              updatedAt: (lastConversation || {}).updatedAt,
              current: currentConversation,
              inStorage: conversationsIds
            },
            invites: {
              received: invitesReceived,
              send: []
            }
          }
        }
        ws.send(JSON.stringify(msg))
      }
    }

    ws.onclose = () => {
      clearInterval(pingTimer)
      clearInterval(timeoutTimer)

      if (ws.readyState === ws.CLOSED) {
        setTimeout(() => {
          emitter({
            type: INIT_WEBSOCKETS.ATTEMPT
          })
        }, 5000)
      }
    }

    ws.onerror = (error) => {
      ws.close()
    }

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        messageReceived = true

        switch (data.type) {
          case 'location_changed': {
            const { userId, location } = data
            emitter({
              type: UPDATE_USER_LOCATION_ATTEMPT,
              userId,
              location
            })
            break
          }
          case 'new_message': {
            const {
              message: {
                conversation: { _id: conversationId },
                createdAt,
                sender: { _id: senderId },
                isRead,
                text,
                _id,
                system,
                image,
                location
              }
            } = data

            emitter({
              type: RECEIVED_NEW_CHAT_MESSAGE.ATTEMPT,
              message: {
                _id,
                text,
                isRead,
                createdAt,
                user: {
                  _id: senderId
                },
                system,
                image,
                location,
              },
              conversationId
            })
            break
          }

          default: break
        }
      } catch (e) {
        console.error(`Error parsing : ${e.data}`)
      }
    }

    return () => {
      ws.close()
    }
  })
}

function * wsSagas (action) {
  try {
    const userId = yield select(UserSelectors.userIdSelector)
    const token = yield select(UserSelectors.userTokenSelector)

    const channel = yield call(initWebsocket, token, userId, lastConversation, currentConversation, conversationsIds, invitesReceived)

    while (true) {
      const action = yield take(channel)
      yield put(action)
    }
  } catch (error) {
    console.log(error)
  }
}

function * wsClose () {
  ws.close()
}

export default function * root () {
  yield all([
    takeEvery(INIT_WEBSOCKETS.ATTEMPT, wsSagas),
    takeEvery(CLOSE_WEBSOCKETS.ATTEMPT, wsClose)
  ])
}
