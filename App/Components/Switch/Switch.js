import React, { PureComponent } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Label, SwitchComponent } from 'app/Components'

import styles from './SwitchStyles'

export default class SwitchInput extends PureComponent {
  state = {
    value: this.props.input.value,
  }

  componentWillReceiveProps ({ input: { value } }) {
    if (value !== this.state.value) {
      this.setState({ value })
    }
  }

  handlePress = () => {
    const { input: { onChange, value } } = this.props
    this.setState({ value: !value })
    onChange(!value)
  }

  render () {
    const { value } = this.state
    const {
      label,
      renderSeparator,
      large,
      largest,
      smallPadding,
      switchSizeCheck
    } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.itemWrapper,
          smallPadding && styles.smallPadding,
          large && styles.large,
          largest && styles.largest
        ]}
        onPress={this.handlePress}
      >
        <View style={[
          styles.switchWrapper,
          smallPadding && styles.largeMargin,
          large && styles.largeSwitchWrapper,
          largest && styles.largestSwitchWrapper
        ]}>
          <Label
            profileTitle
            label={label}
            style={switchSizeCheck ? styles.smallLabel : styles.label}
          />
          <SwitchComponent
            value={value}
            onValueChange={this.handlePress}
          />
        </View>
        {!!renderSeparator && <View style={styles.line} />}
      </TouchableOpacity>
    )
  }
}
