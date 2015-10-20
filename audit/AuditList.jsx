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
      return <li className="list-group-item"
                 onClick={this.editAudit.bind(i._id)}>
        <a href={'/audit/' + i._id + '/MD'}>
        Audit: {i.name} {i._id}
          </a>
        </li>
    })

    console.log('this.props.params: ' + JSON.stringify(this.props.params));

    return <div>
      <input type='button'
             onClick={this.newAudit}>
        New Audit</input>
    <ul className="list-group" >
      Audits ({this.data.items.length})
      {items}
    </ul>
      </div>
  }
});


