celestial = {};
celestial.util = {}
celestial.modules = {}

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

Meteor.methods({
  newItemFromSchema: function (moduleName, itemName) {
    console.log('newItemFromSchema: ' );
    obj = {};
    const schemasArr = celestial.modules[moduleName].schemas
    schemasArr.map( schema => {
      const prototype = celestial.Schemas.findOne({name: schema})
      if (prototype) {
        obj[schema] = prototype.schema
      } else {
        console.log('schema not found: ' + schema);
      }
    });
    obj[schemasArr[0]].value[0].value = itemName
    obj.createdAt = new Date()
    //obj['name'] = 'New Item';
    var _id = celestial.modules[moduleName].collection.insert(obj)
    return _id;
  }
});

