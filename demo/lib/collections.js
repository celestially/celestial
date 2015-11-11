TasksDD = new Mongo.Collection('tasks-dd')
Tasks = new Mongo.Collection('tasks')

if (Meteor.isServer) {
  Meteor.startup(function(){
    TasksDD.remove({});
    Tasks.remove({});
  })
}