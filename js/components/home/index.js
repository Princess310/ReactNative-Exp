
import React, { Component } from 'react';
import { apiRoot } from '../../utils/fetch';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { Container, Header, Content, Footer, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { Card, ListItem, Button as Ebutton } from 'react-native-elements';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { fetchAppList } from '../../actions/app';
import styles from './styles';

class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  state = {
    appList: [
      {
        name: "Small Yaoyue",
        des: "Samll Yaoyue App is the link for customers to make a big deal.",
        icon: "code",
        buttonColor: '#03A9F4',
        image: require('../../../images/yaoyue/app-bg.png'),
        key: "smallYaoyue"
      },
      {
        name: "Joker Blog",
        des: "Joker Blog is my public blog to share my life and more things.",
        icon: "code",
        buttonColor: '#03A9F4',
        image: require('../../../images/joker/app-bg.png'),
        key: "joker"
      }
    ]
  }

  pushRoute(key) {
    const { user } = this.props;

    if(key === 'smallYaoyue') {
      if(user.access_token && user.access_token !== '') {
        Actions.smallYaoyueTabs();
      }else {
        Actions.smallYaoyue();
      }
    }
  }

  render() {
    const appList = this.state.appList.map((app, i) => {
      return (
        <Card
          key={i}
          title={app.name}
          image={app.image}
          imageStyle={{flex: 1, height: 200, margin: 8}}
        >
          <Text style={{marginBottom: 10}}>{app.des}</Text>
          <Ebutton
            icon={{name: app.icon}}
            backgroundColor={app.buttonColor}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW'
            onPress={() => this.pushRoute(app.key)}
          />
        </Card>
      )
    });

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>{(this.props.name) ? this.props.name : 'Apps'}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {appList}
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    getAppList: () => dispatch(fetchAppList()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
  appList: state.app.list,
  user: state.yaoyue.user,
});

export default connect(mapStateToProps, bindAction)(Home);
