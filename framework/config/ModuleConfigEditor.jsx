var LinkedStateMixin = React.addons.LinkedStateMixin;

ModuleConfigEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      value: ""
    };
  },

  updateValue() {
    const selKey = this.props.selectedKey
    console.log('updateValue: ' + this.props.selectedKey);
    let obj = {}
    obj[selKey] = this.state.value;
    Schemas.update(this.props.item._id, {"$set": obj})
    if (this.props.selectedKey == 'routes') {
      this.generateCode();
    }
  },

  generateCode() {
    template = `moduleRoutes = ${routes}`
    Schemas.update(this.props.item._id,
      {"$set": {_generated: template}})
  },

  //renderForm() {
  //  console.log('renderForm: ');
  //  if (this.props.selectedKey == 'name') {
  //
  //  }
  //  let schema = ['input.name', 'input.routes']
  //  let rows = schema.map((field) => {
  //    return <tr key={field}>
  //      <td className="meta-head">{field}</td>
  //      <td><textarea rows='4' cols='20' name={field} valueLink={this.linkState(field)} /></td>
  //    </tr>;
  //  })
  //  return <table id="meta">
  //    <tbody>
  //    {rows}
  //    </tbody></table>;
  //},

  render() {
    console.log('render: ');
    if (this.props.selectedKey) {
      return <div>
        <div className='row'>
          <textarea rows='4' cols='40' name={field} valueLink={this.linkState('value')} />
        </div>
        <div className='row'>
          <button onClick={this.updateValue}>Update Value</button>
        </div>
        <SimpleModal name='State' label='State'
                     value={JSON.stringify(this.state, null, 4)} />
      </div>
    } else {
      return <div>No key</div>
    }
  }

})