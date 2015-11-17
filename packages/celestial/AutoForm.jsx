AutoForm = Celestial.AutoForm = React.createClass({

  getInitialState: function () {
    return {
      modifiedFields: {}
    };
  },

  handleChange(e) {
    let modFields = {}
    modFields[e.target.name] = e.target.value;
    this.setState({
      modifiedFields: modFields
    })
  },
  //let docPath = this.props.topKey ? this.props.item[this.props.topKey] : this.props.item;
  //docPath = this.props.topKey || '';
  //docPath = this.props.subKey ? `${docPath}.${this.props.subKey}` : docPath;
  //console.log('AutoForm change: ' + docPath + ", " + e.target.name + ", " + e.target.value);
  //var obj = {}
  ////obj[this.props.section + "." + e.target.name] = e.target.value
  //obj[docPath + '.' + e.target.name] = e.target.value
  //console.log('obj: ' + JSON.stringify(obj));
  //this.props.collection.update(this.props.item._id, {"$set": obj})


  save() {
    const keys = Object.keys(this.state.modifiedFields)
    keys.map( field => {
      let value = this.state.modifiedFields[field];
      //const dotKey = `${this.props.dotKey}.${field}`;
      //console.log(`save: ${dotKey},${value},${this.props._id}`);
      //let obj = {};
      //obj[dotKey] = value;
      //this.props.collection.update(this.props._id, {"$set": obj})
      Celestial.updateItem(this.props, field, value);
    })
  },

  render() {
    //var sectionArr = this.props.item[this.props.section] || [];
    //let item = eval(`(() => { return this.props.item${this.props.docPath}})()`)

    //let doc = this.props.topKey ? this.props.item[this.props.topKey] : this.props.item;
    //let item = (this.props.subKey ? doc[this.props.subKey] : doc) || {};

    //console.log('AutoForm item: ' + Object.keys(item));
    var rows = this.props.fields.map((field) => {
      let value = this.props.item[field] || '';
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field}
                      onChange={this.handleChange}
                      defaultValue={value}
                      rows="10"
                      cols="50"
                      />
        </td>
      </tr>;
    });
    var rows2 = this.props.checkboxFields && this.props.checkboxFields.map((field) => {
      let value = this.props.item[field] || '';
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td>
          <LinkedCheckbox {...this.props}
                      property={field}
        />
        </td>
      </tr>;
    });
    return <div>
      <table id="meta">
        <tbody>
        {rows}
        {rows2}
        </tbody>
      </table>
      <button onClick={this.save}>Save</button>
    </div>;
  }
})

LinkedCheckbox = React.createClass({

  //doesn't work yet
  //setChecked(e) {
  //  const dotKey = `${this.props.dotKey}.${this.props.property}`;
  //  this.props.updateItem('$set', dotKey, e.target.checked)
  //},

  setChecked(e) {
    let obj = {}
    const dotKey = `${this.props.dotKey}.${this.props.property}`;
    console.log(`setChecked: ${dotKey},${e.target.value},${e.target.checked},${this.props._id}`);
    obj[dotKey] = e.target.checked
    this.props.collection.update(this.props._id, {"$set": obj})
  },

  render() {
    return <input
      type='checkbox'
      onChange={this.setChecked}
      checked={this.props.item[this.props.property]}/>
  }
});