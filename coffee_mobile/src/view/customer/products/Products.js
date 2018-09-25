import React, { Component } from 'react';
import {
    Alert,
    Animated,
    AppState,
    AsyncStorage,
    Dimensions,
    FlatList,
    Image,
    Platform,
    PushNotificationIOS,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View, Linking, UIManager
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image'
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../constants/colors";
import { font } from "../../../constants/fonts";
import { stringToFormatVND } from "../../../constants/convert";

const {width, height} = Dimensions.get('window');

export default class Products extends Component {
  constructor(props, onRegister) {
    super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            heightIconHome: 35,
            isShow: true,
            animRight: new Animated.Value(-5000),
            animLeft: new Animated.Value(300),
            fadeAnim: new Animated.Value(0),
            isSwap: false,
            isLogin: false,
        };


  }

  async checkLogin() {
    const login = await AsyncStorage.getItem('isLogin')
    this.state.isLogin = JSON.parse(login)
  }


  componentWillMount() {
    this.props.getProduct();
  }

  refresh() {

  }

  convertModel(products) {

    const sales = products.filter(result => {
      return result.on_sale
    })

    let listGroup = [{
      nameGroup: 'Mới nhất',
      listProduct: products
    },
      {
        nameGroup: 'Mua nhiều nhất',
        listProduct: []
      },
      {
        nameGroup: 'Khuyến mãi',
        listProduct: sales
      }]
    return listGroup
  }


  render() {
    const {products} = this.props
    const allProduct = products
    const {isSwap, isLogin} = this.state
    return (
      <View style={styles.viewBackground}>
        <LinearGradient
          colors={[colors.main, colors.boldMain]}
          style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: colors.blackOpacity, alignItems: 'center'}}>
            <View style={{
              // ...ifIphoneX({
              //   paddingTop: 30,
              //   height: 74
              // }, {
                height: Platform.OS === 'ios' ? 64 : 44,
                paddingTop: Platform.OS === 'ios' ? 20 : 0,
              //}),
              /*backgroundColor: colors.main,*/
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <TouchableOpacity
                accessibilityLabel="LogoS"
                testID="LogoS"
                style={{
                  height: this.state.heightIconHome,
                  width: this.state.heightIconHome,
                  overflow: 'hidden',
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: isLogin ? 'none' : 'flex'
                }} onPress={() => {
                this.props.navigation.navigate('Screen_SignIn')
              }}
              >

              </TouchableOpacity>
              <Text
                accessibilityLabel="title"
                testID="title"
                style={{
                  fontSize: 22,
                  color: colors.white,
                  fontFamily: font.title,
                  flex: 1,
                  textAlign: 'center',
                }}>{isSwap ? 'Đơn mua hàng' : 'Sản phẩm'}</Text>

              <TouchableOpacity
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  display: 'none'
                }} onPress={() => {

                Linking.canOpenURL('fb-messenger://').then(supported => {
                  if (supported) {
                    Linking.openURL('fb-messenger://user-thread/' + 'raungonworld');
                  } else {
                    console.log('error');
                  }
                }).catch(err => console.error('An error occurred', err));

              }}>
                <Image
                  source={require('../../../assets/images/messager.png')}
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>

            <View style={{display: isSwap ? 'none' : 'flex'}}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => this.refresh()}
                    tintColor={colors.white}
                  />
                }

                data={
                  allProduct.filter(result => {
                    return result.listProduct.length > 0
                  })
                }
                renderItem={({item}) =>
                  <View style={{
                    marginTop: 10,
                    alignItems: 'flex-start',
                    width
                  }}>
                    <View style={{
                      backgroundColor: colors.white,
                      borderTopRightRadius: 20,
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8
                    }}>
                      <Text style={{
                        fontFamily: font.title,
                        color: colors.main,
                        borderRadius: 5
                      }}>{item.nameGroup}</Text>
                    </View>

                    <View style={{height: 150, padding: 5}}>
                      <FlatList
                        horizontal={true}
                        data={item.listProduct}
                        renderItem={({item}) => <TouchableOpacity style={{
                          marginLeft: 5,
                          width: 100,
                          height: 140,
                          borderRadius: 5,
                          borderColor: colors.white,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 5, /*
                  backgroundColor:colors.white*/
                        }} onPress={() => {
                          this.props.navigation.navigate('Screen_DetailProduct', {
                            code: item.id
                          })
                        }}>
                          <FastImage
                            source={{
                              uri: baseURL + item.images[0].url,
                              priority: FastImage.priority.normal
                            }}
                            style={{width: 60, height: 60}}
                            resizeMode={FastImage.resizeMode.contain}/>
                          <Text style={{
                            fontSize: 12,
                            color: colors.white,
                            fontFamily: font.main, textAlign: 'center', marginTop: 5
                          }}>{item.name}</Text>

                          <Text style={{
                            fontSize: 14, marginTop: 5,
                            color: colors.white,
                            fontFamily: font.main,
                            display: true ? 'flex' : 'none'
                          }}>{stringToFormatVND(item.price.toString())} VNĐ</Text>
                        </TouchableOpacity>}
                        keyExtractor={(item, index) => index.toString()}/>
                    </View>
                  </View>}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>


                        <View style={{
                            position: 'absolute',
                            bottom: 40,
                            left: 20,
                            flexDirection: 'row', backgroundColor: 'transparent',
                            display: 'flex',
                            overflow: 'hidden'
                        }}>
                            <TouchableOpacity
                                style={{
                                    height: 50,
                                    width: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 10,

                                }} onPress={() => {

                Linking.canOpenURL('fb-messenger://').then(supported => {
                  if (supported) {
                    Linking.openURL('fb-messenger://user-thread/' + 'raungonworld');
                  } else {
                    console.log('error');
                  }
                }).catch(err => console.error('An error occurred', err));

              }}>
                <Image
                  source={require('../../../assets/images/messager.png')}
                  style={{height: 50, width: 50}}
                />
              </TouchableOpacity>
            </View>

            <View style={{
              position: 'absolute',
              bottom: 40,
              right: 20,
              flexDirection: 'row', backgroundColor: 'transparent'
            }}>
              <TouchableOpacity
                accessibilityLabel="cart"
                testID="cart"
                style={styles.buttonCircle} onPress={() => {
                this.props.navigation.navigate('Screen_Order')
              }}>
                <Icon name="cart-plus" size={30} style={{
                  color: colors.main, marginBottom: 5
                }}/>
              </TouchableOpacity>
            </View>

            <View style={{
              width: 25,
              height: 25,
              borderRadius: 12.5,
              borderColor: colors.white,
              borderWidth: 0.5,
              backgroundColor: colors.main,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 75,
              right: 15, position: 'absolute', zIndex: 5
            }}>
              <Text
                style={{
                  fontFamily: font.title,
                  fontSize: 17,
                  color: colors.white,
                  textAlign: 'center',
                }}>{12}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  viewBackground: {
    flex: 1,
    /*backgroundColor: colors.mainOpacity,*/
  },
  button: {
    height: 40,
    width: '80%',
    backgroundColor: colors.button1,
    borderRadius: 5,
    shadowOffset: {width: 1, height: 2},
    shadowColor: colors.black,
    elevation: 1,
    shadowOpacity: 0.8,
  },
  buttonCircle: {
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    borderRadius: 30,
    shadowOffset: {width: 1, height: 2},
    shadowColor: colors.white,
    elevation: 1,
    shadowOpacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});