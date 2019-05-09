import { StyleSheet } from 'react-native'
import { Fonts, Colors, ApplicationStyles } from 'app/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    marginTop: Fonts.verticalScale(45),
  },

  margin: {
    marginBottom: Fonts.verticalScale(49),
  },

  smallMargin: {
    marginBottom: Fonts.verticalScale(10),
  },

  bigMargin: {
    marginBottom: Fonts.verticalScale(38),
  },

  bottomMargin: {
    marginBottom: Fonts.verticalScale(28),
  },

  contentMargin: {
    marginBottom: Fonts.verticalScale(28),
  },
})
