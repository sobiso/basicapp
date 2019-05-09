import { StyleSheet } from 'react-native'
import { Fonts } from 'app/Themes'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainerStyle: {
    width: Fonts.scale(100),
    margin: Fonts.scale(10),
  },

  buttonStyle: {
    width: Fonts.scale(100),
  },

})
