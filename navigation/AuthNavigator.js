import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../common/TabBarIcon';
import LoginForm from "../screens/LoginForm";
import RegisterScreen from "../screens/RegisterScreen";


const LoginStack = createStackNavigator({
  Login: LoginForm,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Log In',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const RegisterStack = createStackNavigator({
  Register: RegisterScreen,
});

RegisterStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  LoginStack,
  RegisterStack,
});
