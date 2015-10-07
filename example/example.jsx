Posts = new Mongo.Collection('posts');

Post = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var subscription = Meteor.subscribe('post', this.props.params.slug);
    return {
      ready: subscription.ready(),
      post: Posts.findOne({ slug: this.props.params.slug })
    };
  },
  render() {
    if (! this.data.ready) {
      return <div>Loading...</div>;
    }
    if (! this.data.post) {
      return <div>404: Not found</div>;
    }
    return <div>Post: {this.data.post.title}</div>;
  }
});

