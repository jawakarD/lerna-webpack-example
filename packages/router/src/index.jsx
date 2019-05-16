import Leaf from '@dkez/leaf';
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// We set a route prefix so this will work when we deploy to github pages.
// If you fork this repo, update this value and in the webpack / package.json
// to be able to deploy to your repo as well.
// const routePrefix = location.host;

// Create an async wrapper around our async-leaf component.
// We only want to load this component on the '/async' path
/* tslint:disable prettier */
const LoadableAsyncLeaf = React.lazy(() =>
  import(/* webpackChunkName: 'async-leaf' */ '@dkez/async-leaf'));
// We are intentionally ignoring here as this leaf is in JS not TS. This is useful
// if you want to progressively update your packages over to TS.
// @ts-ignore

/* tslint:enable */

const LoadingState = (
  <div style={{ background: 'aqua', width: '100px', height: '100px' }}>Loading...</div>
);

const BasicRouting = () => (
  <Suspense fallback={LoadingState}>
    <Router>
      <div>
        <a href="/async/">Hard redirect to /async</a>
        <br />
        <a href="/">Hard redirect to /</a>
        <br />
        <br />

        {/* We can still use external routing (e.g. page redirects) to load our components. */}
        <Route exact path="/" component={Leaf} />
        <Route exac path="/async" component={LoadableAsyncLeaf} />
      </div>
    </Router>
  </Suspense>
);

const container = document.getElementById('react-root');
render(<BasicRouting />, container);
