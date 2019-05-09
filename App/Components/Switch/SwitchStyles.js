import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

export default StyleSheet.create({
  switchWrapper: {
    height: Fonts.verticalScale(44) - 1,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: Fonts.scale(60),
  },

  large: {
    height: Fonts.verticalScale(65),
  },

  largest: {
    height: Fonts.verticalScale(170),
  },

  largeSwitchWrapper: {
    height: Fonts.verticalScale(65) - 1,
  },

  largestSwitchWrapper: {
    height: Fonts.verticalScale(170) - 1,
  },

  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.borderGrayLight,
  },

  itemWrapper: {
    alignSelf: 'stretch',
    paddingLeft: Fonts.scale(18),
    height: Fonts.verticalScale(44),
  },

  containerStyleOff: {
    borderWidth: 1,
    borderColor: Colors.borderGrayLight,
  },

  containerStyleOn: {
    borderWidth: 0,
  },

  label: {
    paddingTop: Fonts.verticalScale(6),
    textAlign: 'left',
  },

  smallLabel: {
    ...Fonts.style.medium,
    paddingTop: Fonts.verticalScale(6),
    textAlign: 'left',
  },

  switchContainer: {
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallPadding: {
    paddingLeft: Fonts.scale(12),
  },

  largeMargin: {
    marginRight: Fonts.scale(66),
  },
})
