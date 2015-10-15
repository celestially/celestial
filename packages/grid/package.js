Package.describe({
  name: 'celestial:grid',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Repackaged for meteor React-Spreadsheet-Component',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['ecmascript', 'react@0.1.13', 'jquery']);
  api.addFiles('grid.js');
  api.addFiles([
      'src/cell.jsx',
      'src/dispatcher.jsx',
      'src/helpers.jsx',
      'src/row.jsx',
      'src/spreadsheet.jsx',
    ], 'client'
  );
  api.addFiles([
      //'styles/creativeworks.css',
      'styles/excel.css',
    ], 'client'
  )
  api.export("Spreadsheet", 'client');
  api.export("Dispatcher", ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('celestial:grid');
  api.addFiles('grid-tests.js');
});
