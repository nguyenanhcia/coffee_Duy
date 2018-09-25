import {ActionTypes} from "../../../constants/ActionTypes";
import { put, takeLatest } from 'redux-saga/effects'
import {CallAPI} from "../../../api/CallAPI";

function* productsSagas() {
    try {
        const result = yield CallAPI.productsApi();

        if (result.status === 200) {
            yield put({type: ActionTypes.PRODUCT_SUCCESSED, products: result.product})
        } else {
            yield put({type: ActionTypes.PRODUCT_FAILED, products: result.errorMessage})
        }
    } catch (e) {
        yield put({type: ActionTypes.SERVER_NOT_REPLY, products: []})
    }
}


export function* watchProductsSagas() {
    yield takeLatest(ActionTypes.PRODUCT_REQUEST, productsSagas)
}