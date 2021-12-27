import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './App/Redux/Navigator';
import { PersistGate } from 'redux-persist/lib/integration/react';

import persistStoreFor from './App/Redux/store/store';

let persisted = persistStoreFor();

const App = (): JSX.Element => {
	return (
		<Provider store={persisted.store}>
			<PersistGate persistor={persisted.persistor} loading={null}>
				<Navigator />
			</PersistGate>
		</Provider>
	);
}

export default App;
