---
sidebar_position: 3
---

# Route configuration

A route object under the default matching algorithm and route element resolver consists of the following properties, all of which are optional:

- `path: string`: a string defining the pattern for the route

- `Component` or `getComponent` - the component for the route, or a method that returns the component for the route
```ts
  Component: React.ComponentType<any>;
  getComponent: (match: RouteMatch) => React.ComponentType<any> | Promise<React.ComponentType<any>>;
```
- `data` or `getData`: additional data for the route, or a method that returns additional data for the route
```ts
  data: any;
  getData: (match: RouteMatch) => any;
```
- `defer: boolean`: whether to wait for all parent `data` or `getData` promises to resolve before getting data for this route and its descendants
- `render: (args: RouteRenderArgs): ResolvedElement | undefined`: a method that returns the element for the route
- `children`: an array of child route objects, or an object of those arrays; if using JSX configuration components, this comes from the JSX children

A route configuration consists of an array of route objects. 

:::tip
You can generate such an array of route objects from JSX with `<Route>` elements using `makeRouteConfig`, as shown previously in basic-usage section(todo link)

:::

#### `path`

Specify a `path` pattern to control the paths for which a route is active. These patterns are handled using [Path-to-RegExp](https://github.com/pillarjs/path-to-regexp) and follow the rules there. Both named and unnamed parameters will be captured in `params` and `routeParams` as below. The following are common patterns:

- `/path/subpath`
  - Matches `/path/subpath`
- `/path/:param`
  - Matches `/path/foo` with `params` of `{ param: 'foo' }`
- `/path/:regexParam(\\d+)`
  - Matches `/path/123` with `params` of `{ regexParam: '123' }`
  - Does not match `/path/foo`
- `/path/:optionalParam?`
  - Matches `/path/foo` with `params` of `{ optionalParam: 'foo' }`
  - Matches `/path` with `params` of `{ optionalParam: undefined }`
- `/path/*`
  - Matches `/path/foo/bar`

Routes are matched based on their `path` properties in a depth-first manner, where `path` on the route must match the prefix of the remaining current path. Routing continues through any routes that do not have `path` set. To configure a default or "index" route, use a route with no `path`.

#### `Component` or `getComponent`

Define the component for a route using either a `Component` field or a `getComponent` method. `Component` should be a component class or function. `getComponent` should be a function that returns a component class or function, or a promise that resolves to either of those. Routes that specify neither will still match if applicable, but will not have a component associated with them.

Given the following route configuration:

```tsx
const routes = makeRouteConfig(
  <Route path="/" Component={AppPage}>
    <Route Component={MainPage}>
      <Route Component={MainSection} />
      <Route path="other" Component={OtherSection} />
    </Route>
    <Route path="widgets">
      <Route Component={WidgetsPage} />
      <Route path=":widgetId" Component={WidgetPage} />
    </Route>
  </Route>,
);
```

The router will have routes as follows:

- `/`, rendering:

```tsx
<AppPage>
  <MainPage>
    <MainSection />
  </MainPage>
</AppPage>
```

- `/other`, rendering:

```tsx
<AppPage>
  <MainPage>
    <OtherSection />
  </MainPage>
</AppPage>
```

- `/widgets`, rendering:

```tsx
<AppPage>
  <WidgetsPage />
</AppPage>
```

- `/widgets/${widgetId}` (e.g. `/widgets/foo`), rendering:

```tsx
<AppPage>
  <WidgetPage />
</AppPage>
```

By default, route components receive the following additional props describing the current routing state:

- `match`: an object with router state properties, conforming to the `matchShape` prop type validator
  - `location`: the current [location object](https://github.com/4Catalyzer/farce#locations-and-location-descriptors)
  - `params`: the union of path parameters for all matched routes
  - `routes`: an array of all matched route objects
  - `route`: the route object corresponding to this component
  - `routeParams`: the path parameters for `route`
- `router`: an object with static router properties, conforming to the `routerShape` prop type validator
  - `push(location: LocationDescriptor)`: navigates to a new location
  - `replace(location: LocationDescriptor)`: replaces the existing history entry
  - `go(delta)`: moves `delta` steps in the history stack
  - `isActive(match: Match, location: LocationDescriptor, { exact: boolean })`: for `match` as above, returns whether `match` corresponds to `location` or a subpath of `location`; if `exact` is set, returns whether `match` corresponds exactly to `location`
  - `matcher`: an object implementing the matching algorithm
    - `format(pattern: string, params: Params)`: returns the path string for a pattern of the same format as a route `path` and a object of the corresponding path parameters
  - `addNavigationListener(listener: (location: LocationDescriptor) => any, { beforeUnload: boolean })`: adds a [navigation listener](https://github.com/4Catalyzer/farce#navigation-listeners) that can [block navigation](#blocking-navigation)

The `getComponent` method receives an object containing the same properties as the `match` object above, with an additional `router` property as above.

#### `data` or `getData`

Specify the `data` property or `getData` method to inject data into a route component as the `data` prop. `data` can be any value. `getData` can be any value, or a promise that resolves to any value. `getData` receives an object containing the routing state, as described above for `getComponent`.

The `getData` method is intended for loading additional data from your back end for a given route. By design, all requests for asynchronous component and data dependencies will be issued in parallel. Found uses static route configurations specifically to enable issuing these requests in parallel.

If you need additional context such as a store instance to fetch data, specify this as the `matchContext` prop to your router. This context value will then be available as the `context` property on the argument to `getData`.

```js
const route = {
  path: 'widgets/:widgetId',
  Component: WidgetPage,
  getData: ({ params, context }) =>
    context.store.dispatch(Actions.getWidget(params.widgetId)),
};

// <Router matchContext={{ store }} />
```

:::caution

It does not make sense to specify `data` or `getData` if the route does not have a component as above or a `render` method as below.

:::


#### `defer`

By default, Found will issue all data fetching operations in parallel. However, if you wish to defer data fetching for a given route until its parent data promises has been resolved, you may do so by setting `defer` on the route.

```tsx
<Route Component={Parent} getData={getParentData}>
  <Route Component={Child} getData={getChildData} defer />
</Route>
```
Setting `defer` on a route will make the resolver defer calling its `getData` method and the `getData` methods on all of its descendants until all of its parent data promises have resolved.


:::tip
This should be a relatively rare scenario, as generally user experience is better if all data are fetched in parallel, but in some cases it can be desirable to avoid making data fetching operations that are guaranteed to fail, such as when the user is not authenticated, when optimizing for client bandwidth usage or API utilization.
:::