import { RenderArgs } from './createRender';
import createStoreRouterObject from './createStoreRouterObject';
import { GetStoreRenderArgsOptions } from './generics';
import getRenderArgs from './getRenderArgs';

// This function returns a promise. It doesn't need to be an async function
// because it doesn't use the promise's value.
export default function getStoreRenderArgs({
  store,
  getFound = ({ found }: any) => found,
  matchContext,
  resolver,
}: GetStoreRenderArgsOptions): Promise<RenderArgs> {
  const router = createStoreRouterObject(store);
  const match = getFound(store.getState()).resolvedMatch;

  return getRenderArgs(router, { match, matchContext, resolver });
}
