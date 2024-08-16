import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app_router";

import './index.css';
import './app_fonts.css';

// [웹 시작 가장 처음 실행되는 코드]
const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();