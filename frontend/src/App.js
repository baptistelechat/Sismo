import React from "react";
import { Provider } from 'react-redux'
import store from './redux/store'
import ThemeContainer from './components/themeContainer'

function App() {

  return (
    <Provider className="App" store={store}>
      <ThemeContainer/>
    </Provider>
  );
}

export default App;
