'use strict';

// Add a `if (module.hot)` check before calling the `accept` function
function ModuleHotAcceptPlugin(source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  if (/\bmodule.hot\b/.test(source)) {
    return source;
  }

  return `${source}
  if (module.hot) {
    module.hot.accept(function(err) {
      if (err) {
        console.error(err);
      }
    });
  }`;
}

module.exports = ModuleHotAcceptPlugin;
