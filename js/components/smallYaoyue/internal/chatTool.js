import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base';

import pallete from '../styles/colors';

const { width } = Dimensions.get('window');

export default class ChatTool extends Component {

	static propTypes = {
		style: React.PropTypes.object,
		onChangeText: React.PropTypes.func,
		onSendWords: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		text: React.PropTypes.string,
		placeholder: React.PropTypes.string,
	}

	defaultProps = {
		style: {},
		text: '',
		placeholder: '',
	}

	render() {
		const { style, text, placeholder, onChangeText, onSendWords, onFocus, onBlur } = this.props;

		return (
			<View style={[styles.container, style]}>
				<TextInput
					style={styles.input}
					onChangeText={(text) => {
						onChangeText(text);
					}}
					onFocus={onFocus}
					onBlur={onBlur}
					value={text}
					placeholder={placeholder}
				/>
				<Button
					style={{width: 56, height: 24, marginTop: 8, padding: 0, justifyContent: 'center', borderRadius: 4, backgroundColor: pallete.theme}}
					onPress={() => onSendWords()}
				>
					<Text style={{fontSize: 12, color: pallete.white}}>发送</Text>
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 56,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: pallete.white,
		borderTopWidth: 1,
		borderColor: pallete.border.normal,
	},
	input: {
		height: 40,
		width: width - 104,
		padding: 8,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: pallete.border.normal,
	},
});