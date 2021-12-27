import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Profile from './Profile';

import persistStoreFor from '../../Redux/store/store';

let persisted = persistStoreFor();

const ProfileScreen = () => {
	return (
		<PersistGate persistor={persisted.persistor} loading={null}>
			<Profile />
		</PersistGate>
	);
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }: any) : JSX.Element => {
	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#C81A7C',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					alignSelf: 'center',
				},
			}}>
			<ProfileStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: 'Profile',
					headerLeft: () => (
						<Icon.Button
							name="arrow-back-outline"
							size={25}
							backgroundColor="#C81A7C"
							onPress={() => navigation.navigate('Home')}
						/>
					),
					headerRight: () => <View style={{ marginRight: 10 }} />,
				}}
			/>
		</ProfileStack.Navigator>
	);
}

export default ProfileStackScreen;
