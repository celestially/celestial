AutoForm = React.createClass({

  handleChange(e) {
    let docPath = this.props.topKey ? this.props.item[this.props.topKey] : this.props.item;

    docPath = this.props.topKey || '';
    docPath = this.props.subKey ? `${docPath}.${this.props.subKey}`  : docPath;
    console.log('AutoForm change: ' + docPath + ", " + e.target.name + ", " + e.target.value);
    var obj = {}
    //obj[this.props.section + "." + e.target.name] = e.target.value
    obj[docPath +'.' + e.target.name] = e.target.value
    console.log('obj: ' + JSON.stringify(obj));
    this.props.collection.update(this.props.item._id, {"$set" : obj})
  },

  render() {
    //var sectionArr = this.props.item[this.props.section] || [];
    //let item = eval(`(() => { return this.props.item${this.props.docPath}})()`)
    let doc = this.props.topKey ? this.props.item[this.props.topKey] : this.props.item;
    let item = (this.props.subKey ? doc[this.props.subKey] : doc) || {};
    //console.log('AutoForm item: ' + Object.keys(item));
    var rows = this.props.fields.map((field) => {
      let value = item[field] || '';
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field}
                      onChange={this.handleChange}
                      value={value} />
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