import { StyleSheet } from 'react-native'
import { Fonts,Colors, Metrics } from 'app/Themes'

export const pickerHeight = Fonts.verticalScale(180)
const itemWidth = Metrics.screenWidth - Fonts.scale(20)


export default StyleSheet.create({
  error: {
    ...Fonts.style.error,
    alignSelf: 'center',
  },

  picker: {
    borderWidth:0,
    ...Fonts.style.regular,
    color: Colors.fontGrayDark,
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingTop:3,
    paddingRight: Fonts.scale(2)
    // borderWidth: 1
  },
  
  placeholder: {
    // borderWidth:1,
    alignSelf: 'stretch',
    textAlign: 'right',
    paddingRight: Fonts.scale(25),
  },

  clearTime :{
    paddingTop:4,
    paddingRight: Fonts.scale(10),
  },

  label: {
    color: Colors.fontGrayDark,
    textAlign: 'left',
    alignSelf: 'stretch',
    ...Fonts.style.regular,
    paddingLeft: Fonts.scale(12),
  },

  padding: {
    paddingTop: Fonts.verticalScale(10),
  },

  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: Fonts.verticalScale(44),
    justifyContent: 'space-between',
  },
})
