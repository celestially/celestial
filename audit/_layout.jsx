Layout2 = React.createClass({
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            Home
          </div>
          <div className='col-xs-3'>
            <a href='/audits'>Audits</a>
          </div>
          <div className='col-xs-3'>
            <a href='/audits'>Report</a>
          </div>
        </div>
        <hr />

        {this.props.content}
      </div>
    );
  }
});
