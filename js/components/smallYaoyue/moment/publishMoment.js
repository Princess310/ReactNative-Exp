import { View, Text, Image, TextInput, TouchableOpacity, AlertIOS } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import pallete from '../styles/colors';
import styles from './styles';

import { Container, Content, Header, Title, Button, Left, Right, Body, Icon, ListItem, Switch} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { publishMoment } from '../../../actions/yaoyue';

const {
  popRoute,
  pushRoute,
} = actions;

class PublishMoment extends Component {

  state = {
    content: '',
    fileCount: 0,
    fileLimit: 9,
    files: [],
    ifSwicthShare: true,
  }

  componentDidMount() {
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.pushRoute({ key: route, index: 3 }, this.props.navigation.key);
  }

  checkBack() {
    if(this.state.content !== ''){
      AlertIOS.alert(
        '',
        '是否放弃已有编辑信息',
        [
          {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: '确定', onPress: password => this.popRoute()},
        ]
      );
    }else {
      this.popRoute();
    }
  }

  publishMoment() {
    const { content } = this.state;

    this.props.publishMoment({
      content: content
    }).then(() => {
      this.popRoute();
    });
  }

  addFile() {
    const { files } = this.state;
    const options = {
      title: '选择图片',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从手机相册选择',
    };

    const self = this;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }else if(response.error) {
        console.log('ImagePicker Error: ', response.error);
      }else {
        self.setState({
          files: [
            ...files,
            response
          ],
          fileCount: (files.length + 1)
        });
      }
    });
  }

  delFile(index) {
    const { files } = this.state;

    const newFiles = files.filter((f, i) => {
      return (i !== index);
    });

    this.setState({
      files: newFiles,
      fileCount: newFiles.length
    });
  }

  render() {
    const { files } = this.state;

    const fileViews = files.map((file, i) => {
      return (
        <View style={styles.fileItem} key={i}>
          <Image source={file} style={{width: 80, height: 80}}/>
          <TouchableOpacity style={styles.delFile} onPress={() => this.delFile(i)}>
            <Icon name='md-close-circle' style={{color: pallete.text.help, fontSize: 16}}  />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.checkBack()}>
                <Icon name="md-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>信息发布</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.publishMoment()}>
                <Text style={{color: pallete.theme}}>发送</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <View style={styles.publishContent}>
              <TextInput
                multiline={true}
                numberOfLines={6}
                editable={true}
                value={this.state.content}
                style={{height: 100, fontSize: 14}}
                placeholder='这一刻的想法...'
                onChangeText={(content) => this.setState({content})}
              />
              <View style={styles.publishFiles}>
                {fileViews}
                <TouchableOpacity onPress={() => this.addFile()}>
                  <View style={[styles.fileItem, styles.addFile]}>
                    <Icon name='ios-add' style={{color: pallete.text.help, fontSize: 32}} />
                    <Text style={styles.addFileText}>{this.state.fileCount}/{this.state.fileLimit}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.publishActionPanel}>
              <ListItem icon>
                  <Left>
                      <Icon name="ios-aperture-outline" style={{color: pallete.theme}}/>
                  </Left>
                  <Body>
                    <Text style={{color: pallete.theme}}>同时分享到微信朋友圈</Text>
                  </Body>
                  <Right>
                      <Switch
                        tintColor={pallete.theme}
                        onTintColor={pallete.theme}
                        value={this.state.ifSwicthShare}
                        onValueChange={(value) => this.setState({ifSwicthShare: value})}
                      />
                  </Right>
              </ListItem>
              <ListItem icon>
                  <Left>
                      <Icon name="ios-mail-outline" style={{color: pallete.red}}/>
                  </Left>
                  <Body>
                    <Text style={{color: pallete.red}}>发个红包，让更多人看到~</Text>
                  </Body>
                  <Right>
                      <Text style={{color: pallete.text.help}}>了解详情</Text>
                      <Icon name="arrow-forward" />
                  </Right>
              </ListItem>
              <ListItem icon last>
                  <Left>
                      <Icon name="ios-at-outline" style={{color: pallete.text.help}}/>
                  </Left>
                  <Body>
                    <Text>提醒谁看</Text>
                  </Body>
                  <Right>
                      <Icon name="arrow-forward" />
                  </Right>
              </ListItem>
            </View>
          </Content>
        </Container>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRocute(route, key)),
    publishMoment: (props) => dispatch(publishMoment(props)),
  };
}

function mapStateToProps(state) {
  return {
    navigation: state.cardNavigation,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishMoment);