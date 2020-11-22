// import './App.css';
import Cities from './components/cities'
import React from "react";
import SearchAppBar from './components/searchAppBar'

function App() {
  
  const [searchValue, setSearchValue] = React.useState([]);

  return (
    <div className="App">
      <SearchAppBar data={setSearchValue}/>
      <h1>Sismo</h1>
      <Cities data={searchValue}/>
    </div>
  );
}

export default App;
