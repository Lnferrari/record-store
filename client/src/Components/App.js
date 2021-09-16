import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './LandingPage';
import Shop from './Shop';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile'
import UserOrders from './UserOrders'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/profile/:id' exact component={UserProfile} />
          <Route path='/profile/:id/orders' exact component={UserOrders} />
        </Switch>
        
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
