
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
  collection: Celestial.Schemas,
  //itemFactory: newSchema,
  layout: Layout,
  showNav: true,
  listRoute: 'list',
  newItemTemplate: {
    schema: []
  },
  routes: [
    {
      path: '/:id/main',
      name: 'schema',
      content: JSONViewWrapper(FormEditor),
      docKey: 'schema'
    },
  ]
};

Reaktor.init(
  <Router>
    {Celestial.createRoutes(schemaModule)}

    <Route path="/schema/list"
           layout={Layout}
           content={Celestial.getListComponent(schemaModule)} />

  </Router>);

