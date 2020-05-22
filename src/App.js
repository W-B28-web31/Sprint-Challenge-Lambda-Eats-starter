import React from "react";
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
          exact path="/"
          component={Home}
          /> 
        <Route
           path="/pizza"
          component={OrderForm}
          />
      
    </div>
    </>
  );
};
export default App;
