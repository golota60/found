import BrowserProtocol from 'farce/BrowserProtocol';
import React from 'react';

import createFarceRouter from './createFarceRouter';
import resolver from './resolver';
import { BrowserRouter, BrowserRouterProps } from './generics';

export default function createBrowserRouter(options): BrowserRouter {
  const FarceRouter = createFarceRouter({
    ...options,
    historyProtocol: new BrowserProtocol(),
  });

  function BrowserRouter(props) {
    return <FarceRouter resolver={resolver} {...props} />;
  }

  return BrowserRouter;
}
