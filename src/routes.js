import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ApikeyList from './components/ApikeyList';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/apiKeyList" component={ApikeyList} />
    </Switch>
  );
};

export default Routes;
