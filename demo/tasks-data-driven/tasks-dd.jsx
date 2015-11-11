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

celestial.initModule(tasksApp);
