AuditList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Audits.find().fetch()
    };
  },

  newAudit() {
    alert("new audit!")
  },

  editAudit() {
  },

  render() {
    var items = this.data.items.map( i => {
      return <li className="list-group-item"
                 onClick={this.editAudit.bind(i._id)}>
        <a href={"/audit/" + i._id}>
        Audit: {i.title} {i._id}
          </a>
        </li>
    })

    return <div>
      <h2 onClick={this.newAudit}>New Audit</h2>
    <ul className="list-group" >
      Audits ({this.data.items.length})
      {items}
    </ul>
      </div>
  }
});


