import React from 'react';
import { render } from 'react-dom';

import './css/style.css';
import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import { BrowserRouter, Match, Miss, Route } from 'react-router-dom';

const Root=() => {
    return (
       /*  <h2>Inside tag</h2> */
      <BrowserRouter>
        <div>
          <h2>Store</h2>
          <Route exact path="/" component={StorePicker} />
          <Route path="/store/:storeId" component={App} />
          <Route exact path="?" component={NotFound} />
          {/* <Match exactly pattern="/" component={StorePicker} />
          <Match pattern="/store/:storeId" component={App} /> */}
        </div>
      </BrowserRouter>
    )
}

render(<App/>, document.querySelector('#main'));
