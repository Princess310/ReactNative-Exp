import { View, Text, TabBarIOS } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from '../moment';
import Match from '../match';
import User from '../user';
import styles from './styles';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const { jumpTo } = navigationActions;

class YaoyueTabs extends Component {
  _renderTabContent(tab) {
    if (tab.key === 'moment') {
      return (
        <Moment />
      );
    }

    if (tab.key === 'match') {
      return (
        <Match />
      );
    }

    if (tab.key === 'user') {
      return (
        <User />
      );
    }

    return <Text>Hello there</Text>;
  }

  render() {
    const { dispatch, navigation } = this.props;
    const children = navigation.routes.map( (tab, i) => {
      return (
        <Icon.TabBarItemIOS
          title={tab.title}
          onPress={ () => dispatch(jumpTo(i, navigation.key)) }
          iconName={tab.iconName}
          selectedIconName={tab.selectedIconName}
          iconColor={navigation.color}
          selectedIconColor={navigation.selectedColor}
          renderAsOriginal={true}
          key={i}
          selected={this.props.navigation.index === i}>
          { this._renderTabContent(tab) }
        </Icon.TabBarItemIOS>
      );
    });
    return (
      <TabBarIOS tintColor={navigation.selectedColor} unselectedItemTintColor={navigation.color}>
        {children}
      </TabBarIOS>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    navigation: state.yaoyueTabs
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(YaoyueTabs);