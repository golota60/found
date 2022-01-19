import React from 'react';
import { shallowEqual, useSelector, useStore } from 'react-redux';

import createBaseRouter, { BaseRouterProps } from './createBaseRouter';
import { ConnectedRouterOptions } from './createRender';
import { BrowserRouter, BrowserRouterOptions } from './generics';

export default function createConnectedRouter({
  getFound = ({ found }: any) => found,
  ...options
}: ConnectedRouterOptions): BrowserRouter {
  const Router = createBaseRouter(options as BaseRouterProps);

  const getFoundState = (state) => {
    const { match, resolvedMatch } = getFound(state);
    return { match, resolvedMatch };
  };

  function ConnectedRouter(props) {
    const store = useStore();
    const foundState = useSelector(getFoundState, shallowEqual);

    return <Router {...props} {...foundState} store={store} />;
  }

  return ConnectedRouter;
}
