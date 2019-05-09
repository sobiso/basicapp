import React, { PureComponent } from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import PropTypes from 'prop-types'

import { Colors } from 'app/Themes'
import styles from './AutocompleteInputStyles'

export default class AutocompleteInput extends PureComponent {
  static propTypes = {
    smallOpacity: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFocusChange: PropTypes.func,
  }

  static defaultProps = {
    smallOpacity: false,
    onFocusChange: null,
  }

  state = {
    value: '',
  }

  onChange = value => {
    const { onChange } = this.props
    onChange(value)
    this.setState({ value })
  }

  onFocus = () => {
    const { onFocusChange } = this.props
    !!onFocusChange && onFocusChange(true)
  }

  render () {
    const { smallOpacity } = this.props

    return (
      <View style={[styles.wrapper, !!smallOpacity && styles.smallOpacity]}>
        <Icon name='ios-search-outline' color={Colors.inputBackgroundGray} size={20} />
        <TextInput
          underlineColorAndroid='transparent'
          placeholderTextColor={Colors.inputBackgroundGray}
          onChangeText={this.onChange}
          onFocus={this.onFocus}
          style={styles.textStyle}
          placeholder='Search'
          maxLength={30}
        />
      </View>
    )
  }
}
