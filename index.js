import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Task1 from './Day1task1';
import Task2 from './Day1Task2';
import Task3 from './Day1Task3';
import Task4 from './Day1Task4';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Task1 Data="yogashree" />
    <Task2 arr={[1,2,3,4,5,6,7,8,9,10]}/>
    <Task3 />
    <Task4 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
