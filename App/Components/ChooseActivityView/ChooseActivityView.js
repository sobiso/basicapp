import React, { PureComponent } from 'react'
import { FlatList, Text, View, TouchableOpacity, ScrollView, Animated, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'

import { ActivitiesSwitcher } from 'app/Constants/Activities'
import NavigationActions from 'app/Navigation/NavigationActions'
import { AutocompleteInput, GradientButtonText } from 'app/Components'
import { Fonts } from 'app/Themes'
import { CreateActivitySelectors, updateAutocompleteAttempt } from 'app/Redux/CreateActivityRedux'
import ActivityItem from './ActivityItem'
import { Activities } from 'app/Constants/Activities'
import { routeNames, routeParams } from 'app/Navigation/RouteConst'

import styles from './ChooseActivityViewStyles'

const tabTextSwitcher = [
  'Food',
  'Drinks / Party',
  'Games',
  'Sport',
  'Holiday / Sightseeing',
  'Entertainment',
  'Other',
]

const lineMarginBreakPoints = [
  Fonts.scale(8),
  Fonts.scale(50),
  Fonts.scale(148),
  Fonts.scale(205),
  Fonts.scale(250),
  Fonts.scale(400),
  Fonts.scale(500),
]

const lineWidthBreakPoints = [
  Fonts.scale(42),
  Fonts.scale(100),
  Fonts.scale(53),
  Fonts.scale(43),
  Fonts.scale(146),
  Fonts.scale(100),
  Fonts.scale(43),
]

class ChooseActivity extends PureComponent {
  static propTypes = {
    selectedActivities: PropTypes.arrayOf(PropTypes.string),
    hideActivity: PropTypes.func.isRequired,
    onAutocompleteChange: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool,
  }

  static defaultProps = {
    selectedActivities: [],
    multiSelect: false,
  }

  lineWidth = new Animated.Value(lineWidthBreakPoints[0])
  lineMarginLeft = new Animated.Value(lineMarginBreakPoints[0])

  state = {
    selectedTab: 0,
    selectedActivities: this.props.selectedActivities || [],
  }

  handleOnBack = () => this.props.dismissLightBox()

  onTabPress = selectedTab => () => {
    this.setState({ selectedTab })
    this.animate(this.lineWidth, lineWidthBreakPoints[selectedTab])
    this.animate(this.lineMarginLeft, lineMarginBreakPoints[selectedTab])
  }

  animate = (value, toValue) =>
    Animated.timing(
      value,
      {
        duration: 300,
        toValue,
      }
    ).start()

  keyExtractor = item => item

  onItemPress = selectedActivityId => () => {
    const { multiSelect, hideActivity, change, editActivity } = this.props
    if (multiSelect) {
      const { selectedActivities } = this.state
      const newSelectedActivities = selectedActivities.includes(selectedActivityId)
        ? [...selectedActivities].filter(activityId => activityId !== selectedActivityId)
        : [...selectedActivities, selectedActivityId]

      this.setState({ selectedActivities: newSelectedActivities })
      change('FilterForm', 'activity', newSelectedActivities)
    } else {
      change('CreateActivityForm', 'activity', selectedActivityId)

      change('CreateActivityForm', 'iconUrl', false)
      // hideActivity()
      // editActivity(selectedActivityId)
      this.props.showModal(routeNames.ShowAddActivityModal, routeParams.noNavbar, {
        iconUrl: null, 
        activityTitle: Activities[selectedActivityId].value,
        activityIcon: Activities[selectedActivityId].icon,
        activity: selectedActivityId,
        hideActivity
      }, 0)

    }
  }

  componentDidMount = () => {
    const { onAutocompleteChange } = this.props
    onAutocompleteChange('')
  }

  renderItem = ({ item }) =>
    <ActivityItem
      activityIndex={item}
      isSelected={this.props.multiSelect && this.state.selectedActivities.includes(item)}
      onPress={this.onItemPress(item)}
    />
  
  renderTab = (item) => {
    const { selectedTab } = this.state
    return (
      <TouchableOpacity
        key={item.index}
        onPress={this.onTabPress(item.index)}
      >
        <Text style={[styles.tabText, selectedTab === item.index && styles.tabTextSelected]}>
          {item.item}
        </Text>

      </TouchableOpacity>
    )
  }

  render () {
    const { results = null, onAutocompleteChange, onAddPress } = this.props
    const { selectedTab, selectedActivities } = this.state
    const data = results || ActivitiesSwitcher[selectedTab]

    return (
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <View style={styles.tabsContainer}>
                <FlatList
                  data={tabTextSwitcher}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderTab}
                  horizontal={true}
                />
              </View>
              <Animated.View style={[styles.bottomLine, { width: this.lineWidth, marginLeft: this.lineMarginLeft }]} />
            </View>
          </ScrollView>

          <View style={styles.autocompleteWrapper}>
            <AutocompleteInput onChange={onAutocompleteChange} />
          </View>
        </View>

        <FlatList
          data={data}
          extraData={selectedActivities}
          onScrollBeginDrag={Keyboard.dismiss}
          style={styles.flatListStyle}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />

        {onAddPress && <GradientButtonText
          label={'Add your own'}
          onPress={onAddPress}
          containerStyle={styles.gradientButton}
        />}
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  results: CreateActivitySelectors.resultsSelector,
})

const mapDispatchToProps = {
  change,
  dismissLightBox: NavigationActions.dismissLightBox,
  showModal: NavigationActions.showModal,
  onAutocompleteChange: updateAutocompleteAttempt,
}

export const ChooseActivityView = connect(mapStateToProps, mapDispatchToProps)(ChooseActivity)
