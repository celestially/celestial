const Tasks = new Mongo.Collection('tasks-dd');

ListItem = function() {
  React.createClass( {
    render() {
      try {
        return this.props.item.task.value[0].value
      }
      catch (e) {
        return "Title not found";
      }
    }
  });
}

const tasksApp = {
  name: 'task-dd',
  singularName: 'task',
  pluralName: 'tasks',
  collection: Tasks,
  schemas: ['task', 'subtaskChecklist'],
  layout: CommonLayout,
  listItem: ListItem,
  showNav: true,
  listRoute: 'list',
  routes: [
    {
      path: '/:id/main',
      name: 'main',
      content: ItemInput,
      label: 'Edit',
      docKey: 'task'
    },
    {
      path: '/:id/Checklist',
      name: 'Checklist',
      content: ItemInput,
      label: 'Checklist',
      docKey: 'subtaskChecklist'
    },
  ],
};

celestial.initModule(tasksApp);
