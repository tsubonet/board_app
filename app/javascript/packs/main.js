import ReactOnRails from 'react-on-rails';

import Main from '../bundles/HelloWorld/components/Main';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Main,
});
