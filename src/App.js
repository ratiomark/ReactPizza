// import { useState, useEffect } from "react"

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import { Home } from "./pages/Home";
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import { Skeleton } from "./components/PizzaBlock/Skeleton";
import pizzas from './data/pizzaJSON.json'
import { Routes, Route } from "react-router-dom";
import { Page404 } from './pages/Page404';
import Cart from './pages/Cart';
// import './scss/app.scss';
import './scss/app.scss';
// import './App.css';


function App() {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {/* <Home /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
