import { View, Text, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import pallete from '../styles/colors';
import styles from './styles';

import {
    LazyloadListView
} from 'react-native-lazyload';
import MomentCard from './momentCard';
import CommentCard from './commentCard';
import UserInfoBar from './userInfoBar';
import ChatTool from '../internal/chatTool';
import { Container, Content, Header, Title, Button, Left, Right, Body, Icon, ListItem, Switch} from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { fetchMomentDetail, doAddComment } from '../../../actions/yaoyue';

const { width: winWidth } = Dimensions.get('window');

class CustomTabBar extends Component {
  render() {
    return (
      <View style={styles.customTabBar}>
        <ScrollableTabBar {...this.props} />
      </View>
    )
  }
}

class MomentDetail extends Component {
  static propTypes = {
	 id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  }

  state = {
    tabs: [
      {
        name: '评论',
        field: 'comments',
        countField: 'comment_count',
        count: 0,
      },
      {
        name: '赞',
        field: 'likes',
        countField: 'like_count',
        count: 0,
      },
      {
        name: '分享',
        field: 'shares',
        countField: 'share_count',
        count: 0,
      }
    ],
    chatText: '',
    chatPlaceholder: '输入评论...',
    commentId: '',
  }

  componentDidMount() {
    const { id } = this.props;

    this.props.fetchMomentDetail(id);
  }

  doAddComment() {
    const { moment } = this.props;
    const { chatText, commentId } = this.state;

    this.props.doAddComment(moment.id, moment.uid, chatText, commentId).then(() => {
      this.setState({
        chatText: '',
        commentId: '',
      });
    });
  }

  render() {
    const { moment } = this.props;
    const tabViews = this.state.tabs.map((tab, i) => {
      const list = moment[tab.field];

      let listView = null;
      if(list){
        listView = list.map((l, i) => {
          return tab.field === 'comments' ? (
            <TouchableOpacity onPress={() => {
              this.setState({
                chatPlaceholder: '回复' + l.nickname,
                commentId: l.id
              });
            }}>
              <CommentCard comment={l} key={l.id} />
            </TouchableOpacity>
          ) : (<UserInfoBar user={l} key={l.id} />)
        });
      }

      return (
        <View
          tabLabel={tab.name + ' ' + (moment[tab.countField] ? moment[tab.countField] : 0)}
          key={i}
        >
          {listView}
        </View>
      )
    });

    return (
      <View style={[styles.container, { paddingBottom: 64 }]}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name="md-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>动态详情</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            { moment && moment.id && <MomentCard moment={moment} /> }
            <View style={styles.detailPanel}>
              <ScrollableTabView
                tabBarActiveTextColor={pallete.theme}
                tabBarUnderlineStyle={{backgroundColor: pallete.theme}}
                tabBarBackgroundColor={pallete.tabBackground}
                renderTabBar={() => <CustomTabBar style={{backgroundColor: pallete.white, width: 210, borderWidth: 0}} tabsContainerStyle={{width: 210}} />}
                onChangeTab={this._onChangeTab}
              >
                {tabViews}
              </ScrollableTabView>
            </View>
          </Content>
        </Container>

        <ChatTool
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}
          text={this.state.chatText}
          placeholder={this.state.chatPlaceholder}
          onChangeText={(text) => {
            this.setState({chatText: text});
          }}
          onBlur={() => {
            this.setState({
              chatText: '',
              chatPlaceholder: '输入评论...',
              commentId: '',
            })
          }}
          onSendWords={this.doAddComment}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMomentDetail: (id) => dispatch(fetchMomentDetail(id)),
    doAddComment: (id, uid, content, pid) => dispatch(doAddComment(id, uid, content, pid)),
  };
}

function mapStateToProps(state) {
  return {
    moment: state.yaoyue.moment.detail
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentDetail);