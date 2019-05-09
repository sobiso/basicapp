import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, ApplicationStyles } from 'app/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.placeholder,

  tabContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },


  title: {
    ...Fonts.style.regular,
    color: Colors.fontGrayDark,
    alignSelf: 'center',
    position: 'absolute',
    top: Fonts.verticalScale(Metrics.isAndroid ? 11 : 23),
  },

  flatListContainer: {
    marginTop: Fonts.verticalScale(50),
    overflow: 'hidden',
    flex: 1,
  },
})
