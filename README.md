# Celestial
Celestial is a simple yet powerful framework for creating data-driven apps with React and Meteor. 

##Principles
A module in Celestial is basically a colleciton of related routes. Each module has a primary collection.  This lets you organize your routes logically according to function.

##How To Use
```
const routes = [
  ['path', 'name', 'content', 'label'],
  ['/:id/main', 'main', TaskInput, 'Edit Task'],
];

const tasksApp = {
  name: 'task',
  collection: Tasks,
  layout: Layout,
  routes: celestial.util.convertToArrayOfObjects(routes),
  listRoute: 'list'
};

celestial.initModule(tasksApp);
```

TaskInput is a React component:

```
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
```
