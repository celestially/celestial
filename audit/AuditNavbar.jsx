AuditNavbar = React.createClass({
  render() {
    let id = this.props.params.id;
    //let id = "foo";
    return (
      <div>
        Nav: {this.props.section}
        <div className='row'>
          <div className='col-xs-3'>
            Main
          </div>
          <div className='col-xs-3'>
            <a href={'/audit/' + id + '/md'}>MD</a>
          </div>
          <div className='col-xs-3'>
            <a href='/audit/dc'>DC</a>
          </div>
        </div>
        <hr />
      </div>
    );
  }
});

