import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

import styles from './styles';
import pallete from '../styles/colors';
import ParallaxView from 'react-native-parallax-view';
import HonestyBar from '../internal/honestyBar';
import { ListItem, Left, Body, Right, Icon } from 'native-base';

class User extends Component {

  render() {
    const { user } = this.props;

    return (
      <ParallaxView
          ref={component => this._scrollView = component}
          backgroundSource={require('../../../../images/yaoyue/person-bg.png')}
          windowHeight={230}
          scrollableViewStyle={{backgroundColor: pallete.background.normal, paddingBottom: 15}}
          style={{backgroundColor: pallete.background.normal}}
          header={
            <View style={styles.header}>
              <View style={styles.iconBar}>
                 <Icon name='ios-notifications-outline' style={{color: 'white'}}/>
                 <Icon name='ios-settings-outline' style={{color: 'white'}} />
              </View>
              <View style={styles.headerContent}>
                <Image style={styles.headeImage} source={{uri: user.avatar}} />
                <Text style={styles.headerText}>{user.nickname}</Text>
                <Text style={styles.headerText}>{user.company}</Text>
                <Text numberOfLines={1} style={styles.headerText}>{user.intro}</Text>
              </View>
            </View>
          }>
        <View style={styles.headerBar}>
          <View style={styles.headerBarItem}>
            <Text style={styles.headerBarItemText}>影响力：</Text>
            <Text style={styles.headerBarItemTextBlue}>30</Text>
          </View>
          <View style={[styles.headerBarItem, styles.borderLeft]}>
            <Text style={styles.headerBarItemText}>诚信值</Text>
            <HonestyBar percent={Number(user.integrity_progress)} />
            <Text style={styles.headerBarItemTextYellow}>v{user.integrity_level}</Text>
          </View>
        </View>
        <View style={styles.actionBar}>
          <View style={styles.actionBarItem}>
            <Text>资料编辑</Text>
          </View>
          <View style={[styles.borderLeft, styles.actionBarItem]}>
            <Text>业务介绍</Text>
          </View>
        </View>

        <View style={styles.listMenu}>
          <ListItem icon>
            <Left>
                <Icon name="md-people" style={{color: pallete.theme}}/>
            </Left>
            <Body>
              <Text>访客</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
                <Icon name="ios-aperture-outline" style={{color: pallete.theme}}/>
            </Left>
            <Body>
              <Text>我的商务圈</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
                <Icon name="logo-buffer" style={{color: pallete.theme}}/>
            </Left>
            <Body>
              <Text>我的需求</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon last>
            <Left>
                <Icon name="ios-pricetags-outline" style={{color: pallete.theme}}/>
            </Left>
            <Body>
              <Text>我的收藏</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </View>

        <View style={styles.listMenu}>
          <ListItem icon last>
            <Left>
                <Icon name="md-alert" style={{color: pallete.theme}}/>
            </Left>
            <Body>
              <Text>成为认证用户</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </View>

        <View style={styles.listMenu}>
          <ListItem style={{justifyContent: 'center'}} last>
            <Icon name="md-share" style={{fontSize: 15, color: pallete.theme}}/>
            <Text style={{color: pallete.theme, marginLeft: 8}}>邀请好友帮您增加影响力</Text>
          </ListItem>
        </View>
      </ParallaxView>
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
    user: state.yaoyue.user
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(User);