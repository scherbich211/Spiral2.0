import React, { useState } from 'react';
import {
	Image,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Alert,
	Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import { saveProfile } from '../../Redux/store/action-creators/actions';
import { useDispatch, useSelector } from 'react-redux';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission, requestExternalWritePermission } from './componentsForProfile';
import { Permission, PERMISSION_TYPE } from './src/AppPermission';
import { RootState } from '../../Redux/store/reducers/rootReducer';
export * from './style'; //  exports the 'ParseIntBasedZipCodeValidator' class

interface Data {
	name?: string | undefined;
	DoB?: string | undefined;
	edit?: boolean;
	check_nameInputChange?: boolean;
	check_birthInputChange?: boolean;
	isValidUser?: boolean;
	isValidBirth?: boolean;
	filePath?: string | undefined;
}

const Profile: React.FunctionComponent = (props): JSX.Element => {
	//----------everything with input and text-------------------------------------------------------
	const name: string | undefined = useSelector((state: RootState) => state.profile.name);
	const birth: string | undefined = useSelector((state: RootState) => state.profile.birth);
	const file: string | undefined = useSelector((state: RootState) => state.profile.file);

	const [data, setData] = useState<Data>({
		name: '',
		DoB: '',
		edit: false,
		check_nameInputChange: false,
		check_birthInputChange: false,
		isValidUser: true,
		isValidBirth: true,
		filePath: '',
	});

	const dispatch: React.Dispatch<any> = useDispatch();

	const EditProfile = (): void => {
		if (data.edit === false) {
			setData({
				edit: true,
				check_nameInputChange: false,
				check_birthInputChange: false,
			});
		} else if (data.edit === true) {
			setData({
				edit: false,
			});
		}
	};

	const SuccessEdit = (name: string | undefined, birth: string | undefined, file: string | undefined): void => {
		if (data.check_birthInputChange == false || data.check_nameInputChange == false) {
			Alert.alert('Wrong Input!', 'Look at errors', [{ text: 'Okay' }]);
			return;
		}
		if (data.edit === false) {
			setData({
				...data,
				edit: true,
				check_nameInputChange: false,
				check_birthInputChange: false,
			});
		} else {
			setData({
				...data,
				edit: false,
			});
			const info = { name, birth, file };
			dispatch(saveProfile(info));
		}
	};

	const nameInputChange = (val: string): any => {
		if (val.length >= 4) {
			setData({
				...data,
				name: val,
				check_nameInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				name: val,
				check_nameInputChange: false,
				isValidUser: false,
			});
		}
	};
	const handleBirthChange = (val: string): void => {
		if (val.length >= 4) {
			setData({
				...data,
				DoB: val,
				isValidBirth: true,
				check_birthInputChange: true,
			});
		} else {
			setData({
				...data,
				DoB: val,
				isValidBirth: false,
				check_birthInputChange: false,
			});
		}
	};

	const handleValidUser = (val: string): any => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				isValidUser: false,
			});
		}
	};
	//------------------------------------------------------------------------------------------------

	//------------files-------------------------------------------------------------------------------

	//-------------takePhoto------------------------------------------------------------
	const captureImage = async (type: string): Promise<void> => {
		type optionsCamera = Pick<CameraOptions, Exclude<keyof CameraOptions, 'mediaType'>> & { mediaType: any };
		let options: optionsCamera = {
			mediaType: type,
			maxWidth: 300,
			maxHeight: 550,
			quality: 1,
			videoQuality: 'low',
			durationLimit: 30, //Video max duration in seconds
			saveToPhotos: true,
		};
		if (Platform.OS === 'android') {
			console.log('android');
			let isCameraPermitted: boolean = await requestCameraPermission();
			let isStoragePermitted: boolean = await requestExternalWritePermission();
			if (isCameraPermitted && isStoragePermitted) {
				launchCamera(options, (response) => {
					console.log('Response = ', response);
					if (response.didCancel) {
						console.warn('User cancelled camera picker');
						return;
					} else if (response.errorCode == 'camera_unavailable') {
						console.warn('Camera not available on device');
						return;
					} else if (response.errorCode == 'permission') {
						console.warn('Permission not satisfied');
						return;
					} else if (response.errorCode == 'others') {
						console.warn(response.errorMessage);
						return;
					}
					setData({
						...data,
						filePath: response.assets?.find((i) => i.uri)?.uri,
					});
				});
			}
		} else {
			const componentDidMount = (): void => {
				Permission.checkPermission(PERMISSION_TYPE.camera);
			};
			// let isCameraPermitted = requestCameraPermissionIos();
			let isCameraPermitted: void = componentDidMount();
			let isStoragePermitted: boolean = await requestExternalWritePermission();
			if (isCameraPermitted != null && isStoragePermitted != null) {
				launchCamera(options, (response): void => {
					console.log('Response = ', response);
					if (response.didCancel) {
						console.warn('User cancelled camera picker');
						return;
					} else if (response.errorCode == 'camera_unavailable') {
						console.warn('Camera not available on device');
						return;
					} else if (response.errorCode == 'permission') {
						console.warn('Permission not satisfied');
						return;
					} else if (response.errorCode == 'others') {
						console.warn(response.errorMessage);
						return;
					}
					setData({
						...data,
						filePath: response.assets?.find((i) => i.uri)?.uri,
					});
				});
			}
		}
	};
	//-------------------------------------------------------------------------

	//-------------chooseFile------------------------------------------------------------
	const chooseFile = (type: any) => {
		let options: ImageLibraryOptions = {
			mediaType: type,
			maxWidth: 300,
			maxHeight: 550,
			quality: 1,
		};
		launchImageLibrary(options, (response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.warn('User cancelled camera picker');
				return;
			} else if (response.errorCode == 'camera_unavailable') {
				console.warn('Camera not available on device');
				return;
			} else if (response.errorCode == 'permission') {
				console.warn('Permission not satisfied');
				return;
			} else if (response.errorCode == 'others') {
				console.warn(response.errorMessage);
				return;
			}
			let uri: string | undefined = response.assets?.find((i) => i.uri)?.uri;
			console.log(uri);
			setData({
				...data,
				filePath: uri,
			});
			console.log('uri not ready', response.assets?.find((i) => i.uri)?.uri);
		});
	};
	//--------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------

	return (
		<ScrollView style={styles.container}>
			{data.edit === false ? (
				//-----------NORMAL-STYLE--------------------------------------------------------------------
				<View style={styles.containerPart}>
					<View>
						<Image source={{ uri: file }} style={styles.Image} />
					</View>
					<View>
						<Text style={styles.greyText}>Full Name</Text>
						<Text style={styles.nameDOB}>{name}</Text>
					</View>
					<View>
						<Text style={styles.greyText}>Date of Birth</Text>
						<Text style={styles.nameDOB}>{birth}</Text>
					</View>
					<View style={styles.ButtonCont}>
						<TouchableOpacity style={styles.editButton} onPress={() => EditProfile()}>
							<Text style={styles.editButtonText}>Edit Profile</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				//-----------EDIT-STYLE--------------------------------------------------------------------
				<View style={styles.containerPart}>
					<View style={styles.containerPart}>
						<Image source={{ uri: data.filePath }} style={styles.Image} />
						<View style={styles.viewCameraFile}>
							<TouchableOpacity onPress={() => captureImage('photo')}>
								<Image source={require('../../Assets/Images/camera.png')} style={styles.cameraIcon} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => chooseFile('photo')}>
								<Image source={require('../../Assets/Images/file.png')} style={styles.fileIcon} />
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<Text style={styles.greyText}>Full Name</Text>
						<View style={styles.textInput}>
							<TextInput
								placeholder="Your full name"
								autoCapitalize="none"
								onChangeText={(val) => nameInputChange(val)}
								onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
							/>
							{data.check_nameInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>
						{data.isValidUser ? null : (
							<Animatable.View animation="fadeInLeft" duration={500}>
								<Text style={styles.errorMess}>Username must be 4 characters long</Text>
							</Animatable.View>
						)}
					</View>
					<View>
						<Text style={styles.greyText}>Date of Birth</Text>
						<View style={styles.textInput}>
							<TextInput
								placeholder="Input Date of Birth"
								autoCapitalize="none"
								onChangeText={(val) => handleBirthChange(val)}
							/>
							{data.check_birthInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>
						{data.isValidBirth ? null : (
							<Animatable.View animation="fadeInLeft" duration={500}>
								<Text style={styles.errorMess}>Password must be 5 characters long</Text>
							</Animatable.View>
						)}
					</View>
					<View style={styles.viewCancelEdit}>
						<TouchableOpacity style={styles.applyCancelButton} onPress={() => EditProfile()}>
							<Text style={styles.editButtonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.applyCancelButton}
							onPress={() => SuccessEdit(data.name, data.DoB, data.filePath)}>
							<Text style={styles.editButtonText}>Edit Profile</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default Profile;
