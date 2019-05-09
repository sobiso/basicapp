import React, { PureComponent } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ConversationItem } from 'app/Components'
import { routeNames, routeParams } from 'app/Navigation/RouteConst'
import NavigationActions from 'app/Navigation/NavigationActions'
import { updateConfigAttempt, InitWebsocketsActions } from 'app/Redux/ConfigRedux'
import { LoadInitialValuesActions } from 'app/Redux/SettingsRedux'
import {
  ConversationsSelectors,
  RemoveConversationActions,
  GetConversationsActions,
} from 'app/Redux/ConversationsRedux'
import { setCurrentConversationAttempt } from 'app/Redux/ChatRedux'

import styles from './MessagesTabScreenStyles'
import Analytics from 'appcenter-analytics';

class MessagesTabScreenView extends PureComponent {
  constructor (props) {
    super(props)
    NavigationActions.setNavigator(props.navigator, 3)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    Analytics.trackEvent('User on Messages');

    this.state = {
      conversations: props.conversations,
    }
  }

  componentDidMount () {
    const { unreadCount, isLoading } = this.props
    if (isLoading) {
      this.setBadge(0)
    } else {
      this.setBadge(unreadCount)
    }
  }

  componentWillReceiveProps ({ conversations, unreadCount, isLoading }) {
    this.setState({ conversations })
    // check if we have user profile

    if (isLoading) {
      this.setBadge(0)
    } else {
      this.setBadge(unreadCount)
    }
  }

  setBadge = count =>
    this.props.navigator.setTabBadge({
      tabIndex: 3,
      badge: count > 0 ? count : null,
      badgeColor: 'red',
    })

  onNavigatorEvent = (event) => {
    const { navigator, updateConfig, initWebsockets, loadInitialValues, popToRoot } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'menu') {
        NavigationActions.setNavigator(navigator, 3)
        navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        navigator.toggleDrawer({ side: 'left' })
      }
    } else if (event.id === 'bottomTabSelected') {
      updateConfig({ selectedTabIndex: event.selectedTabIndex })
      popToRoot(1)
    } else if (event.id === 'onActivityResumed') {
      // initWebsockets()
      // loadInitialValues()
    }
  }

  onConversationPress = (conversationId) => () => {
    const { setCurrentConversation, showModal } = this.props
    setCurrentConversation(conversationId)
    showModal(routeNames.ChatModal, routeParams.noNavbar, { conversationId }, 3)
  }

  extractKey = item => item._id

  onConversationLongPress = (conversationId) => () => {
    Alert.alert(
      '',
      'Are you sure you want remove the conversation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.props.removeConversation({ conversationId }) },
      ],
      { cancelable: true },
    )
  }

  onNewMessage = index => {
    const { conversations } = this.state
    this.setState({
      conversations: [conversations[index], ...conversations.filter((c, i) => i !== index)],
    })
  }

  renderItem = ({ item, index }) => {
    return <ConversationItem
      {...item}
      itemIndex={index}
      onNewMessage={this.onNewMessage}
      onPress={this.onConversationPress}
      onLongPress={this.onConversationLongPress}
    />
  }

  onRefresh = () => this.props.getConversations()

  render () {
    const { conversations } = this.state
    const { isLoading } = this.props
    
    
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.title}>My messages</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={conversations}
            refreshing={!!isLoading}
            extraData={conversations}
            onRefresh={this.onRefresh}
            renderItem={this.renderItem}
            keyExtractor={this.extractKey}
          />
        </View>
        {
          conversations.length === 0 &&
          <Text style={styles.noItemsPlaceholder}>
            Say hi!
          </Text>
        }
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: ConversationsSelectors.isLoadingSelector,
  unreadCount: ConversationsSelectors.conversationsBadgeSelector,
  conversations: ConversationsSelectors.sortedConversationsSelector,
})

const mapDispatchToProps = {
  updateConfig: updateConfigAttempt,
  showModal: NavigationActions.showModal,
  getConversations: GetConversationsActions.Attempt,
  setCurrentConversation: setCurrentConversationAttempt,
  removeConversation: RemoveConversationActions.Attempt,
  loadInitialValues: LoadInitialValuesActions.Attempt,
  initWebsockets: InitWebsocketsActions.Attempt,
  popToRoot: NavigationActions.popToRoot,
}

export const MessagesTabScreen = connect(mapStateToProps, mapDispatchToProps)(MessagesTabScreenView)
