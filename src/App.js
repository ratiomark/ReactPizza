import React, { useState, useEffect } from "react"

import Header from './components/Header';
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Page404 } from './pages/Page404';
import Cart from './pages/Cart';

import './scss/app.scss';

const SearchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>

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
    </SearchContext.Provider>
  );
}

export default App;
export { SearchContext };