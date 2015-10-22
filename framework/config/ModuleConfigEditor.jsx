var LinkedStateMixin = React.addons.LinkedStateMixin;

ModuleConfigEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      //value: {}
    };
  },

  updateValue() {
    const selKey = this.props.selectedKey
    console.log('updateValue: ' + this.props.selectedKey);
    let obj = {}
    obj[selKey] = this.state
    Schemas.update(this.props.item._id, {"$set": obj})

    //convert to array
    //const prefix = selKey.split(':')[0]
    const prefix = selKey.split(':')[0]
    let converted = this.state.selectedValue.split("\n");
    result = [];
    converted.map((line, i) => {
      line = replaceAll(line, '\\.', '')
      line = replaceAll(line, '\t', '')
      line = replaceAll(line, '•', '')
      line = line.replace(/^\s+|\s+$/g, '')
      if (line.length > 0) {
        result.push([prefix + '-' + (i + 1), line])
      }
    })
    //console.log('converted: ' + converted);
    this.setState({converted: result})
    //save converted value
    obj = {}
    obj['_result.' + selKey] = result
    Schemas.update(this.props.item._id, {"$set": obj})

  },

  renderForm() {
    let schema = ['name', 'routes']
    let rows = schema.map((field) => {
      return <tr key={field}>
        <td className="meta-head">{field}</td>
        <td><textarea name={field} valueLink={this.linkState(field)} /></td>
      </tr>;
    })
    return <table id="meta">
      <tbody>
      {rows}
      </tbody></table>;
  },

  render() {
    if (this.props.selectedKey) {
      return <div>
        <div className='row'>
          {this.renderForm()}
          <textarea rows='25' cols='100'
                    valueLink={this.linkState('listInput')}/>
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