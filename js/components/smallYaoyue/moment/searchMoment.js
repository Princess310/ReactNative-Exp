import { View, Text, TouchableOpacity, Modal, ListView } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import MomentCard from './momentCard';
import LoadMoreIndicator from '../internal/loadMoreIndicator';

import pallete from '../styles/colors';
import styles from './styles';

import { doSearchMoment, clearSearchMoment } from '../../../actions/yaoyue';

class SearchMoment extends Component {
  state = {
    startPage: 1,
    page: 1,
    keyword: '',
    firstLoad: true,
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    loading: false,
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    this.props.clearSearchMoment();
  }

  handleSearch = () => {
    const { startPage, keyword } = this.state;

    this.props.doSearchMoment(keyword, startPage);
  }

  handleClear = () => {
    this.setState({keyword: ''});

    this.props.clearSearchMoment();
  }

  _loadMore = () => {
    const { searchHasNext } = this.props.moment;
    const { keyword, page, firstLoad } = this.state;

    if(firstLoad) {
      this.setState({
        firstLoad: false
      });

      return;
    }

    if(!searchHasNext){
      return;
    }

    this.setState({
      loading: true
    });

    this.props.doSearchMoment(keyword, page + 1).then(() => {
      this.setState({
        loading: false,
        page: page + 1,
      });
    });
  }

  render() {
    const { moment } = this.props;
    const { seachList } = moment;
    const { loading } = this.state;

    const listView = (
      <ListView
          enableEmptySections={true}
          dataSource={this.state.ds.cloneWithRows(seachList)}
          renderRow={(moment) => {
            return (
              <TouchableOpacity onPress={() => {Actions.smallYaoyueMomentDetail({id: moment.id})}}>
                <MomentCard key={moment.id} moment={moment} search={true} list={true} />
              </TouchableOpacity>
            )
          }}
          renderDistance={100}
          pageSize={1}
          initialListSize={10}
          renderFooter={() => <LoadMoreIndicator loading={loading} />}
          onEndReachedThreshold={100}
          onEndReached={() => this._loadMore()}
        />
    );

    return (
      <View style={[styles.container]}>
        <Header searchBar rounded>
            <Item>
                <Icon name="search" onPress={this.handleSearch}/>
                <Input
                  placeholder="搜索动态"
                  value={this.state.keyword}
                  onChangeText={(keyword) => this.setState({keyword})}
                  onSubmitEditing={this.handleSearch}
                  style={{fontSize: 14}}
                />
                <Icon active name="md-close" onPress={this.handleClear} />
            </Item>
            <Button transparent onPress={() => Actions.pop()}>
                <Text>取消</Text>
            </Button>
        </Header>
        <View style={styles.container}>
          {listView}
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doSearchMoment: (keyword, page) => dispatch(doSearchMoment(keyword, page)),
    clearSearchMoment: () => dispatch(clearSearchMoment()),
  };
}

function mapStateToProps(state) {
  return {
    moment: state.yaoyue.moment,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMoment);