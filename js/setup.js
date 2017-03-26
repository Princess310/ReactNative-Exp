
import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './App';
import NavigationDrawer from './NavigationDrawer';
import smallYaoyue from './components/smallYaoyue';
import smallYaoyueLogin from './components/smallYaoyue/login';
import smallYaoyueTabs from './components/smallYaoyue/tabs';
import smallYaoyuePublishMoment from './components/smallYaoyue/moment/publishMoment';
import smallYaoyueMomentDetail from './components/smallYaoyue/moment/momentDetail';
import smallYaoyueMomentSearch from './components/smallYaoyue/moment/searchMoment';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="navDrawer" component={NavigationDrawer} initial={true} hideNavBar />
    <Scene key="smallYaoyue" component={smallYaoyue} hideNavBar />
    <Scene key="smallYaoyueLogin" component={smallYaoyueLogin} hideNavBar />
    <Scene key="smallYaoyueTabs" component={smallYaoyueTabs} hideNavBar />
    <Scene key="smallYaoyuePublishMoment" component={smallYaoyuePublishMoment} hideNavBar direction="vertical" />
    <Scene key="smallYaoyueMomentDetail" component={smallYaoyueMomentDetail} hideNavBar />
    <Scene key="smallYaoyueMomentSearch" component={smallYaoyueMomentSearch} hideNavBar />
  </Scene>
);
const RouterWithRedux = connect()(Router);

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <RouterWithRedux scenes={scenes} />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
