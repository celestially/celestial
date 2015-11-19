Celestial is an experimental, high-level, simple-yet-poweful framework for creating declarative, data-driven apps with React and Meteor.

It is meant to be ideal for business apps, for example a CRM, CMS, issue tracking system, etc.  (Note, however it is under development and incomplete).

##Principles
One of the core features of Celestial is the ability to auto-generate forms, and it has a built-in schema editor that let's you edit forms. Currently there are only a few input types, see [checkbox](https://github.com/celestially/celestial/blob/master/packages/celestial/inputTypes/CheckboxInput.jsx) and [collection](https://github.com/celestially/celestial/blob/master/packages/celestial/schemaEditor/CollectionEditor.jsx) for example.

A module in Celestial allows you to define multiple routes. Each module has a primary collection.  This lets you organize your routes logically according to function.

You can create data-driven app be defining one or more schemas and referencing them in the module definition (see example below).  The advantage of this is that you can have a site admin or a domain-expert create or customize a schema, instead of a developer.

##Demo

This is a simple "todo" demo.  It includes two flavors, a Data-driven example and a Programmatic example. You can try the demo app at [celestial.meteor.com](http://celestial.meteor.com/), or you can run it by cloning this repo and running `meteor`

##Data-driven example
```
const tasksApp = {
  name: 'task-dd',
  label: 'Data Driven Demo',
  singularName: 'task',
  pluralName: 'tasks',
  collection: new Mongo.Collection('tasks-dd'),
  schemas: ['task', 'subtaskChecklist'],
  layout: CommonLayout,
  showNav: true,
  listRoute: 'list',
};

Celestial.initModule(tasksApp);
```

This automatically configures a route for each schema, plus a list route.

The schemas can be configured/defined by pointing your browser to `/schema/list`

When you run this example, you can view and add tasks at `/task-dd/list`.  Note the default schemas for the example above are automatically created in bootstrap.jsx, and they are "locked" to prevent people playing with demo site from messing them up.

##"Programmatic" example

You can also define a module completely in code (not data-driven):

```
const tasksApp = {
  name: 'task',
  singularName: 'task',
  pluralName: 'tasks',
  collection: new Mongo.Collection('tasks'),
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

In this example TaskInput is a React component:

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

Note that in this example above you need to pass {...this.props} to the input components.  This is due to the way React works, however soon we will switch to using React "Context" to improve this.

## Features
* Item List - automatically generate a list UI and route
* Input Types - initially there is text and boolean, and collections
* Schemas - ability to edit schemas, automatically generate input forms
* Router - automatically generates routes, it uses FlowRouter and Reaktor under the hood