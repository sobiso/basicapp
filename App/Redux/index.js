import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { reducer as formReducer } from 'redux-form'
import rootSaga from '../Sagas/'
import websocketSagas from '../Sagas/WebsocketSagas'
import configureStore from './CreateStore'
import AuthReducer from './AuthRedux'
import UserReducer from './UserRedux'
import HangoutReducer from './HangoutRedux'
import ConfigReducer from './ConfigRedux'
import ConversationsReducer from './ConversationsRedux'
import ChatReducer from './ChatRedux'
import ActivitiesReducer from './ActivitiesRedux'
import InvitesReducer from './InvitesRedux'
import SettingsReducer from './SettingsRedux'
import CreateActivityReducer from './CreateActivityRedux'
import StoreReducer from './StoreRedux'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  store: StoreReducer,
  hangout: HangoutReducer,
  activities: ActivitiesReducer,
  createActivity: CreateActivityReducer,
  invites: InvitesReducer,
  chat: ChatReducer,
  conversations: ConversationsReducer,
  form: formReducer,
  config: ConfigReducer,
  settings: SettingsReducer
})

const persistConfig = {
  key: 'root',
  timeout: 5000,
  storage,
  keyPrefix: '',
  whitelist: ['user', 'config', 'conversations', 'hangout', 'store', 'chat']
}

export default () => {
  const persistedReducer = persistReducer(persistConfig, reducers)
  let {
    store, sagasManager, sagaMiddleware
  } = configureStore(persistedReducer, rootSaga, websocketSagas)

  // if (module.hot) {
  //   module.hot.accept(() => {
  //     const nextRootReducer = require('./').reducers
  //     store.replaceReducer(nextRootReducer)
  //     const newYieldedSagas = require('../Sagas').default
  //     sagasManager.cancel()
  //     sagasManager.done.then(() => {
  //       sagasManager = sagaMiddleware.run(newYieldedSagas)
  //     })
  //   })
  // }
  return store
}
