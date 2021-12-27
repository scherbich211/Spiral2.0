import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabBar';
import { DrawerContent } from './Shared';
import CheckingStackScreen from '../../Screens/Checking';
import SavingsStackScreen from '../../Screens/Saving';
import VideoStackScreen from '../../Screens/Home/videoAndroid';
import ProfileStackScreen from '../../Screens/Profile/index.tsx';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator headerMode="none" initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
			<Drawer.Screen name="HomeDrawer" component={TabNavigator} />
			<Drawer.Screen name="Checking" component={CheckingStackScreen} />
			<Drawer.Screen name="Savings" component={SavingsStackScreen} />
			<Drawer.Screen name="Video" component={VideoStackScreen} />
			<Drawer.Screen name="Profile" component={ProfileStackScreen} />
		</Drawer.Navigator>
	);
}
