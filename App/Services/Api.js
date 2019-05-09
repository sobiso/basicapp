import { LoginManager, AccessToken } from 'react-native-fbsdk'
import AppConfig from 'app/Config/AppConfig'
import { create } from 'apisauce'

const loginFacebookSdk = () => LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_photos'])
const logoutFacebookSdk = () => LoginManager.logOut()
const getAccessTokenData = () => AccessToken.getCurrentAccessToken()

const faceSignOut = () => LoginManager.logOut()

const api = create({
  baseURL:  'test.com',
  headers: { 'Content-Type': 'application/json' },
})

const runApi = async ({ method = 'post', version = 'v2', body, path }) => {

}

const updateApiHeaders = token => {
  api.setHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': token,
  })
}

const register = (email, password) =>
  runApi({
    path: `/register`,
    body: {
      email,
      password,
    },
  })

const login = (email, password) =>
  runApi({
    path: `/login`,
    body: {
      email,
      password,
    },
  })

const sendConfirmationCode = email =>
  runApi({
    path: `/resend_confirmation_code`,
    body: {
      email,
    },
  })

const checkConfirmationCode = (email, code) =>
  runApi({
    path: `/check_confirmation_code`,
    body: {
      email,
      code,
    },
  })

const updateUserProfile = (userId, profile) =>
  runApi({
    method: 'put',
    path: `/users/${userId}`,
    body: profile,
  })

const updateUserLocation = (userId, location) =>
  runApi({
    method: 'put',
    path: `/users/${userId}/location`,
    body: location,
  })

export default {
  removeUserLocation,
  removeInvalidConversation,
  updateApiHeaders,
  faceSignOut,
  register,
  login,
  checkConfirmationCode,
  sendConfirmationCode,
  updateUserProfile,

}
