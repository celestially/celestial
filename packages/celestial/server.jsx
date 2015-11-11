Meteor.startup(function(){
  Celestial.Schemas.remove({});
});

Meteor.methods({
  newSchema: function () {
    console.log('newSchema: ' );
    var _id = Celestial.Schemas.insert({
      name: "New Schema2",
      schema: []
    })
    return _id;
  }
});

Meteor.methods({
  newItemFromSchema: function (moduleName, itemName) {
    console.log('newItemFromSchema: ' );
    obj = {};
    const schemasArr = Celestial.modules[moduleName].schemas
    schemasArr.map( schema => {
      const prototype = Celestial.Schemas.findOne({name: schema})
      if (prototype) {
        obj[schema] = prototype.schema
      } else {
        console.log('schema not found: ' + schema);
      }
    });
    obj[schemasArr[0]].value[0].value = itemName
    obj.createdAt = new Date()
    //obj['name'] = 'New Item';
    var _id = Celestial.modules[moduleName].collection.insert(obj)
    return _id;
  }
});