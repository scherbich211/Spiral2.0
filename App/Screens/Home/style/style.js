import { StyleSheet, Platform, Dimensions } from 'react-native';
const styles = StyleSheet.create({
	tapBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tapBarElements: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Platform.OS === 'ios' ? 10 : 20,
	},
	topBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},
	topBarImage: {
		height: Platform.OS === 'ios' ? '49%' : '50%',
		width: Platform.OS === 'ios' ? '24%' : '11%',
		tintColor: '#fff',
	},
	topBarText: {
		marginLeft: 5,
		color: '#fff',
		fontSize: 18,
		lineHeight: 18,
	},
	screenView: {
		flex: 1,
		flexGrow:1,
		backgroundColor: '#E8E8ED',
	},
	container: {
		margin: 10,
	},
	date: {
		paddingBottom: 10,
	},
	partsContainer: {
		backgroundColor: '#fff',
		borderRadius: 5,
		marginBottom: 20,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingVertical: 10,
		paddingLeft: 10,
		borderBottomColor: '#E8E8ED',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	totalAvailableCash: {
		alignSelf: 'center',
		color: 'grey',
		marginTop: 3,
		fontSize: 12,
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		alignSelf: 'center',
	},
	subtitle: {
		color: 'white',
		fontSize: 10,
	},
	littleGreyText: {
		color: 'grey',
	},
	greyUnderAccountsCash: {
		alignSelf: 'center',
		color: 'grey',
		marginTop: 3,
		fontSize: 12,
	},
	blurView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	listMoney: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1,
	},
	headerPartsContainer: {
		margin: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textHeaderPartsContainer: {
		marginLeft: 15,
	},
	impactHeaderPartsContainer: {
		fontSize: 16,
		fontWeight: '300',
	},
	littleContainerHeaderPartsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	greyTextHeaderPartsContainer: {
		color: 'grey',
		fontWeight: '300',
	},
	dot: {
		borderColor: '#C81A7C',
		borderWidth: 2,
		borderRadius: 5,
		marginHorizontal: 3,
	},
	ImageOrVideoPartsContainer: {},
	impactTextPartsContainer: {
		margin: 15,
	},
	buttonToSharePartsContainer: {},
	shareButton: {
		width: 300,
		height: 55,
		alignSelf: 'center',
		borderColor: '#CB1961',
		borderRadius: 50,
		backgroundColor: '#CB1961',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 15,
	},
	shareButtonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 14,
		marginLeft: 5,
	},
	backgroundVideo: {
		position: 'relative',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	videoAndroid: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height * 0.4,
	},
	viewVideoAndroid: {
		backgroundColor: 'black',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	videoNormal: {
		width: '100%',
		height: 208,
		position: 'relative',
	},
	buttonMusic: {
		width: 50,
		position: 'absolute',
		right: 0,
		top: Platform.OS === 'ios' ? -50 : -55,
	},
});

export default styles;
