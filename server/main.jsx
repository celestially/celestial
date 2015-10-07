if (Posts.find().count() === 0) {
  Posts.insert({ slug: 'post-1', title: 'Post 1' });
  Posts.insert({ slug: 'post-2', title: 'Post 2' });
  Posts.insert({ slug: 'post-3', title: 'Post 3' });
}

if (Audits.find().count() === 0) {
  Audits.insert({ slug: 'audit-1', title: 'audit 1' });
}

Meteor.publish('post', function(slug) {
  check(slug, String);
  return Posts.find({ slug: slug });
});
