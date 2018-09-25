import {combineReducers} from 'redux';
import productsReducer from "../view/customer/products/ProductReducer";

const rootReducer = combineReducers({
  productsReducer
});

export default rootReducer