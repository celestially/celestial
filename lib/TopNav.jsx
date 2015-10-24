TopNav = React.createClass({
  render() {
    return (
      <div>
        <div className='row'>
          <div className='nav-cell'>
            Home
          </div>
          <div className='nav-cell'>
            <a href='/customer/list'>Customers</a>
          </div>
          <div className='nav-cell'>
            <a href='/audit/list'>Audits</a>
          </div>
          <div className='nav-cell'>
            <a href='/config/list'>Config</a>
          </div>
        </div>
        <hr />
      </div>
    );
  }
});

