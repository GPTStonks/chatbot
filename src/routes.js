import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ApikeyList from './components/ApikeyList';
import LLMSelector from './components/LLMSelector';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/apiKeyList" component={ApikeyList} />
      <Route exact path="/llmSelector" component={LLMSelector} />
    </Switch>
  );
};

export default Routes;
