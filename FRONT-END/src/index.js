import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthIndex } from "./context";
import { ProSidebarProvider } from 'react-pro-sidebar';
import ptBr from "antd/lib/locale/pt_BR";
import {ConfigProvider} from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthIndex>
        <ProSidebarProvider>
        <ConfigProvider locale={ptBr}>
        <App />
        </ConfigProvider>
        </ProSidebarProvider>
      </AuthIndex>
    </BrowserRouter>
  </React.StrictMode>
);
