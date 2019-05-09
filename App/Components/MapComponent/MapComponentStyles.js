import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from 'app/Themes'

export default StyleSheet.create({
  mapWrapper: {
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    height: Metrics.screenHeight - Metrics.navBarHeight,
    width: Metrics.screenWidth ,
  },

  myPosition: {
    width: Fonts.scale(Metrics.isAndroid ? 18 : 14),
    height: Fonts.scale(Metrics.isAndroid ? 18 : 14),
  },
})
