import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { Component } from 'react';

import pallete from '../styles/colors';
import styles from './styles';

class UserInfoBar extends Component {
  static propTypes = {
	 user: React.PropTypes.object,
   style: React.PropTypes.object,
  }

  componentDidMount() {
  }

  render() {
  	const { user, style } = this.props;

    return (
      <View style={[styles.userBar, style]}>
        <View style={styles.userBarLeft}>
          <Image source={{uri: user.avatar}} style={styles.userBarAvatr}/>
        </View>
        <View style={styles.userBarRight}>
          <View style={styles.cardHead}>
            <Text style={[styles.cardHeadText, styles.cardUsername]}>{user.nickname}</Text>
            <Text style={styles.cardHeadText}>{user.company}</Text>
            <Text style={styles.cardHeadText}>{user.position}</Text>
            <Text style={[styles.userTag, styles.userLevel]}>V{user.integrity_level}</Text>
            <Text style={[styles.userTag, styles.userInfluence]}>V{user.influence}</Text>
          </View>
          <Text style={styles.cardTime}>{user.tag_identity_name}</Text>
        </View>
      </View>
    );
  }
}

export default UserInfoBar;