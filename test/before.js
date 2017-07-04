/*eslint-env node*/

import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';

process.env.NODE_ENV = 'test';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
jsdom.changeURL(window, "http://localhost/");

chai.use(chaiImmutable);
chai.use(chaiAsPromised);

