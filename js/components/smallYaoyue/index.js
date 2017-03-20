
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { View, Image, Text, Modal } from 'react-native';
import { Button } from 'react-native-elements'
import Swiper from 'react-native-swiper';
import Gallery from 'react-native-gallery';
import Orientation from 'react-native-orientation';
import styles from './styles';

import { closeGallery } from '../../actions/gallery';

const {
  popRoute,
  pushRoute,
} = actions;

class SmallYaoyue extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  state = {
    imgList: [
      require('../../../images/yaoyue/app-1.jpg'),
      require('../../../images/yaoyue/app-2.png'),
      require('../../../images/yaoyue/app-3.png'),
      require('../../../images/yaoyue/app-4.png'),
      require('../../../images/yaoyue/app-5.png'),
    ]
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 2 }, this.props.navigation.key);
  }

  componentWillMount() {
    Orientation.lockToPortrait();
  }

  render() {
    const { gallery: { galleryState, initialPage, images }, closeGallery } = this.props;

    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} showsButtons={false} loop={false}  paginationStyle={styles.pagination}>
          {this.state.imgList.map((img, i) => {
            return (
              <View style={styles.slide} key={i}>
                <Image
                  source={img}
                  style={styles.img}
                />
              </View>
            )
          })}
        </Swiper>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() => this.popRoute()}
            buttonStyle={styles.button}
            title='免费注册' />
          <Button
            onPress={() => this.pushRoute('smallYaoyueLogin')}
            buttonStyle={styles.button}
            title='登陆' />
        </View>
        <Modal
          visible={galleryState === 'opened'}
        >
          <View style={{flex: 1}}>
            <Gallery
              style={{flex: 1, backgroundColor: 'transparent'}}
              initialPage={initialPage}
              pageMargin={10}
              images={images}
              onSingleTapConfirmed={() => {
                closeGallery();
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    closeGallery: () => dispatch(closeGallery()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  gallery: state.gallery,
});


export default connect(mapStateToProps, bindAction)(SmallYaoyue);
