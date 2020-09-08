import React from 'react';
import { Redirect, Route as ReactRouterRoute, RouteProps as ReactRouterRouteProps } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface RouteProps extends ReactRouterRouteProps {
  component: React.ComponentType;
  isPrivate?: boolean;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactRouterRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }} />
        );
      }}
    />
  );
};

export default Route;
