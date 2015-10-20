AuditList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Audits.find().fetch()
    };
  },

  newAudit() {
    Audits.insert({name: "New Audit"});
  },

  editAudit() {
  },

  render() {
    var items = this.data.items.map( i => {
      return <li className="list-group-item" onClick={this.editAudit.bind(i._id)}>
        <a href={'/audit/' + i._id + '/main'}
           className="tooltip"
        >
          Audit: {i.name}
          </a>
        </li>
    })

    console.log('this.props.params: ' + JSON.stringify(this.props.params));

    return <div>
      <h3>{this.data.items.length} Audits found</h3>
      <input type='button'
             onClick={this.newAudit}
        value='Create New Audit'>
        </input>
      <hr />
    <ul className="list-group" >
      {items}
    </ul>
      </div>
  }
});


