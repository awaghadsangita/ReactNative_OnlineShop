import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import productReducer from './store/reducer/product';
import cartReducer from './store/reducer/cart';
import orderReducer from './store/reducer/order';
import ProductNavigator from './navigation/ShopNavigator';

const App = props=> {
  const rootReducer=combineReducers({
    products:productReducer,
    cart:cartReducer,
    orders:orderReducer
  })
  const store=createStore(rootReducer,applyMiddleware(ReduxThunk));
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
