class NavigationActionsClass {
  navigator = {}

  setNavigator (navigator, index = 0) {
    this.navigator[index] = navigator
  }

  push = (screen, params, passProps, index = 0) => () => {
    this.navigator[index] &&
      this.navigator[index].push({
        screen,
        ...params,
        passProps,
      })
  }

  pop = (index = 0) => () => {
    this.navigator[index] &&
    this.navigator[index].pop()
  }

  resetTo = (screen, params) => () => {
    this.navigator &&
    this.navigator.resetTo({
      screen, ...params,
    })
  }

  toggleDrawer = () => () => {
    this.navigator[0] &&
    this.navigator[0].toggleDrawer({
      side: 'left',
    })
  }

  popToRoot = (index = 0) => () => {
    this.navigator[index] &&
    this.navigator[index].popToRoot()
  }

  showLightBox = (screen, params, passProps, index = 0) => () => {
    this.navigator[index] &&
    this.navigator[index].showLightBox({
      screen,
      style: {
        ...params.style,
        backgroundColor: '#00000050',
      },
      passProps,
    })
  }

  dismissLightBox = (index = 0) => () => {
    this.navigator[index] &&
    this.navigator[index].dismissLightBox()
  }

  showModal = (screen, params, passProps, index) => () => {
    this.navigator[index] &&
    this.navigator[index].showModal({
      screen,
      ...params,
      passProps,
    })
  }

  dismissLastModal = (index) => () => {
    this.navigator[index] &&
    this.navigator[index].dismissModal()
  }

  dismissModal = (index) => () => {
    this.navigator[index] &&
    this.navigator[index].dismissAllModals()
  }

  switchToTab = (tabIndex, routeIndex) => () =>
    this.navigator[routeIndex] &&
    this.navigator[routeIndex].switchToTab({
      tabIndex,
    })
}

export default new NavigationActionsClass()
