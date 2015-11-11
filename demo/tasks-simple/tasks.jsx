const Tasks = new Mongo.Collection('tasks');

const TaskInput = React.createClass({
  render() {
    return <div>
      <h2>Edit Task</h2>
      <div>
        Title: <TextInput {...this.props} field="name"/>
      </div>
      <div>
        Due Date: <TextInput {...this.props} field="dueDate"/>
      </div>
      <div>
        <CheckboxInput {...this.props} field="completed"/> Completed
      </div>
      <div>
        <h3>
          <a href='/task/list'>Back to Task List</a>
        </h3>
      </div>
    </div>
  }
});

const tasksApp = {
  name: 'task',
  singularName: 'task',
  pluralName: 'tasks',
  collection: Tasks,
  layout: CommonLayout,
  routes: [
    {
      path: '/:id/main',
      name: 'main',
      content: TaskInput,
    }
  ],
  listRoute: 'list',
  showNav: false
};

celestial.initModule(tasksApp);
