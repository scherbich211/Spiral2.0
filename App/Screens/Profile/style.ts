import { StyleSheet, Platform, ViewStyle, TextStyle} from 'react-native';

interface StyleGovno {
	container?: {
		flex?: number;
	};
	Image?: {
		width?: number;
		height?: number;
		borderRadius?: number;
		marginTop?: number;
		marginBottom?: number;
	};
	ButtonCont?: {
		marginTop?: number;
	};
	editButton?: ViewStyle,
	editButtonText?: TextStyle,
	textInput?: ViewStyle,
	errorMess?: {
		color?: string;
	};
	applyCancelButton?: ViewStyle,
	containerPart?: ViewStyle,
	greyText?: TextStyle,
	nameDOB?:TextStyle,
	viewCameraFile?: ViewStyle,
	cameraIcon?: {
		width?: number;
		height?: number;
		borderRadius?: number;
		tintColor?: string;
		backgroundColor?: string;
	};
	fileIcon?: {
		width?: number;
		height?: number;
		borderRadius?: number;
		tintColor?: string;
		backgroundColor?: string;
	};
	viewCancelEdit?: ViewStyle,
}

const styles: StyleGovno = StyleSheet.create({
	container: {
		flex: 1,
	},
	Image: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginTop: 15,
		marginBottom: 20,
	},
	ButtonCont: {
		marginTop: 300,
	},
	editButton: {
		width: 300,
		height: 55,
		alignSelf: 'center',
		borderColor: '#CB1961',
		borderRadius: 50,
		backgroundColor: '#CB1961',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
	},
	editButtonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 18,
		marginLeft: 5,
	},
	textInput: {
		flexDirection: 'row',
		width: 300,
		borderBottomColor: 'grey',
		borderBottomWidth: 2,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? 20 : 0,
		paddingBottom: Platform.OS === 'ios' ? 15 : 0,
		marginBottom: Platform.OS === 'ios' ? 15 : 0,
	},
	errorMess: {
		color: '#C81A7C',
	},
	applyCancelButton: {
		width: 150,
		height: 55,
		alignSelf: 'center',
		borderColor: '#CB1961',
		borderRadius: 50,
		backgroundColor: '#CB1961',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		marginTop: 200,
	},
	containerPart: {
		alignItems: 'center',
	},
	greyText: {
		color: 'grey',
		alignSelf: 'center',
		marginTop: 20,
		marginBottom: 5,
	},
	nameDOB: {
		fontWeight: '500',
		fontSize: 16,
		alignSelf: 'center',
	},
	viewCameraFile: {
		flexDirection: 'row',
		position: 'absolute',
		justifyContent: 'space-between',
		alignItems: 'center',
		top: 115,
		width: 150,
	},
	cameraIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		tintColor: 'white',
		backgroundColor: 'black',
	},
	fileIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		tintColor: 'white',
		backgroundColor: 'black',
	},
	viewCancelEdit: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '85%',
	},
});

export default styles;
