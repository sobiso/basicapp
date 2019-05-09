import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { Activities } from 'app/Constants/Activities'
import { Metrics, Fonts } from 'app/Themes'

import styles from './ChooseActivityViewStyles'

const itemWidth = Metrics.screenWidth - Fonts.scale(20)

export default class ActivityItem extends PureComponent {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    activityIndex: PropTypes.string.isRequired,
  }

  render () {
    const { isSelected, activityIndex, onPress } = this.props

    return (
      <View>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.itemContainer, isSelected && styles.selected, { width: itemWidth }]}
        >
          <Text style={styles.activityText}>{Activities[activityIndex].value}</Text>
        </TouchableOpacity>
        <View style={styles.itemSeparator} />
      </View>
    )
  }
}
