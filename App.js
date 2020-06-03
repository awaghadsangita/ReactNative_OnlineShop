import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';

import productReducer from './store/reducer/product';
import ProductNavigator from './navigation/ShopNavigator';
const App = props=> {
  const rootReducer=combineReducers({
    products:productReducer
  })
  const store=createStore(rootReducer)
  return (
    <Provider store={store}>
      <ProductNavigator/>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
