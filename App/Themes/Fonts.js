import Metrics from '../Themes/Metrics'
import Colors from '../Themes/Colors'

// Guideline sizes are based on standard ~5" screen mobile device, design target
const guidelineBaseWidth = 320
const guidelineBaseHeight = 568

export const scale = size => Metrics.screenWidth / guidelineBaseWidth * size
export const verticalScale = size => Metrics.screenHeight / guidelineBaseHeight * size
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor

export const type = {
  base: 'Poppins-Regular',
  bold: 'Poppins-SemiBold',
  emphasis: 'LucidaGrande',
  medium: 'Poppins-Medium',
}

const size = {
  input: scale(18),
  big: scale(24),
  link: scale(20),
  regular: scale(17),
  medium: scale(14),
  small: scale(13),
  small_xs: scale(12),
  little_md: scale(11),
  little: scale(10),
  tiny: scale(8.5),
}

const style = {
  regular: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  bigLink: {
    fontFamily: type.base,
    fontSize: size.medium,
    color: Colors.fontGrayDark,
  },
  big: {
    fontFamily: type.bold,
    fontSize: size.big,
  },
  smallXs: {
    fontFamily: type.base,
    fontSize: size.small_xs,
    color: Colors.fontGrayDark,
  },
  title: {
    fontFamily: type.bold,
    fontSize: size.input,
  },
  medium: {
    fontFamily: type.bold,
    fontSize: size.medium,
  },
  link: {
    fontFamily: type.base,
    fontSize: size.little_md,
    color: Colors.labelGray,
  },
  small_xs: {
    fontFamily: type.base,
    fontSize: size.small_xs,
  },
  smallLabel: {
    fontFamily: type.base,
    fontSize: size.little_md,
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small,
  },
  little: {
    fontFamily: type.base,
    fontSize: size.little,
  },
  tiny: {
    fontFamily: type.base,
    fontSize: size.tiny,
  },
}

export default {
  type,
  size,
  style,
  scale,
  verticalScale,
}
