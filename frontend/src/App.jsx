import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserEditScreen from './screens/UserEditScreen';
import { Container } from 'react-bootstrap';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'WE612MF7J3',
  '8c1f9168e73141b96d3b855dc9765ef7'
);

const App = () => {
  return (
    <Router>
      <InstantSearch searchClient={searchClient} indexName="Macellaio">
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productlist"
              exact
              component={ProductListScreen}
            />
            <Route
              path="/admin/productlist/:pageNumber"
              exact
              component={ProductListScreen}
            />
            <Route path="/search/:keyword" exact component={HomeScreen} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              exact
              component={HomeScreen}
            />

            <Route path="/page/:pageNumber" exact component={HomeScreen} />
            <Route path="/" exact component={HomeScreen}>
              <Redirect to="/page/1" />
            </Route>
          </Container>
        </main>
        <Footer />
      </InstantSearch>
    </Router>
  );
};

export default App;
