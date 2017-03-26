
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { View, Image, Text, Modal } from 'react-native';
import { Button } from 'react-native-elements'
import Swiper from 'react-native-swiper';
import Gallery from 'react-native-gallery';
import Orientation from 'react-native-orientation';
import styles from './styles';

import { closeGallery } from '../../actions/gallery';

class SmallYaoyue extends Component {
  state = {
    imgList: [
      require('../../../images/yaoyue/app-1.jpg'),
      require('../../../images/yaoyue/app-2.png'),
      require('../../../images/yaoyue/app-3.png'),
      require('../../../images/yaoyue/app-4.png'),
      require('../../../images/yaoyue/app-5.png'),
    ]
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
            onPress={() => Actions.pop()}
            buttonStyle={styles.button}
            title='免费注册' />
          <Button
            onPress={() => Actions.smallYaoyueLogin()}
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
    closeGallery: () => dispatch(closeGallery()),
  };
}

const mapStateToProps = state => ({
  gallery: state.gallery,
});


export default connect(mapStateToProps, bindAction)(SmallYaoyue);
