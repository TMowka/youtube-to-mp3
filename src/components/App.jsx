import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import ConverterPage from '../pages/ConverterPage';

const app = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ConverterPage} />

      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default app;
