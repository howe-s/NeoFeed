import React from 'react';
import { createRoot } from 'react-dom/client';
import './static/index.css';
import App from './app.js';
import { DataProvider } from './components/DataContext';
import reportWebVitals from './utils/reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <DataProvider>      
    <App />
  </DataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
