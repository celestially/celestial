
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

const devModule = {
  name: 'schema',
  singularName: 'schema',
  pluralName: 'schema',
  collection: celestial.Schemas,
  itemFactory: newSchema,
  layout: Layout,
  showNav: true,
  routes: [
    {
      path: '/:id/main',
      name: 'schema',
      content: FormEditor,
      docKey: 'schema'
    },
  ]
};

Reaktor.init(
  <Router>

    {celestial.createRoutes(devModule)}

    <Route path="/schema/list"
           layout={Layout}
           content={celestial.getListComponent(devModule)} />
  </Router>);

