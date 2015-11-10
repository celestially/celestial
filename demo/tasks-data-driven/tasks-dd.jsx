const Tasks = new Mongo.Collection('tasks-dd');

Layout = React.createClass({
  render() {
    return <div>{this.props.content}</div>
  }
});

const tasksApp = {
  name: 'task-dd',
  collection: Tasks,
  //itemFactory: newTask,
  schemas: ['task_schema'],
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
