import React from 'react';
import PropTypes from 'prop-types'; 
import { BrowserRouter as Router, 
  Route, 
  Link 
} from 'react-router-dom';
import { Provider } from 'react-redux';
import NoteForm from './NoteForm';
import Navi from './Navi';
import NoteDisplay from './NoteDisplay';
import './Root.css';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <Navi />
        <ul className="route-links">
          <li>
            <Link to="/noteforms" exact="true">Add Note</Link>
          </li>
          <li>
            <Link to="/notes" exact="true">View Notes</Link>
          </li>
        </ul>

        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

const routes = [
  {
    path: '/notes',
    component: NoteDisplay,
  },
  {
    path: '/noteforms',
    component: NoteForm,
  },
  {
    path: '/home',
    component: Navi,
  },
];

export default Root;