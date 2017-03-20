import { View, Text, TabBarIOS, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import pallete from '../styles/colors';
import styles from './styles';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {
    LazyloadListView,
    LazyloadView
} from 'react-native-lazyload';
import ActionButton from 'react-native-action-button';

import MomentCard from './momentCard';
import LoadMoreIndicator from '../internal/loadMoreIndicator';
import { fetchMomentRoles, fetchMomentList } from '../../../actions/yaoyue';

const {
  popRoute,
  pushRoute,
} = actions;

let roleForRoleMap = {};

class Moment extends Component {

  state = {
    startPage: 1,
    currentRole: 0,
    galleryImages: [],
    galleryInitialPage: 0,
    listRefPrefix: 'list-ref-',
    refreshForRoleMap: {},
    loadingForRoleMap: {},
    pageForRoleMap: {},
    firstLoadedRoleMap: {},
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  componentDidMount() {
    this.props.fetchMomentRoles().then((res) => {
      const { list } = res.payload;

      if(list.length > 0){
        const firstRole = list[0].id;

        this.setState({
          currentRole: firstRole,
        });
        this.props.fetchMomentList(firstRole);
      }
    });
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.pushRoute({ key: route, index: 4 }, this.props.navigation.key);
  }

  _onChangeTab = (tab) => {
    const role = roleForRoleMap[tab.i];
    const { listMap } = this.props.moment;

    role && this.setState({
      currentRole: role.id
    });

    if(role && !listMap[role.id]) {
      this.props.fetchMomentList(role.id, this.state.startPage);
    }
  }

  _refreshMoment(roleId) {
    const { refreshForRoleMap, pageForRoleMap, startPage } = this.state;

    this.setState({
      refreshForRoleMap: {
        ...refreshForRoleMap,
        [roleId]: true,
      }
    });

    this.props.fetchMomentList(roleId).then(() => {
      this.setState({
        refreshForRoleMap: {
          ...refreshForRoleMap,
          [roleId]: false,
        },
        pageForRoleMap: {
          ...pageForRoleMap,
          [roleId]: startPage
        }
      });
    });
  }

  _loadMore(roleId) {
    const { loadingForRoleMap, pageForRoleMap, firstLoadedRoleMap } = this.state;
    const page = (typeof pageForRoleMap[roleId] === 'undefined' ? 1 : pageForRoleMap[roleId]);
    const firstLoaded = (typeof firstLoadedRoleMap[roleId] === 'undefined' ? false : firstLoadedRoleMap[roleId]);
    const { hasNextMap } = this.props.moment;

    if(!firstLoaded){
      this.setState({
        firstLoadedRoleMap: {
          ...firstLoadedRoleMap,
          [roleId]: true,
        }
      });

      return;
    }

    // page check
    if(!hasNextMap[roleId]){
      return;
    }

    this.setState({
      loadingForRoleMap: {
        ...loadingForRoleMap,
        [roleId]: true,
      }
    });

    this.props.fetchMomentList(roleId, page + 1).then(() => {
      this.setState({
        loadingForRoleMap: {
          ...loadingForRoleMap,
          [roleId]: false,
        },
        pageForRoleMap: {
          ...pageForRoleMap,
          [roleId]: page + 1,
        }
      });
    });
  }

  backTop() {
    const { currentRole } = this.state;

    this[this.state.listRefPrefix + currentRole].scrollTo({ y: 0 });
  }

  render() {
    const { roles, listMap } = this.props.moment;
    const { refreshForRoleMap, loadingForRoleMap } = this.state;

    const tabViews = roles.map((role, i) => {
      // record for role
      roleForRoleMap[i] = role;
      const list = listMap[role.id] || [];
      // record lazyload host
      const lazyloadHost = 'lazyload' + role.id;
      const refreshing = (typeof refreshForRoleMap[role.id] === 'undefined' ? false : refreshForRoleMap[role.id]);
      const loading = (typeof loadingForRoleMap[role.id] === 'undefined' ? false : loadingForRoleMap[role.id]);

      return (
        <LazyloadListView
          {...ListView.defaultProps}
          tabLabel={role.name}
          key={role.id}
          name={lazyloadHost}
          ref={ref => this[this.state.listRefPrefix + role.id] = ref}
          enableEmptySections={true}
          dataSource={this.state.ds.cloneWithRows(list)}
          renderRow={(moment) => {
            return (
              <LazyloadView key={moment.id} host={lazyloadHost}>
                <MomentCard moment={moment} lazyloadHost={lazyloadHost} />
              </LazyloadView>
            )
          }}
          renderDistance={100}
          pageSize={1}
          initialListSize={10}
          refreshControl={
            <RefreshControl
              onRefresh={() => {this._refreshMoment(role.id)}}
              refreshing={refreshing}
              tintColor={pallete.theme}
              title='Loading...'
            />
          }
          renderFooter={() => <LoadMoreIndicator loading={loading} />}
          onEndReachedThreshold={100}
          onEndReached={() => this._loadMore(role.id)}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.tabBar}></View>
        <ScrollableTabView
          tabBarActiveTextColor={pallete.theme}
          tabBarUnderlineStyle={{backgroundColor: pallete.theme}}
          tabBarBackgroundColor={pallete.tabBackground}
          renderTabBar={() => <ScrollableTabBar />}
          onChangeTab={this._onChangeTab}
        >
          {tabViews}
        </ScrollableTabView>
        <ActionButton
          buttonColor={pallete.theme}
          offsetY={80}
        >
          <ActionButton.Item buttonColor='#9b59b6' title='发布' onPress={() => this.pushRoute('smallYaoyuePublishMoment')}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='rgba(231,76,60,1)' title='搜索' onPress={() => {}}>
            <Icon name="md-search" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title='返回顶部' onPress={() => {this.backTop()}}>
            <Icon name="md-arrow-up" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    fetchMomentRoles: () => dispatch(fetchMomentRoles()),
    fetchMomentList: (role, page) => dispatch(fetchMomentList(role, page)),
  };
}

function mapStateToProps(state) {
  return {
    navigation: state.cardNavigation,
    moment: state.yaoyue.moment,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Moment);