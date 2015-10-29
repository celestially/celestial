Package.describe({
  name: 'celestial:celestial',
  summary: 'Celestial',
  version: '0.0.1',
  git: 'https://github.com/celestially/celestial'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use([
    'ecmascript@0.1.4',
    'react@0.1.13',
    ]);

  api.use([
    'meteor-platform',
    ]);

  api.imply([
    'meteor-platform',
    ]);

  api.addFiles([
    'init.js',
    'nav.jsx',
    'ItemWrapper.jsx',
    'KeyedItemWrapper.jsx',
    'ItemList.jsx',
    'ConfigItemWrapper.jsx',
    'routeUtils.jsx',
    ]);

  api.export('celestial');
  api.export('ItemList');
  api.export('KeyedItemWrapper');
});

//Package.onTest(function(api) {
//  api.use('tinytest');
//});
