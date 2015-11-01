Meteor.methods({
  newPrototype: function () {
    //const auditConfig = Prototypes.findOne({name: 'Audit Config Template'})
    //var reportConfig = auditConfig && auditConfig.report
    //reportConfig = reportConfig ? reportConfig : {}
    //console.log('auditConfig: ' + JSON.stringify(auditConfig));
    console.log('newPrototype: ' );
    var _id = celestial.Prototypes.insert({
      name: "New Prototype",
      form: {}
    })
    //var obj = {}
    //obj['report._id'] = _id
    //Audits.update(_id, {"$set": obj})
    return _id;
  }
});
