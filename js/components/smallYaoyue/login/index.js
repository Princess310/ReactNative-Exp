import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { View, Image, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { Container, Content, Header, Title, Button, Left, Right, Body, Form, Item, Input, Label, Icon} from 'native-base';
import { Button as Ebutton } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import styles from './styles';
import pallete from '../styles/colors';

import { doLogin } from '../../../actions/yaoyue';

const {
  popRoute,
  pushRoute,
} = actions;

class Login extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  state = {
    showPwd: false,
    username: '',
    password: '',
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.pushRoute({ key: route, index: 3 }, this.props.navigation.key);
  }

  _toggleTextEntry = () => {
    this.setState({
      showPwd: !this.state.showPwd
    });
  }

  handleUsername = (text) => {
    this.setState({
      username: text
    });
  }

  handlePassword = (text) => {
    this.setState({
      password: text
    });
  }

  handleLogin() {
    const { username, password } = this.state;

    const self = this;
    this.props.doLogin(username, password).then((res) => {
      const token = res.payload.access_token;

      AsyncStorage.setItem('access_token', token).then(() => {
        self.pushRoute('smallYaoyueTabs', 3);
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.popRoute()}>
                <Icon name="md-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>登录</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <View style={styles.formWrapper}>
              <Form>
                <Item style={{
                  marginLeft: 0
                }}>
                    <Input placeholder="Username" onChangeText={this.handleUsername} style={{
                      paddingLeft: 15
                    }}/>
                </Item>
                <Item style={{
                  borderBottomWidth: 0
                }}>
                    <Input placeholder="Password" onChangeText={this.handlePassword} secureTextEntry={!this.state.showPwd}/>
                    <TouchableHighlight underlayColor={pallete.white} onPress={this._toggleTextEntry}>
                      <View>
                        <Icon name="ios-eye" style={{color: this.state.showPwd ? pallete.theme : pallete.disable}}/> 
                      </View>
                    </TouchableHighlight>
                </Item>
              </Form>
            </View>
            <Ebutton
              backgroundColor={pallete.button.primary.background}
              buttonStyle={styles.button}
              title='登录'
              disabled={this.state.username === ''|| this.state.password === ''}
              onPress={() => this.handleLogin()}
            />
          </Content>
        </Container>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    doLogin: (username, password) => dispatch(doLogin(username, password)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  yaoyue: state.yaoyue,
});


export default connect(mapStateToProps, bindAction)(Login);
