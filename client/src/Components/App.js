import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './LandingPage';
import Shop from './Shop';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/shop' exact component={Shop} />
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
