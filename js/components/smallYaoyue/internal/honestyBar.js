import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import pallete from '../styles/colors';

const barWidth = 40;

export default class honestyBar extends Component {
	static propTypes = {
		percent: React.PropTypes.number,
	}

	render() {
		const { percent } = this.props;
		const width = barWidth * percent;

		return (
			<View style={styles.barBg}>
				<View style={[styles.progress, {width: width}]}></View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	barBg: {
		position: 'relative',
		width: barWidth,
		height: 10,
		marginLeft: 4,
		marginRight: 4,
		backgroundColor: '#dfdce0',
		borderRadius: 4,
	},
	progress: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		borderRadius: 4,
		backgroundColor: pallete.text.yellow,
	}
});