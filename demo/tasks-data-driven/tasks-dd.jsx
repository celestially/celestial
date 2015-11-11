const tasksApp = {
  name: 'task-dd',
  label: 'Data Driven Demo',
  singularName: 'task',
  pluralName: 'tasks',
  collection: TasksDD,
  schemas: ['task', 'subtaskChecklist'],
  layout: CommonLayout,
  showNav: true,
  listRoute: 'list',
};

Celestial.initModule(tasksApp);
