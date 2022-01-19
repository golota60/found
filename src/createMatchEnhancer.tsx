import FarceActionTypes from 'farce/ActionTypes';
import { applyMiddleware } from 'redux';

import ActionTypes from './ActionTypes';
import Matcher from './Matcher';

function createMatchMiddleware(matcher) {
  return function matchMiddleware() {
    return (next) => (action) => {
      const { type, payload } = action;
      if (type !== FarceActionTypes.UPDATE_LOCATION) {
        return next(action);
      }

      return next({
        type: ActionTypes.UPDATE_MATCH,
        payload: {
          location: payload,
          ...matcher.match(payload),
        },
      });
    };
  };
}

export default function createMatchEnhancer(
  matcher: Matcher,
  getFound = ({ found }) => found,
) {
  return function matchEnhancer(createStore) {
    return (...args) => {
      const middlewareEnhancer = applyMiddleware(
        createMatchMiddleware(matcher),
      );

      const store = middlewareEnhancer(createStore)(args as any);

      function replaceRouteConfig(routeConfig) {
        matcher.replaceRouteConfig(routeConfig);

        store.dispatch({
          type: FarceActionTypes.UPDATE_LOCATION,
          payload: getFound(store.getState()).match.location,
        });
      }

      return {
        ...store,
        found: { matcher, replaceRouteConfig },
      };
    };
  };
}
