import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ProtectRoute } from './components/protectRoute';
import { UserProvider } from './components/userProvider';
import Leads from './pages/leads';
import NewLead from './pages/newLead';
import Register from './pages/register';

function App() {
  return (
    <UserProvider>
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
