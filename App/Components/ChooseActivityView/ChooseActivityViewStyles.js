import { StyleSheet } from 'react-native'
import { Fonts, Colors, ApplicationStyles } from 'app/Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  modalContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },

  headerContainer: {
    backgroundColor: 'rgba(248, 248, 248, 0.82)',
  },

  tabsContainer: {
    alignSelf: 'stretch',
    paddingTop: Fonts.verticalScale(6),
    marginBottom: Fonts.verticalScale(4),
    height: Fonts.verticalScale(24),
    flexDirection: 'row',
    paddingHorizontal: Fonts.scale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabText: {
    ...Fonts.style.small,
    marginHorizontal: Fonts.verticalScale(5),
    color: Colors.fontVioletDark,
  },

  tabTextSelected: {
    fontFamily: Fonts.type.bold,
  },

  bottomLine: {
    backgroundColor: Colors.fontVioletDark,
    height: Fonts.verticalScale(3),
  },

  autocompleteWrapper: {
    width: '100%',
    paddingHorizontal: Fonts.scale(8),
    marginTop: Fonts.verticalScale(15),
    marginBottom: Fonts.verticalScale(12),
  },

  flatListStyle: {
    // height: Fonts.verticalScale(296),
  },

  // ITEM

  itemContainer: {
    height: Fonts.verticalScale(44),
    paddingLeft: Fonts.scale(16),
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },

  selected: {
    backgroundColor: 'rgba(129, 105, 213, 0.9)',
  },

  activityText: {
    ...Fonts.style.regular,
    color: Colors.fontGray,
  },

  itemSeparator: {
    marginLeft: Fonts.scale(14),
    alignSelf: 'stretch',
    height: 0.5,
    backgroundColor: 'rgb(200, 199, 204)',
  },


  gradientButton: {
    alignSelf: 'flex-start',
  },

  actionContainer: {
    position: 'absolute',
    top:Fonts.scale(40),
    backgroundColor: Colors.snow,
    left: -Fonts.scale(10),
    width: Fonts.scale(40),
    height: Fonts.scale(40),
    borderRadius: Fonts.scale(40) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.44,
    shadowRadius: 8,
  },
})
