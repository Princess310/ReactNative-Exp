import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

import styles from './styles';
import pallete from '../styles/colors';

class Match extends Component {

  render() {
    return (
      <View><Text>Match</Text></View>
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Match);