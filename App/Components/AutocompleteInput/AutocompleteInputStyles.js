import { StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/Themes'

export const gradient = [Colors.gradientViolet, Colors.gradientAquamarine]

export default StyleSheet.create({
  textStyle: {
    ...Fonts.style.regular,
    color: Colors.fontGrayDark,
    marginLeft: Fonts.scale(7),
    flex: 1,
    height: Fonts.verticalScale(36),
    paddingVertical: 0,
  },

  wrapper: {
    width: '100%',
    height: Fonts.verticalScale(36),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Fonts.scale(10),
    backgroundColor: 'rgba(142, 142, 147, 0.12)',
    borderRadius: Fonts.scale(10),
  },

  smallOpacity: {
    backgroundColor: 'rgba(142, 142, 147, 0.30)',
  },
})
