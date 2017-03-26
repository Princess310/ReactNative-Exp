import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import pallete from '../styles/colors';
import styles from './styles';

import {
    LazyloadImage
} from 'react-native-lazyload';
import { oepnGallery } from '../../../actions/gallery';
import ParsedText from 'react-native-parsed-text';

import date from '../../../utils/date';
import { doLikeMomet } from '../../../actions/yaoyue';

class MomentCard extends Component {
  static propTypes = {
	 moment: React.PropTypes.object,
  }

  state = {
    currentRole: 0,
  }

  componentDidMount() {
  }

  renderPhoneText(matchingString, matches) {
    const pattern = /\d{11}/i;
    const match = matchingString.match(pattern);
    return (
      <Text style={{color: pallete.theme}}>{match[0]}</Text>
    );
  }

  handlePhonePress(phone) {
    const pattern = /\d{11}/i;
    phone = phone.match(pattern)[0];

    const url = 'tel:' + phone;

    Linking.canOpenURL(url).then((supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    }))
  }

  handleDoLike = () => {
    const { moment } = this.props;

    this.props.doLikeMomet(moment.id, moment.uid);
  }

  render() {
  	const { lazyloadHost, moment, search, list } = this.props;
  	const imageLength = moment.pictures.length;
  	const imageWidth = imageLength > 4 ? 75 : (imageLength > 1 ? 110 : 210);
    const showInList = list ? true : false;

  	const imagesViews = moment.pictures.map((image, i) => {
  		return (
  			<TouchableOpacity
	  			key={i}
	  			onPress={() => {
	  				this.props.oepnGallery(i, moment.pictures);
	  			}}
	  			style={[styles.cardImage, {width: imageWidth, height: imageWidth}]}
	  		>
          { lazyloadHost ?
            <LazyloadImage
              host={lazyloadHost}
              source={{uri: image}}
              style={[styles.cardImage, {width: imageWidth, height: imageWidth}]}
            /> : 
            <Image
              host={lazyloadHost}
              source={{uri: image}}
              style={[styles.cardImage, {width: imageWidth, height: imageWidth}]}
            /> 
          }
  				
  			</TouchableOpacity>
  		)
  	});

  	const shareStyle = moment.is_share > 0 ? styles.cardActionActive : {};
  	const commentStyle = moment.is_commit > 0 ? styles.cardActionActive : {};
  	const likeStyle = moment.is_like > 0 ? styles.cardActionActive : {};

    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
        	<Image source={{uri: moment.avatar}} style={styles.cardAvatar}/>
        </View>
        <View style={styles.cardRight}>
        	<View style={styles.cardHead}>
        		<Text style={[styles.cardHeadText, styles.cardUsername]}>{moment.nickname}</Text>
        		<Text style={styles.cardHeadText}>{moment.company}</Text>
        		<Text style={styles.cardHeadText}>{moment.position}</Text>
        	</View>
        	<Text style={styles.cardTime}>{date.parseDate(moment.created_at)}</Text>
        	<View style={styles.cardContent}>
            <ParsedText
              numberOfLines={showInList ? 4 : 0}
              style={styles.cardContentText}
              parse={
                [
                  {pattern: /<a href\="tel:\d*"\>\d*\<\/a\>/i,  onPress: this.handlePhonePress, renderText: this.renderPhoneText},
                ]
              }
            >
              {moment.content}
            </ParsedText>
        	</View>
        	<View style={styles.cardImages}>
        		{imagesViews}
        	</View>
        	<View style={styles.cardSubInfo}>
        		{moment.hits > 0 && <Text style={styles.cardSubInfoText}>{moment.hits}人看过</Text>}
        		{moment.balance >= 0 && <Text style={[styles.cardSubInfoText, styles.cardSubInfoHongbao]}>红包金额剩余{moment.remained}元</Text>}
        	</View>
          {
            search ? null :
            <View style={styles.cardAction}>
              <View style={styles.cardActionItem}>
                <Icon name='md-share' style={[styles.cardActionIcon, shareStyle]}/>
                <Text style={styles.cardActionText}>{moment.share_count}</Text>
              </View>
              <View style={styles.cardActionItem}>
                <Icon name='md-chatboxes' style={[styles.cardActionIcon, commentStyle]}/>
                <Text style={styles.cardActionText}>{moment.comment_count}</Text>
              </View>
              <TouchableOpacity style={styles.cardActionItem} onPress={this.handleDoLike}>
                <Icon name='md-thumbs-up' style={[styles.cardActionIcon, likeStyle]}/>
                <Text style={styles.cardActionText}>{moment.likes.length}</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    oepnGallery: (initialPage, images) => dispatch(oepnGallery(initialPage, images)),
    doLikeMomet: (id, uid) => dispatch(doLikeMomet(id, uid)),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentCard);