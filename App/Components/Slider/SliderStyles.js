import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  sliderWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: Fonts.verticalScale(10),
    minHeight:Fonts.verticalScale(40),
  },

  image: {
    width: Fonts.scale(19),
    height: Fonts.scale(19),
    resizeMode: 'contain',
  },

  markerContainer: {
    paddingTop: 5,
    marginBottom: Fonts.verticalScale(23),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Fonts.verticalScale(40),
    width: 150,
  },

  labelToRight: {
    marginRight: -25,
  },

  labelToLeft: {
    marginLeft: -25,
  },

  label: {
    ...Fonts.style.small,
    color: Colors.fontGrayDark,
    alignSelf: 'stretch',
    textAlign: 'center',
    minWidth: Fonts.scale(30),
    opacity: 0.8,
  },
})
