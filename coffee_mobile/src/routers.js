import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import ProductsContainer from "./view/customer/products/ProductsContainer";

export const RootRouter = (initrouteName) =>  createStackNavigator({
  Screen_Flow_Customer: {
    screen: ProductsContainer
  }
}, {
  initialRouteName: initrouteName,
  headerMode: 'none'
});


export default RootRouter;