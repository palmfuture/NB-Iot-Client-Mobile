import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native';

import axios from 'axios';

import { AppLoading } from 'expo';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imageOff: require('./assets/off.png'),
			imageOn: require('./assets/on.png'),
			isReady: false,
			status: 'off'
		}
	}

	componentDidMount = () => {
		axios.get('http://167.99.77.10:7782/status').then(e => {
			this.setState({ isReady: true, status: e.data.result });
		});
	}

	_handlePress = () => {
		const status = this.state.status === 'on' ? 'off' : 'on';
		axios.post('http://167.99.77.10:7782/status', { status }).then(e => {
			this.setState({ status: e.data.result });
		});
	}

	render() {
		const { isReady, imageOff, imageOn, status } = this.state;
		if (!isReady) return <AppLoading />
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this._handlePress}>
					<Image source={status === 'on' ? imageOn : imageOff} style={{ width: 128, height: 128 }} />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
