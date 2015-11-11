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
