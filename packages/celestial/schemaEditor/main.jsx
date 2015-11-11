
function newSchema() {
  Meteor.call('newSchema', function(error, commentId) {
    if (error){
      throwError(error.reason);
    }
  });
}

var Layout = React.createClass({
  render() {
    return <div>{this.props.content}</div>
  }
});

const schemaModule = {
  name: 'schema',
  singularName: 'schema',
  pluralName: 'schemas',
  collection: celestial.Schemas,
  itemFactory: newSchema,
  layout: Layout,
  showNav: true,
  listRoute: 'list',
  routes: [
    {
      path: '/:id/main',
      name: 'schema',
      content: FormEditor,
      docKey: 'schema'
    },
  ]
};

//const moduleModule = {
//  name: 'module',
//  singularName: 'module',
//  pluralName: 'modules',
//  collection: celestial.Modules,
//  schemas: ['module'],
//  layout: Layout,
//  showNav: true,
//  listRoute: 'list',
//  routes: [
//    {
//      path: '/:id/main',
//      name: 'schema',
//      content: FormEditor,
//      docKey: 'schema'
//    },
//  ]
//};

Reaktor.init(
  <Router>
    {celestial.createRoutes(schemaModule)}

    <Route path="/schema/list"
           layout={Layout}
           content={celestial.getListComponent(schemaModule)} />

  </Router>);

