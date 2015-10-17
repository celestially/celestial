//InputForm = React.createClass({
//  render() {
//    return <table>
//      {this.props.children}
//    </table>
//  }
//})
//
//InputFormRow = React.createClass({
//  render() {
//    return <tr>
//      {this.props.children}
//    </tr>
//  }
//})
//
//InputFormSection = React.createClass({
//  render() {
//    return <td>
//      {this.props.children}
//    </td>
//  }
//})


InputTable = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      item: this.props.collection.findOne()
    };
  },

  handleChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value);
    var obj = {}
    obj[this.props.section + "." + e.target.name] = e.target.value
    Audits.update(this.data.item._id, {"$set" : obj})
  },

  render() {
    console.log('this.data.item: ' + JSON.stringify(this.data.item));
    console.log('this.props.section: ' + this.props.section);
    var sectionArr = this.data.item[this.props.section] || [];
    var rows = this.props.fields.map((field) => {
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field} onChange={this.handleChange} value={sectionArr[field]}></textarea></td>
      </tr>;
    })
    return <table id="meta">
      <tbody>
      {rows}
      </tbody></table>;
  }

})