import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import UserInfoBar from './userInfoBar';
import pallete from '../styles/colors';
import styles from './styles';
import ParsedText from 'react-native-parsed-text';

import { doLikeComment } from '../../../actions/yaoyue';

class CommentCard extends Component {
  static propTypes = {
	 comment: React.PropTypes.object,
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
    const { comment } = this.props;

    this.props.doLikeComment(comment.id, comment.uid);
  }

  render() {
  	const { comment } = this.props;
    const likeStyle = comment.is_like > 0 ? styles.cardActionActive : {};
    const replyWords = comment.to_name !== '' ? (<Text>回复<Text style={styles.commentReply}>{comment.to_name}</Text>:</Text>) : null;

    return (
      <View style={styles.commentCard}>
        <UserInfoBar user={comment} style={{borderBottomWidth: 0}} />
        <View style={styles.commentContent}>
          <Text>{replyWords}{comment.content}</Text>
        </View>
        <TouchableOpacity style={styles.commentActionBar} onPress={this.handleDoLike}>
          <Icon name='md-thumbs-up' style={[styles.cardActionIcon, likeStyle]}/>
          <Text style={styles.cardActionText}>{comment.like_count}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doLikeComment: (id, uid, type) => dispatch(doLikeComment(id, uid, type)),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);