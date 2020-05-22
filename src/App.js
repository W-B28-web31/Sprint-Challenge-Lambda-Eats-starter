import React from "react";
import './App.css';

import { Route, Link } from "react-router-dom";
import Home from './components/Home';
import OrderForm from './components/OrderForm';


const App = () => {
  return (
    <>
    <h1>Lambda Eats</h1>
    <div className="nav-links">
      <Link to="/" exact className="home-link">
        Home { }
      </Link>
      <Link to="/pizza" exact className="order-link">
          Order Form
      </Link>

      <Route
        path="/"
        component={Home}
        /> 
      <Route
        exact path="/pizza"
        component={OrderForm}
        />
        <Home /> 
        <OrderForm />
    </div>
    </>
  );
};
export default App;
