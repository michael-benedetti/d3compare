import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HttpD3Repository} from "./HttpD3Repository";

ReactDOM.render(
    <App
      d3Repository={new HttpD3Repository()}
    />,
    document.getElementById('root')
);
