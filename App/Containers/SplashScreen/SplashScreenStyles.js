import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from 'app/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    // marginTop: Fonts.verticalScale(Metrics.screenHeight === 480 ? 15 : 45),
  },

})
