AutoForm = React.createClass({

  handleChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value);
    var obj = {}
    //obj[this.props.section + "." + e.target.name] = e.target.value
    obj[e.target.name] = e.target.value
    this.props.collection.update(this.props.item._id, {"$set" : obj})
  },

  render() {
    //var sectionArr = this.props.item[this.props.section] || [];
    var rows = this.props.fields.map((field) => {
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field}
                      onChange={this.handleChange}
                      value={this.props.item[field]} />
        </td>
      </tr>;
    })
    return <table id="meta">
      <tbody>
      {rows}
      </tbody>
    </table>;
  }
})