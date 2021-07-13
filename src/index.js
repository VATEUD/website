import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

import './assets/styles/config.scss';

render((
  <BrowserRouter>
      <App/>
  </BrowserRouter>
), document.getElementById('root'));