import { call, all, fork } from 'redux-saga/effects'
import {watchProductsSagas} from '../view/customer/products/ProductsSagas'

export default function* rootSaga() {
  yield all([
    fork(watchProductsSagas),

  ])

}