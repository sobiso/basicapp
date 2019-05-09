import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {

  screen: {
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.background,
      marginTop: Fonts.verticalScale(45),
      marginBottom: Fonts.verticalScale(28)
    },
    contentWrapper: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%'
    },
    titleText: {
      ...Fonts.style.title,
      alignSelf: 'center',
      color: Colors.fontVioletDark,
      marginVertical: Metrics.baseMargin,
      textAlign: 'center'
    },
    subtitleText: {
      ...Fonts.style.regular,
      alignSelf: 'center',
      color: Colors.fontVioletDark,
      marginVertical: Metrics.baseMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    leftMenuWrapper: {
      position: 'absolute',
      width: Fonts.scale(48),
      height: Fonts.scale(48),
      alignItems: 'center',
      justifyContent: 'center',
      top: Fonts.verticalScale(Metrics.isAndroid ? 3 : 16),
      left: Fonts.scale(0)
    },
    rightMenuWrapper: {
      position: 'absolute',
      width: Fonts.scale(48),
      height: Fonts.scale(48),
      alignItems: 'center',
      justifyContent: 'center',
      top: Fonts.verticalScale(Metrics.isAndroid ? 3 : 16),
      right: 0
    },
    // tabContainer: {
    //   backgroundColor: Colors.background,
    //   flex: 1,
    // },
  },
  placeholder: {
    noItemsPlaceholder: {
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
      fontWeight: 'bold',
      color: Colors.gradientViolet,
      opacity: Fonts.isAndroid ? 0.3 : 0.5,
      fontSize: Fonts.scale(14)
    }
  }
}

export default ApplicationStyles
