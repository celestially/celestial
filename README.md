# Celestial
Celestial is a simple yet powerful framework for creating data-driven apps with React and Meteor. 

##Principles
A module in Celestial allows you to define multiple routes. Each module has a primary collection.  This lets you organize your routes logically according to function.

##Data-driven example
```
const Tasks = new Mongo.Collection('tasks-dd');

const tasksApp = {
  name: 'task-dd',
  label: 'Data Driven Demo',
  singularName: 'task',
  pluralName: 'tasks',
  collection: Tasks,
  schemas: ['task', 'subtaskChecklist'],
  layout: CommonLayout,
  showNav: true,
  listRoute: 'list',
};

Celestial.initModule(tasksApp);
```

This automatically configures a route for each schema, plus a list route.

The schemas can be configured/defiend by pointing your browser to /schema/list

Once you have configured the schemas, you can view/add tasks at /task-dd/list

##Basic example

You can also define a module completely in code (not data-driven):

```
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

Celestial.initModule(tasksApp);
```

For this example TaskInput is a React component:

```
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
```
