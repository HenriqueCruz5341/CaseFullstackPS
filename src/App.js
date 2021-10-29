import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Leads from './pages/leads';
import NewLead from './pages/newLead';
import Register from './pages/register';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        {/* <Header /> */}
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
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
