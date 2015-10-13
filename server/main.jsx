if (Audits.find().count() === 0) {
  Audits.insert({ slug: 'audit-1', title: 'audit 1' });
}
if (MetaColl.find().count() === 0) {
  MetaColl.insert({ name: 'audit' });
}

Meteor.publish('post', function(slug) {
  check(slug, String);
  return Posts.find({ slug: slug });
});
