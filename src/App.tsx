import React from 'react';
import Store from "./components/Store/Store";
import {StoreContextProvider} from "./context/StoreContext";

function App() {

  return (
      <StoreContextProvider>
        <Store />
      </StoreContextProvider>
  );
}

export default App;
