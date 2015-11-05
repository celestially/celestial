Tasks = new Mongo.Collection('tasks');

TaskInput = React.createClass({
  render() {
    return <div>
      Title: <TextInput {...this.props} field="name"/>
      Due Date: <TextInput {...this.props} field="dueDate"/>
      <CheckboxInput {...this.props} field="private"/> Private
    </div>
  }
})

Layout = React.createClass({
  render() {
    return <div>{this.props.content}</div>
  }
})

const routes = [
  ['path', 'name', 'content', 'label'],
  ['/:id/main', 'main', TaskInput, "Edit Task"],
];

const tasksApp = {
  name: 'tasks',
  collection: Tasks,
  layout: Layout,
  routes: convertToArrayOfObjects(routes),
  listRoute: '/'
};

celestial.initApp(tasksApp);
