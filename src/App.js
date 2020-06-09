import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateMap from './components/routes/CreateMap';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import MyRoutes from './components/routes/MyRoutes';
import MyStats from './components/MyStats';

function App() {
  return (
    <Switch>
      <Route path='/' exact={true} component={LandingPage} />
      <Route path='/create-route' exact={true} component={CreateMap} />
      <Route path='/home' exact={true} component={HomePage} />
      <Route path='/my-routes' exact={true} component={MyRoutes} />
      <Route path='/my-stats' exact={true} component={MyStats} />
    </Switch>
  );
}

export default App;
