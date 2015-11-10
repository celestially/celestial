Tasks = new Mongo.Collection('tasks');

TaskInput = React.createClass({
  render() {
    return <div>
      <div>
        Title: <TextInput {...this.props} field="name"/>
      </div>
      <div>
        Due Date: <TextInput {...this.props} field="dueDate"/>
      </div>
      <div>
        <CheckboxInput {...this.props} field="private"/> Private
      </div>
    </div>
  }
});

Layout = React.createClass({
  render() {
    return <div>{this.props.content}</div>
  }
});

const routes = [
  ['path', 'name', 'content', 'label'],
  ['/:id/main', 'main', TaskInput, "Edit Task"],
];

const tasksApp = {
  name: 'task',
  collection: Tasks,
  layout: Layout,
  routes: convertToArrayOfObjects(routes),
  listRoute: 'list'
};

celestial.initApp(tasksApp);
