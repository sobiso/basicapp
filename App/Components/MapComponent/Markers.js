import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { HangoutMarker } from 'app/Components'
import { HangoutSelectors, toggleUsersCardsModal } from 'app/Redux/HangoutRedux'

class Markers extends PureComponent {
  handleMarkerPress = collection => () => {
    this.props.showUsersCards(collection)
  }

  renderMarker = collection => (
    <HangoutMarker key={collection.mainMarker._id} {...collection} onPress={this.handleMarkerPress(collection)} />
  )

  render () {

    const { markers } = this.props
    return [markers.map(this.renderMarker)]
  }
}

const mapStateToProps = createStructuredSelector({
  markers: HangoutSelectors.markersSelector,
})

const mapDispatchToProps = {
  showUsersCards: toggleUsersCardsModal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Markers)
