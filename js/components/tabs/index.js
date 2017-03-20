import { View, Text, TabBarIOS } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../home';
import styles from './styles';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const { jumpTo } = navigationActions;

class ApplicationTabs extends Component {
  _renderTabContent(tab) {
    if (tab.key === 'feed') {
      return (
        <Home />
      );
    }

    if (tab.key === 'notifications') {
      return (
        <View style={[styles.tabContent, {backgroundColor: 'white'}]} />
      );
    }

    if (tab.key === 'settings') {
      return (
        <View style={[styles.tabContent, {backgroundColor: 'white'}]} />
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
    navigation: state.tabs
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);