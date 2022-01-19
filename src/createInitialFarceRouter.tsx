import createFarceRouter from './createFarceRouter';
import createFarceStore from './createFarceStore';
import { InitialFarceRouterOptions, FarceRouter } from './generics';
import getStoreRenderArgs from './getStoreRenderArgs';

export default async function createInitialFarceRouter({
  historyProtocol,
  historyMiddlewares,
  historyOptions,
  routeConfig,
  matchContext,
  resolver,
  ...options
}: InitialFarceRouterOptions): Promise<FarceRouter> {
  const store = createFarceStore({
    historyProtocol,
    historyMiddlewares,
    historyOptions,
    routeConfig,
  });

  const FarceRouter = createFarceRouter({ ...options, store } as any);

  // This intentionally doesn't handle RedirectExceptions, because those
  // shouldn't happen here anyway.
  const initialRenderArgs = await getStoreRenderArgs({
    store,
    matchContext,
    resolver,
  });

  // We own this FarceRouter, so it's safe to replace its default props.
  FarceRouter.defaultProps = {
    ...FarceRouter.defaultProps,
    matchContext,
    resolver,
    initialRenderArgs,
  };

  return FarceRouter;
}
