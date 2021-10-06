import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './LandingPage';
import Shop from './Shop';
import Login from './Login';
import Signup from './Signup';
import UserProfile from './UserProfile'
import UserOrders from './UserOrders'
import Cart from './Cart';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import VerifyEmail from './VerifyEmail';

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/shop' exact component={Shop} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route exact path='/profile/verify-email/:token' component={VerifyEmail} />
          <PrivateRoute path={`/profile/:id`} exact component={UserProfile} />
          <PrivateRoute path={`/profile/:id/cart`} exact component={Cart} />
          <PrivateRoute path={`/profile/:id/orders`} exact component={UserOrders} />
        </Switch>
        
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
