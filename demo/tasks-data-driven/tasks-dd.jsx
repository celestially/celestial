Tasks = new Mongo.Collection('tasks');

Layout = React.createClass({
  render() {
    return <div>{this.props.content}</div>
  }
});

function newTask() {
  Meteor.call('newAudit', function(error) {
    if (error){
      throwError(error.reason);
    }
  });
}

const tasksApp = {
  name: 'task',
  collection: Tasks,
  itemFactory: newTask,
  layout: Layout,
  routes: [
    {
      path: '/:id/main',
      name: 'main',
      content: ItemInput,
      docKey: 'task'
    }
  ],
  listRoute: 'list'
};

celestial.initApp(tasksApp);
