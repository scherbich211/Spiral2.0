import React, { Component } from 'react';

import { Provider } from 'react-redux';
// import {store} from './App/Redux/store/store';

import Navigator from './App/Redux/Navigator';
import { PersistGate } from 'redux-persist/lib/integration/react';

import persistStoreFor from './App/Redux/store/store';

let persisted = persistStoreFor();

function App() {
	return (
		<Provider store={persisted.store}>
			<PersistGate persistor={persisted.persistor} loading={null}>
				<Navigator />
			</PersistGate>
		</Provider>
	);
}

export default App;

// export default class App extends Component {
// 	componentDidMount() {
// 		Permission.checkPermission(PERMISSION_TYPE.camera);
// 	}
// 	render() {
// 		return (
// 			<View>
// 				<Text> react permission</Text>
// 			</View>
// 		);
// 	}
// }
