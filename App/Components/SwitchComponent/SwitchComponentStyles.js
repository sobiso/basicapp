import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

const enabledColor = Colors.strongViolet

export default StyleSheet.create({
  switchWrapper: {
    width: Fonts.scale(51),
    height: Fonts.verticalScale(31),
    borderWidth: 1.5,
    marginTop: 0,
    borderColor: '#e5e5ea',
    backgroundColor: 'transparent',
    borderRadius: Fonts.verticalScale(31) / 2,
  },

  itemWrapper: {
    paddingVertical: Fonts.verticalScale(6.5),
    paddingHorizontal: Fonts.scale(4),
  },

  enabled: {
    borderWidth: 0,
    backgroundColor: enabledColor,
    borderRadius: Fonts.verticalScale(17),
  },

  circleEnabled: {
    marginTop: 1.5,
  },

  circle: {
    position: 'absolute',
    width: Fonts.verticalScale(28),
    height: Fonts.verticalScale(28),
    backgroundColor: Colors.snow,
    borderRadius: Fonts.verticalScale(14),
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    elevation: 2,
  },
})
