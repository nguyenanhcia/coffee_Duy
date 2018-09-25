import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware } from 'redux'
import createSageMiddleware from 'redux-saga'
import rootReducer from "../reducer/index";
import rootSaga from "../sagas/index";

const persistConfig = {
  key: 'root',
  storage,
}

const sagaMiddleware = createSageMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga())
  return {store, persistor}
}