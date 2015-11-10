celestial = {};
celestial.util = {}

celestial.Schemas = new Mongo.Collection('schemas');
//celestial.Configs = new Mongo.Collection('configs');

Meteor.methods({
  newSchema: function () {
    console.log('newSchema: ' );
    var _id = celestial.Schemas.insert({
      name: "New Schema",
      schema: {}
    })
    return _id;
  }
});
