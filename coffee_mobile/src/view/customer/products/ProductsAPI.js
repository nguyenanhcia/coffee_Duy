import {API} from "../../../api/API";
import {AsyncStorage} from 'react-native'


function* productsApi() {
  const response = yield fetch(API.baseURL + API.path_Products, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': yield AsyncStorage.getItem('token'),
    },
  });
  const resJson = yield response.json();
  return resJson;
}

export default productsApi