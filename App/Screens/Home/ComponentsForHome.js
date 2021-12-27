import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './style/style';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import { dollars, cents } from './List';

export const HeaderPartsContainer = () => {
	return (
		<View style={styles.headerPartsContainer}>
			<Image source={require('../../Assets/Images/avatar.png')} />
			<View style={styles.textHeaderPartsContainer}>
				<Text style={styles.impactHeaderPartsContainer}>Your Giving Impact</Text>
				<View style={styles.littleContainerHeaderPartsContainer}>
					<Text style={styles.greyTextHeaderPartsContainer}>St Jude</Text>
					<View style={styles.dot} />
					<Text style={styles.greyTextHeaderPartsContainer}>4 hrs ago</Text>
				</View>
			</View>
		</View>
	);
};

export const ImageChildren = () => {
	return (
		<View style={styles.ImageOrVideoPartsContainer}>
			<Image style={{ width: '100%' }} source={require('../../Assets/Images/rectangle2.png')} />
		</View>
	);
};

export const ImpactText = () => {
	return (
		<View style={styles.impactTextPartsContainer}>
			<Text style={{ fontWeight: '300' }}>
				Danny. Your donation helped 5 amazing kids get much needed cancer surgery, thanks for being amazing!
			</Text>
		</View>
	);
};

// export const VideoChildren = ({ videoPaused }) => {
// 	const videoURL = require('../../Assets/video.mp4');
// 	const [videoProps, setVideoProps] = useState({
// 		music: true,
// 		iconMusic: 'volume-mute',
// 		paused: true,
// 		styleVideo: styles.videoNormal,
// 	});
// 	const MusicVolume = () => {
// 		if (videoProps.music == true) {
// 			setVideoProps({
// 				...videoProps,
// 				music: false,
// 				iconMusic: 'volume-high',
// 			});
// 		} else {
// 			setVideoProps({
// 				...videoProps,
// 				music: true,
// 				iconMusic: 'volume-mute',
// 			});
// 		}
// 	};
// 	return (
// 		<View style={styles.ImageOrVideoPartsContainer}>
// 			<Video source={videoURL} style={videoProps.styleVideo} muted={videoProps.music} paused={videoProps.paused} />
// 			<View>
// 				<View style={styles.buttonMusic}>
// 					<Icon.Button
// 						name={videoProps.iconMusic}
// 						size={25}
// 						color="white"
// 						backgroundColor="transparent"
// 						onPress={MusicVolume}
// 					/>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };

export const ButtonShare = () => {
	return (
		<View>
			<TouchableOpacity style={styles.shareButton}>
				<Image source={require('../../Assets/Images/shareArrow.png')} />
				<Text style={styles.shareButtonText}>Share to spread the word</Text>
			</TouchableOpacity>
		</View>
	);
};

export const DateNow = () => {
	const [currentDate, setCurrentDate] = useState('');
	useEffect(() => {
		let date = moment().format('MMM DD, YYYY');
		setCurrentDate(date);
	}, []);
	const [currentTime, setCurrentTime] = useState('');
	useEffect(() => {
		let time = new Date().getHours();
		if (time >= 0 && time <= 11) {
			setCurrentTime('Good morning');
		} else if (time >= 12 && time <= 17) {
			setCurrentTime('Good Afternoon');
		} else {
			setCurrentTime('Good evening');
		}
	}, []);
	return (
		<Text style={styles.date}>
			{currentTime} Danny | {currentDate}
		</Text>
	);
};

export const TotalAvailableCash = ({ navigateCards }) => {
	return (
		<TouchableOpacity onPress={() => navigateCards()}>
			<Text style={{ fontSize: 25, alignSelf: 'center' }}>Accounts Overview</Text>
			<Text style={{ fontSize: 25, alignSelf: 'center' }}>
				${dollars.reduce((a, b) => a + b, 0)}
				<Text style={{ fontSize: 20, alignSelf: 'center' }}>.{cents.reduce((a, b) => a + b, 0)}</Text>
			</Text>
			<Text style={styles.totalAvailableCash}>Total Available Cash</Text>
		</TouchableOpacity>
	);
};
