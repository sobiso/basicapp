import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  UpdateRegionActions, toggleUsersCardsModal, initialState,
  GetEventsActions, initialRegionValues, resetValuesAttempt, HangoutSelectors, SetHangoutFiltersActions
} from 'app/Redux/HangoutRedux'

import { UserSelectors } from 'app/Redux/UserRedux'
import { Metrics } from 'app/Themes'
import Markers from './Markers'
import AppConfig from 'app/Config/AppConfig'
import styles from './MapComponentStyles'

class MapComponent extends PureComponent {
  state = {
    initialRegion: {
      ...initialRegionValues,
      ...this.props.userLocation,
    },
    lastRegion: initialRegionValues,
    lastRequest: Date.now()
  }


  onRegionChangeComplete = (region) => {
    const { onRegionchange, getEvents, isEventsLoading, applyFilters, filterValues } = this.props
    const { lastRegion, lastRequest } = this.state

    const latKm = 111.03
    const lngKm = 111.320 * Math.cos(region.latitude * 0.01745329251)
    const latR = region.latitudeDelta * latKm 
    const lngR = region.longitudeDelta * lngKm 
    const delta = 0.4 // move filter 
    const deltaDistance = Math.round(region.latitudeDelta * (1 + delta) * latKm * 1000) // in meters

    onRegionchange(region)

    if (
      (
        Math.abs(region.latitude - lastRegion.latitude)*latKm > latR*delta || Math.abs(region.longitude - lastRegion.longitude)*lngKm > lngR*delta ||
        Date.now() - lastRequest > 60000 || // 60 sec
        (region.latitudeDelta*(1+ delta) > AppConfig.showingMax ) || 
        (filterValues.limit > 0)
      ) && !isEventsLoading
    ) {

      this.setState({
        lastRegion: region,
        lastRequest: Date.now()
      }, () => {
        applyFilters({
          ...initialState.filters,
          maxDistance: deltaDistance > filterValues.maxDistance ? deltaDistance : AppConfig.showingMax
        })

      })

    }

  }

  handleMapRef = ref => { this.map = ref }

  animateCamera = ({ latitude, longitude }) => {
    this.setState({
      initialRegion: {
        ...initialRegionValues,
        latitude,
        longitude
      } })

    !!this.map && this.map.animateToRegion({...initialRegionValues, latitude, longitude})
  }

  animateTo = ({latitude, longitude}) => {
    this.setState({initialRegion: {...initialRegionValues, latitude, longitude} })
    !!this.map && this.map.animateToRegion({latitude, longitude,longitudeDelta: 0.05, latitudeDelta: 0.05 })
  }

  render () {
    const { initialRegion } = this.state
    
    return (
      <View style={styles.mapWrapper}>
        <MapView
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          onMapReady={this.props.onMapReady}
          style={styles.map}
          showsTraffic={false}
          showsIndoors={false}
          rotateEnabled={false}
          showsBuildings={false}
          minZoomLevel={6}
          ref={this.handleMapRef}
          moveOnMarkerPress={false}
          showsPointsOfInterest={false}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsIndoorLevelPicker={false}
          initialRegion={initialRegion}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          <Markers />
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  filterValues: HangoutSelectors.filterValuesSelector,
  isEventsLoading: HangoutSelectors.isEventsLoadingSelector,
})

const mapDispatchToProps = {
  onRegionchange: UpdateRegionActions.Attempt,
  showUsersCards: toggleUsersCardsModal,
  getEvents: GetEventsActions.Attempt,
  resetValues: resetValuesAttempt,
  applyFilters: SetHangoutFiltersActions.Attempt,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MapComponent)