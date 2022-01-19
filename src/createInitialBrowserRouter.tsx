import BrowserProtocol from 'farce/BrowserProtocol';

import createInitialFarceRouter from './createInitialFarceRouter';
import { BrowserRouter, InitialBrowserRouterOptions } from './generics';
import resolver from './resolver';

export default function createInitialBrowserRouter(
  options: InitialBrowserRouterOptions,
): Promise<BrowserRouter> {
  return createInitialFarceRouter({
    ...options,
    historyProtocol: new BrowserProtocol(),
    resolver,
  } as any) as any;
}
