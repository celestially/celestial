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
    const prefix = parr[parr.length - 2] || 'XX'
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
        //result.push([prefix + '-' + (i + 1), line])
        //result.push(prefix + '-' + (i + 1) + '::' + line)
        result.push({
          key: prefix + '-' + (i + 1),
          value: line,
          items: []
        })
      }
    })
    console.log('reportEditor updateValue: ' + this.state.selectedKey);
    result.map(line => {
      let obj = {}
      console.log('addItems selKey: ' + selKey);
      obj[selKey + '.items'] = line
      this.props.module.collection.update(this.props.item._id, {"$push": obj})
    })
    //this.setState({
    //  selectedKey: selKey,
    //  selectedValue: {
    //    items: result
    //  },
    //  oldKey: selKey
    //})
    this.onSelectKey(selKey)

  },

  onSelectKey(name) {
    console.log('onSelectKey: ' + name);
    this.setState({
      selectedKey: name,
      selectedValue: this.props.item[name],
      oldKey: name
    })
  },

  renderItemsTable(items) {
    return <table>
      <tbody>
      {items.map( (item, i) => {
        //return <div>item: {item}</div>
        return <div>
          <tr>
            <td>{item.key}</td>
            <td>{item.value}</td>
          </tr>
          <tr>
            <td></td>
            <td className="grayed">
              <a href={'#openTable' + i}>show</a>
              +items ({item.items.length})
            </td>
          </tr>
          <tr>
            <td></td>
            <td id={'openTable' + i} className="hidingTable">{this.renderItemsTable(item.items)}</td>
          </tr>
        </div>
        })}
      <tr>
          <textarea rows='5' cols='50' valueLink={this.linkState('selectedValue')}/>
          <button onClick={this.addItems}>Add Items</button>
      </tr>
      </tbody>
    </table>
  },

  render() {
    let items;
    try {
      items = this.state.selectedValue.items || [];
    } catch (e) {
      items = []
    }

    return (
      <div>
        <ConfigEditor module="config" {...this.props} onSelectKey={this.onSelectKey}>
          {this.renderItemsTable(items)}
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


