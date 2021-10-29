import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ProtectRoute } from './components/protectRoute';
import { UserProvider } from './components/userProvider';
import Leads from './pages/leads';
import NewLead from './pages/newLead';
import Register from './pages/register';
import 'react-toastify/dist/ReactToastify.css';

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
        {/* <Header /> */}
        <Switch>
          <Route path="/register">
            <Register />
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
