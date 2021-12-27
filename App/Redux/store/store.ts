import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['auth', 'profile'],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export default persistStoreFor = () => {
	let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
	let persistor = persistStore(store);
	return { store, persistor };
};
