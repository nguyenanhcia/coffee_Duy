import {modelProducts} from "./Model";
import {ActionTypes} from "../../../constants/ActionTypes";

const productsReducer = (products = modelProducts, action) => {
    switch (action.type) {
        case ActionTypes.PRODUCT_SUCCESSED:
            //return action.products
            return modelProducts
        case ActionTypes.PRODUCT_FAILED:
            return modelProducts
        case ActionTypes.SERVER_NOT_REPLY:
            return modelProducts
        default:
            return modelProducts;
    }

};

export default productsReducer;