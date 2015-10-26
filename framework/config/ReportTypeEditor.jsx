ReportTypeEditor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
      items: []
    };
  },

  addItems() {
    const selKey = this.state.selectedKey
    const selValue = this.state.selectedValue
    const parr = selKey.split('::')
    const prefix = parr[parr.length-2]
    let converted = selValue.split("\n");
    let result = [];
    converted.map((line, i) => {
      line = replaceAll(line, '\\.', '')
      line = replaceAll(line, '\t', '')
      line = replaceAll(line, '•', '')
      line = line.replace(/^\s+|\s+$/g, '')
      if (line.indexOf("::") > -1) {
        let split = line.split('::')
        result.push([split[0], split[1]])
      }
      else if (line.length > 0) {
        result.push([prefix + '-' + (i + 1), line])
        //result.push(prefix + '-' + (i + 1) + '::' + line)
      }
    })
    console.log('updateValue: ' + this.state.selectedKey);
    let obj = {}
    obj[selKey + '.items'] = result
    this.props.module.collection.update(this.props.item._id, {"$set": obj})
    this.setState({
      selectedKey: selKey,
      selectedValue: {
        items: result
      },
      oldKey: selKey
    })

  },

  onSelectKey(name) {
    console.log('onSelectKey: ' + name);
    this.setState({
      selectedKey: name,
      selectedValue: this.props.item[name],
      oldKey: name
    })
  },

  render() {
    let items;
    try {
      items= this.state.selectedValue.items || [];
    } catch(e) {
      items = []
    }

    return (
      <div>
        <ConfigEditor module="config" {...this.props} onSelectKey={this.onSelectKey}>
          {items.map(item => {
            return <div>item: {item}</div>
            })}
          <textarea rows='25' cols='100'
                valueLink={this.linkState('selectedValue')}/>
          <button onClick={this.addItems}>Add Items</button>
        </ConfigEditor>)
      </div>)
  }
})

//report2ConfigEditor = function (Component, section) {
//  return React.createClass({
//    render() {
//      console.log('renderList: ');
//      return (
//        <ConfigEditor module="config" {...this.props} onSelectKey={this.onSelectKey}>
//
//        </ConfigEditor>)
//    }
//  })
//};


