import { Redirect, Route } from 'react-router';

export const ProtectRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('user') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/register',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
