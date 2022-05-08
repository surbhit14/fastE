import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';

ReactDOM.render(
  <MoralisProvider appId="CXApJLGTV7lHGPAKfOFw8Fwkgoot0zbCUGhyIzej" serverUrl="https://hdkj5mxbbovp.usemoralis.com:2053/server">
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </MoralisProvider>,
  document.getElementById("root")
);
