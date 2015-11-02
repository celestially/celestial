
function newPrototype() {
  Meteor.call('newPrototype', function(error, commentId) {
    if (error){
      throwError(error.reason);
    }
  });
}

const devModule = {
  name: 'prototypes',
  collection: celestial.Prototypes,
  itemFactory: newPrototype,
  layout: Layout,
  routes: [
    //{
    //  path: '/:id/modulePrototype',
    //  name: 'modulePrototype',
    //  content: celestial.ConfigItemWrapper(JSONViewWrapper(FormEditor),'module')
    //},
    {
      path: '/:id/TopLevel',
      name: 'TopLevel',
      content: TopLevelKeyEditor,
    },
    {
      path: '/:id/main',
      name: 'modules',
      content: FormEditor,
      docKey: 'form'
    },
  ]
};

Reaktor.init(
  <Router>

    {celestial.createRoutes(devModule)}

    <Route path="/prototypes/list"
           layout={Layout}
           content={celestial.getListComponent(devModule)} />
  </Router>);

