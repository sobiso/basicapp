import React, { PureComponent } from 'react'
import { View, Image, Text } from 'react-native'
import MultiSlider from 'app/Lib/react-native-multi-slider/Slider'

import { Fonts, Images } from 'app/Themes'

import styles from './SliderStyles'

class CustomMarker extends PureComponent {
  render () {
    const { value, max, min, valueBoth } = this.props

    const diff = valueBoth.valTwo - valueBoth.valOne
    const moveToRight = (diff < 5) && !!max && value !== max
    const moveToLeft = (diff < 5) && !!min && value !== min
    
    return (
      <View style={styles.markerContainer}>
        <Text style={[styles.label, moveToRight && styles.labelToRight, moveToLeft && styles.labelToLeft  ]} numberOfLines={1}>
          {`${value}${value === max ? '+' : ''}`}
        </Text>
        <Image
          style={styles.image}
          source={Images.sliderMarker}
        />
      </View>
    )
  }
}

export default class SliderInput extends PureComponent {
  onValuesChangeFinish = (values) => {
    const { input: { onChange } } = this.props
    onChange(values)
  }

  render () {
    const { input: { value }, min, max, step = 1 } = this.props


    return (
      <View style={styles.sliderWrapper}>
        {!!value &&
          <MultiSlider
            min={min}
            max={max}
            step={step}
            values={value}
            initialValues={value}
            customMarker={CustomMarker}
            sliderLength={Fonts.scale(260)}
            onValuesChangeFinish={this.onValuesChangeFinish}
          />}
      </View>
    )
  }
}
