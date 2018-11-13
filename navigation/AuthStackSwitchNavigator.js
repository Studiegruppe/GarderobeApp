import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import AuthStack from "./AuthNavigator";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthStack: AuthStack
});