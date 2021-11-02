import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectRoute } from './components/protectRoute';
import { UserProvider } from './components/userProvider';
import Leads from './pages/leads';
import NewLead from './pages/newLead';
import Register from './pages/register';
import Header from './components/header';
import Login from './pages/login';

function App() {
  return (
    <UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectRoute path="/leads">
            <Leads />
          </ProtectRoute>
          <ProtectRoute path="/newLead">
            <NewLead />
          </ProtectRoute>
          <Route exact path="/" render={() => <Redirect to="/register" />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </UserProvider>
  );
}

export default App;
