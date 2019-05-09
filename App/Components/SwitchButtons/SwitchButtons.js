import React, { PureComponent } from 'react'
import { GradientSwitchButtons } from 'app/Components'
import { View } from 'react-native'

import styles from './SwitchButtonsStyles'

export default class SwitchButtons extends PureComponent {
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
      labelLeft, labelRight,
    } = this.props

    return (
      <View style={styles.container}>
        <GradientSwitchButtons
          active={!value}
          disabled={value}
          label={labelLeft}
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          onPress={this.handlePress}
        />
        <GradientSwitchButtons
          active={value}
          disabled={!value}
          label={labelRight}
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          onPress={this.handlePress}
        />
      </View>
    )
  }
}
