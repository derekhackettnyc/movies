import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import Person2 from '../Person2/Person'
import NotFound from '../elements/NotFound/NotFound';

console.clear()

const App = () => (
  <BrowserRouter basename='/react-movie/'>
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/" component={Person2} exact /> */}
        <Route path="/:movieId" component={Movie} exact />
        <Route path="/person/:actorId" component={Person2} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;