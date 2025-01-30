import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./api/store";
import Browse from "./components/semntics/Browse";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Browse />
        {/* Wrap your app in BrowserRouter */}
        <Toaster />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
