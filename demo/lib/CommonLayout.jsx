CommonLayout = React.createClass({
  render() {
    return <div>
      <div className='row'>
        <div className='nav-cell'>
          <a href='/task/list'>Simple Demo</a>
        </div>
        <div className='nav-cell'>
          <a href='/task-dd/list'>Data-driven Demo</a>
        </div>
        <div className='nav-cell'>
          <a href='/schema/list'>Edit Schemas</a>
        </div>
      </div>
      <hr />
      <div>{this.props.content}</div>
    </div>
  }
});