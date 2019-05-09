import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DatePicker from 'app/Lib/react-native-datepicker'
import Icon from 'react-native-vector-icons/dist/Ionicons'

import styles from './TimePickerStyles'
import { Colors } from 'app/Themes'

export default class TimePickerComponent extends PureComponent {
  today = new Date()
  datePicker = null

  constructor (props) {
    super(props)
    // this.initialDate = new Date()
    this.state = {date: props.meta.initial}
  }

  openPicker = () => {
    this.datePicker.onPressDate()
  }

  handleRef = ref => { 
    this.datePicker = ref 
  }

  render () {
    const { input: { value = null, onChange } } = this.props
    return (
      <View style={styles.container}>
          <Text style={[styles.label, styles.padding]} onPress={this.openPicker}>Choose time</Text>
        <DatePicker
          ref={this.handleRef}
          mode='time'
          date={this.state.date}
          locale='en_GB'
          androidMode='spinner'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          is24Hour={true}
          minuteInterval={5}
          showIcon={false}
          placeholder={<Icon name='ios-time' color={Colors.fontGrayDark} size={26} />}
          customStyles={{
            placeholderText: styles.placeholder,
            dateText: styles.picker,
            dateInput: {borderWidth: 0 }
          }}
          onDateChange={(date) => {this.setState({date: date}); onChange(date)}}
        />           
        {this.state.date && <TouchableOpacity
          style={styles.clearTime}
          onPress={() => { this.setState({date: null}); onChange(null)}}
        >
          <Icon name='ios-close' color={Colors.fontGrayDark} size={36} />
        </TouchableOpacity>}
      </View>
    )
  }
}

