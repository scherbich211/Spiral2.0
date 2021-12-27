import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from '../Screens/SignIn/FirstComponents/RootStackScreen';
import DrawerNavigator from '../Navigations/Drawer';
import { useSelector } from 'react-redux';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';


const Navigator = () => {
	const load = useSelector((state) => state.auth.isLoggedIn);
	console.log('isLoggedIn', load);
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
			SplashScreen.hide();
			setIsLoaded(true);
	}, []);
	return (
		<NavigationContainer>
			{load == false ? (
				// <AnimatedSplash
				// 	translucent={true}
				// 	isLoaded={isLoaded}
				// 	logoImage={require('../Assets/Images/splash_icon.png')}
				// 	backgroundColor={'#C81A7C'}
				// 	logoHeight={150}
				// 	logoWidth={150}>
				<RootStackScreen />
			) : (
				<AnimatedSplash
					translucent={true}
					isLoaded={isLoaded}
					logoImage={require('../Assets/Images/splash_icon.png')}
					backgroundColor={'#CB1961'}
					logoHeight={150}
					logoWidth={150}>
					<DrawerNavigator />
				</AnimatedSplash>
			)}
		</NavigationContainer>
	);
};

export default Navigator;
