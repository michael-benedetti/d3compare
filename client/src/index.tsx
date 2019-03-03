import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HttpAuthRepository} from "./HttpAuthRepository";
import {HttpD3Repository} from "./HttpD3Repository";

ReactDOM.render(
    <App
      authRepository={new HttpAuthRepository()}
      d3Repository={new HttpD3Repository()}
    />,
    document.getElementById('root')
);
