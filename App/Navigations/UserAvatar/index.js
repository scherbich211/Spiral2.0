import React, { useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Modal, Platform, View, TouchableOpacity } from 'react-native';

import { Avatar, ListItem } from 'react-native-elements';

import avatarImage from '../../Assets/Images/oval.png';

import { logout } from '../../Redux/store/action-creators/actions';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
	userMenuContent: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? 90 : 55,
		right: 10,
		width: 100,
	},
	userMenuOverlay: StyleSheet.absoluteFillObject,
});
function UserAvatar({ navig, able }) {
	const [userMenuVisible, setUserMenuVisible] = useState(false);

	const hideUserMenu = () => {
		setUserMenuVisible(false);
	};
	const showUserMenu = () => {
		if(able === true){
		setUserMenuVisible(true);
		}
	};

	const dispatch = useDispatch();

	const SignOut = () => {
		dispatch(logout());
	};
	const Profile = () => {
		navig();
	};

	return (
		<>
			<Avatar rounded source={avatarImage} onPress={showUserMenu} />
			<Modal visible={userMenuVisible} transparent>
				<TouchableWithoutFeedback onPress={hideUserMenu}>
					<View style={styles.userMenuOverlay} />
				</TouchableWithoutFeedback>
				<ListItem style={styles.userMenuContent}>
					<ListItem.Content>
						<ListItem.Title onPress={Profile}>Profile</ListItem.Title>
						<ListItem.Title onPress={SignOut}>Log out</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</Modal>
		</>
	);
}
export default UserAvatar;
