import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Animated } from 'react-native'

import { Fonts } from 'app/Themes'

import styles from './SwitchComponentStyles'

export default class SwitchComponent extends PureComponent {
  circlePosition = new Animated.Value(Fonts.scale(this.props.value ? 21.5 : 0))

  componentWillReceiveProps ({ value }) {
    const { value: prevValue } = this.props
    if (prevValue !== value) {
      Animated.timing(
        this.circlePosition,
        {
          duration: 200,
          toValue: Fonts.scale(value ? 21.5 : 0),
        }
      ).start()
    }
  }

  render () {
    const { value, onValueChange } = this.props

    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={onValueChange}
      >
        <View style={[styles.switchWrapper, value && styles.enabled]}>
          <Animated.View style={[styles.circle, value && styles.circleEnabled, { left: this.circlePosition }]} />
        </View>
      </TouchableOpacity>
    )
  }
}
