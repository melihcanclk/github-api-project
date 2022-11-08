import { useState } from "react";
import React from "react";
import Switch from "react-switch";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchMode from "./SearchMode";
import ListMode from "./ListMode";

function App() {
  const [isSearchMode, setIsSearchMode] = useState(false);

  return (
    <div className='page'>
      <div className='page-container'>
        <div className='page-header'>
          <h4 className='switch-label'>
            {isSearchMode ? "Search Mode" : "List Mode"}
          </h4>
          <Switch
            checked={isSearchMode}
            onChange={(e) => setIsSearchMode(!isSearchMode)}
          />
        </div>
        {isSearchMode ? <SearchMode /> : <ListMode />}
      </div>
    </div>
  );
}

export default App;
