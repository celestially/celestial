var LinkedStateMixin = React.addons.LinkedStateMixin;

ReportConfigEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {};
  },

  updateValue() {
    const selKey = this.props.selectedKey
    console.log('updateValue: ' + this.props.selectedKey);
    let obj = {}
    obj[selKey] = this.state.selectedValue
    Schemas.update(this.props.item._id, {"$set": obj})

    //convert to array
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

  convert() {
    let converted = this.state.selectedValue.split("\n");
    result = [];
    converted.map(line => {
      line = replaceAll(line, '\\.', '')
      line = replaceAll(line, '\t', '')
      line = replaceAll(line, '•', '')
      result.push(line)
    })
    //console.log('converted: ' + converted);
    this.setState({converted: result})
    //save converted value
    let obj = {}
    obj['_result.' + this.props.selectedKey] = result
    Schemas.update(this.props.item._id, {"$set": obj})
  },


  render() {
    if (this.props.selectedKey) {
      return <div>
        <div className='row'>
          <textarea rows='25' cols='100'
                    valueLink={this.linkState('selectedValue')}/>
          <button onClick={this.updateValue}>Update Value</button>
        </div>
      </div>
    } else {
      return <div>No key</div>
    }
  }

})