import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Leads from './pages/leads';
import NewLead from './pages/newLead';
import Register from './pages/register';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/leads">Leads</Link>
              </li>
              <li>
                <Link to="/newLead">NewLead</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/leads">
              <Leads />
            </Route>
            <Route path="/newLead">
              <NewLead />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/register" />} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
