import { StyleSheet } from 'react-native'
import { Fonts, Colors, ApplicationStyles } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  topImage: {
    width: Fonts.scale(350),
    height: Fonts.scale(100),
    resizeMode: 'contain',
  },

  background: {
    flex: 1,
    alignItems: 'center',
    marginTop: Fonts.verticalScale(105),
    backgroundColor: Colors.snow,
  },

  center: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    ...Fonts.style.little,
    textAlign: 'center',
    color: Colors.fontVioletDark,
  },

  buttonMargin: {
    marginBottom: Fonts.verticalScale(4),
  },

  centerImageWrapper: {
    width: Fonts.scale(281),
    height: Fonts.verticalScale(204) - Fonts.scale(3),
    borderRadius: Fonts.scale(13.5),
    borderWidth: Fonts.scale(5),
    borderColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerButtons: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: Fonts.verticalScale(85),
  },

  gradientWrapper: {
    width: Fonts.scale(284),
    borderRadius: Fonts.scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Fonts.verticalScale(30),
    marginTop: Fonts.verticalScale(12),
    height: Fonts.verticalScale(204),
  },

  leftMask: {
    height: Fonts.verticalScale(155),
    position: 'absolute',
    left: -4,
    width: 8,
    backgroundColor: Colors.snow,
  },

  rightMask: {
    height: Fonts.verticalScale(155),
    position: 'absolute',
    right: -4,
    width: 8,
    backgroundColor: Colors.snow,
  },

  label: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: Fonts.verticalScale(25),
  },
})
