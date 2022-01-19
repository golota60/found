import { any } from 'prop-types';
import React from 'react';
import {
  LocationDescriptor,
  Match,
  RedirectOptions,
  RedirectProps,
} from './generics';
import RedirectException from './RedirectException';

// interface EnhancedRenderComponenta
//   extends Omit<React.Component<RedirectProps>, 'render'> {
//   render(args: any): React.ReactNode;
// }

interface EnhancedRenderComponenta
  extends Omit<React.Component<RedirectProps, any, any>, 'render'> {
  render(asdf: any): any;
}

export default class Redirect extends React.Component<RedirectProps> {
  path?: string;
  to: string | ((match: Match) => LocationDescriptor);
  status?: number;
  constructor(props: RedirectOptions) {
    super(props);
    this.path = props.from;
    this.to = props.to;
    this.status = props.status;
  }

  render(props?: any): React.ReactNode {
    const { to, status } = this;
    let toLocation;

    if (typeof to === 'function') {
      toLocation = to(props.match);
    } else {
      const { router, params } = props.match;
      toLocation = router.matcher.format(to, params);
    }

    throw new RedirectException(toLocation, status);

    return <div></div>;
  }
}

if (__DEV__) {
  // Workaround to make React Proxy give me the original class, to allow
  // makeRouteConfig to get the actual class, when using JSX for routes.
  (Redirect as any).prototype.isReactComponent = {};
}
