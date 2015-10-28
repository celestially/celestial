
Layout = React.createClass({
  render() {
    return (
      <div>
        <TopNav/>
        {this.props.content}
      </div>
    );
  }
})

