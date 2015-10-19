Layout2 = React.createClass({
  render() {
    return (
      <div>
        <Nav/>

        <a href="/post/post-1">post 1 </a>
        <a href="/post/post-2">post 2 </a>
        <a href="/post/post-3">post 3 </a>
        <a href="/audit/audit-1">audit 1 </a>
        <a href="/">home</a>
        <hr />
        {this.props.content}
      </div>
    );
  }
});

