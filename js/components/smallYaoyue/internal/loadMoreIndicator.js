import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import pallete from '../styles/colors';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
class LoadMoreIndicator extends Component {

  render() {
    const { loading } = this.props;
    return (
      <ActivityIndicator
        animating={loading}
        color={pallete.theme}
        style={[styles.centering]}
        size="small"
      />
    );
  }
}


export default LoadMoreIndicator;