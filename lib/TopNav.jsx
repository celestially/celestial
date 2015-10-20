TopNav = React.createClass({
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            Home
          </div>
          <div className='col-xs-3'>
            <a href='/customer/list'>Customers</a>
          </div>
          <div className='col-xs-3'>
            <a href='/audit/list'>Audits</a>
          </div>
        </div>
        <hr />
      </div>
    );
  }
});

