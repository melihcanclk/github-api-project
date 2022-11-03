import { useCallback, useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserDetails from "./UserDetails";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route
            exact
            path='/user-details/:username'
            element={<UserDetails />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
