import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchMode from "./SearchMode";
import ListMode from "./ListMode";

function App() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  return (
    <div className='page'>
      <div className='page-container'>
        <div className='page-header'>
          <h4 className='switch-label'>Search Mode</h4>
          <Form.Switch
            className='switch'
            onChange={() => {
              setIsSearchMode(!isSearchMode);
            }}
            id='custom-switch'
            checked={isSearchMode}
          />
        </div>
        {isSearchMode ? <SearchMode /> : <ListMode />}
      </div>
    </div>
  );
}

export default App;
