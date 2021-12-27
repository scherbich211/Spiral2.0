import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StatusBar, Text, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import UserAvatar from '../../Navigations/UserAvatar';

import styles from './style/style';

import { dollars, cents, ListOf } from './List';

import Video from 'react-native-video';

import {
	ButtonShare,
	DateNow,
	HeaderPartsContainer,
	ImageChildren,
	ImpactText,
	TotalAvailableCash,
	VideoChildren,
} from './ComponentsForHome';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen({ navigation }) {
	// const ref = useRef(null);
	//-----date+time---------------------------------------------
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
	//------video------------------------------------------------------
	const videoURL = require('../../Assets/video.mp4');
	const [videoProps, setVideoProps] = useState({
		music: true,
		iconMusic: 'volume-mute',
		paused: true,
	});
	const _handleScroll = (event) => {
		if (event.nativeEvent.contentOffset.y > 300) {
			setVideoProps({
				...videoProps,
				paused: false,
			});
		} else {
			setVideoProps({
				...videoProps,
				paused: true,
			});
		}
	};
	const MusicVolume = () => {
		if (videoProps.music == true) {
			setVideoProps({
				...videoProps,
				music: false,
				iconMusic: 'volume-high',
			});
		} else {
			setVideoProps({
				...videoProps,
				music: true,
				iconMusic: 'volume-mute',
			});
		}
	};

	//----------Nvigation--------------------------------------------------
	const navigate = (screen) => {
		navigation.navigate(screen.title, {
			title: screen.title,
			subtitle: screen.subtitle,
		});
	};
	const navigateCards = () => {
		navigation.navigate('Cards');
	};
	const navigateVideo = () => {
		navigation.navigate('Video');
	};

	//--------------------------------------------------------------
	const data = [
		{
			data: 'someData',
		},
	];

	const renderItem = ({ item }) => (
		<View style={{flex: 1}}>
			<StatusBar backgroundColor="#C81A7C" />
			<View style={styles.container}>
				<View style={styles.partsContainer}>
					<TotalAvailableCash navigateCards={navigateCards} />
					<View style={{ marginTop: 10 }}>
						<ListOf cardsScreens={navigate} />
					</View>
				</View>
				<View style={styles.partsContainer}>
					<HeaderPartsContainer />
					<ImageChildren />
					<ImpactText />
					<ButtonShare />
				</View>
				<View style={styles.partsContainer}>
					<TouchableOpacity
						onPress={() => {
							navigateVideo();
						}}>
						<HeaderPartsContainer />
						<View style={styles.ImageOrVideoPartsContainer}>
							<Video source={videoURL} style={styles.videoNormal} muted={videoProps.music} paused={videoProps.paused} />
							<View>
								<View style={styles.buttonMusic}>
									<Icon.Button
										name={videoProps.iconMusic}
										size={25}
										color="white"
										backgroundColor="transparent"
										onPress={MusicVolume}
									/>
								</View>
							</View>
						</View>
						<ImpactText />
						<ButtonShare />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
	return (
		<View style={styles.screenView}>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				onScroll={_handleScroll}
				ListHeaderComponent={<DateNow />}
				ListHeaderComponentStyle={{margin: 10}}
			/>
		</View>
	);
}

const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation }) {
	const navig = () => {
		navigation.navigate('Profile');
	};
	return (
		<HomeStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
			}}>
			<HomeStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerLeft: () => (
						<View>
							<Icon.Button
								name="ios-menu"
								size={25}
								backgroundColor="#C81A7C"
								onPress={() => navigation.openDrawer()}
							/>
						</View>
					),
					headerTitle: () => (
						<View style={styles.topBar}>
							<Image source={require('../../Assets/Images/heart.png')} style={styles.topBarImage} />
							<Text style={styles.topBarText}>Spiral</Text>
						</View>
					),
					headerRight: () => (
						<View style={{ marginRight: 10 }}>
							<UserAvatar navig={navig} able={true}/>
						</View>
					),
				}}
			/>
		</HomeStack.Navigator>
	);
}

export default HomeStackScreen;
