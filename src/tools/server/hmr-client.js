/* eslint-disable */
require('eventsource-polyfill');

//let hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
let hotClient = require('webpack-hot-middleware/client?http://localhost:8181&noInfo=true&reload=true')
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
