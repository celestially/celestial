CheckboxList = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
      items: []
    };
  },

  addItems(e) {
    const selKey = this.props.selectedKey
    const selValue = this.state.selectedValue
    const parr = selKey.split('::')
    const prefix = parr[parr.length - 2] || '_'
    let converted = selValue.split("\n");
    let result = [];
    converted.map((line, i) => {
      //line = replaceAll(line, '\\.', '')
      line = replaceAll(line, '\t', '')
      line = replaceAll(line, '•', '')
      line = line.replace(/^\s+|\s+$/g, '')
      if (line.indexOf("::") > -1) {
        let split = line.split('::')
        result.push([split[0], split[1]])
      }
      else if (line.length > 0) {
        result.push({
          key: prefix + (i + 1),
          value: line,
        })
      }
    })
    console.log('reportEditor updateValue: ' + this.props.selectedKey);
    result.map(line => {
      let obj = {}
      console.log('addItems selKey: ' + selKey);
      obj[`report.${selKey}.items`] = line
      this.props.module.collection.update(this.props.item._id, {"$push": obj})
    })

    this.onSelectKey(selKey)
  },

  onSelectKey(name) {
    console.log('onSelectKey: ' + name);
    this.setState({
      selectedKey: name,
      selectedValue: '',
      oldKey: name
    })
  },

  getReportItem() {
    return this.props.item.report || {
        _id: this.props.item._id
      };
  },

  getItems() {
    if (this.getReportItem()[this.props.selectedKey]) {
      return this.getReportItem()[this.props.selectedKey].items || []
    }
    else {
      return []
    }
  },

  setChecked(e) {
    console.log('setChecked: ' + e.target.name + ", " + e.target.value, ', ' + e.target.checked);
    let obj = {}
    const dotKey = `report.${this.props.selectedKey}.items.${e.target.name}.show`;
    console.log('setChecked selKey: ' + dotKey + ', ' + this.getReportItem()._id);
    obj[dotKey] = e.target.checked
    this.props.module.collection.update(this.getReportItem()._id, {"$set": obj})
  },

  setSectionChecked(e) {
    console.log('setChecked: ' + e.target.name + ", " + e.target.value, ', ' + e.target.checked);
    let obj = {}
    const dotKey = `report.${this.props.selectedKey}.hideSection`;
    obj[dotKey] = e.target.checked
    console.log('setChecked obj: ' + JSON.stringify(obj) + ' - ' + this.getReportItem()._id);
    this.props.module.collection.update(this.getReportItem()._id, {"$set": obj})
  },

  renderCheckboxes() {
    if (!this.getReportItem()[this.props.selectedKey].hideSection) {
    return this.getItems().map((item, i) => {
      //return <div>item: {item}</div>
      return <div>
        <input
          name={i}
          type='checkbox'
          onChange={this.setChecked}
          checked={item.show}/>
        {item.value} <a href={'#openModal' + 'LI_' + i}>edit</a>
        <TextboxModal value={item.value}
                      itemKey={item.key}
          {...this.props}
                      name={'LI_' + i}
                      selKey={this.props.selectedKey}
                      id={this.getReportItem()._id}
        />
      </div>
    })
    }
  },

  renderItemsList() {
    console.log('renderItemsList this.getReportItem(): ' + this.getReportItem())
    console.log('renderItemsList this.props.selectedKey: ' + this.props.selectedKey)
    let addItems
    //if (this.props.editConfigMode) {
      addItems = <div>
        <textarea rows='5' cols='50' valueLink={this.linkState('selectedValue')}/>
        <button onClick={this.addItems}>Add Items</button>
      </div>
    //}

    try {
      return <div className="fw">
        <h3>
          {this.props.selectedKey} items <input
          name='sectionChecked'
          type='checkbox'
          onChange={this.setSectionChecked}
          checked={this.getReportItem()[this.props.selectedKey].hideSection}/> hidden

        </h3>
        {this.renderCheckboxes()}
        {addItems}
      </div>
    } catch (e) {
      console.log('e.stack: ' + e.stack);
      return <div>error in renderItemsList</div>
    }
  },

  handleChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value);
    var obj = {}
    //obj[this.props.section + "." + e.target.name] = e.target.value
    obj[`report.${e.target.name}`] = e.target.value
    this.props.collection.update(this.props.item._id, {"$set": obj})
  },

  render() {
    //let items;
    //try {
    //  items = this.state.selectedValue.items || [];
    //} catch (e) {
    //  items = []
    //}

    const topFields = ['description', 'sectionKey']


    return (
      <div>
        <div className="fw">
          <AutoForm fields={topFields}
                    topKey='report'
                    subKey={this.props.selectedKey} {...this.props} />
        </div>
        {this.renderItemsList()}
      </div>)
  }
})

TextboxModal = React.createClass({
  onEditItemValue(e) {
    let obj = {};
    console.log('onEditItem e.target.name: ' + e.target.name);
    const arrKey = e.target.name.split('_')[1];
    const dotKey = `report.${this.props.selKey}.items.${arrKey}.value`;
    console.log('onEditItem dotKey: ' + dotKey + ', ' + this.props.id);
    obj[dotKey] = e.target.value;
    this.setState({
      value_obj: obj,
    });
  },

  onEditItemKey(e) {
    let obj = {};
    console.log('onEditItem e.target.name: ' + e.target.name);
    const arrKey = e.target.name.split('_')[1];
    const dotKey = `report.${this.props.selKey}.items.${arrKey}.key`;
    console.log('onEditItem dotKey: ' + dotKey + ', ' + this.props.id);
    obj[dotKey] = e.target.value;
    this.setState({
      key_obj: obj,
    });
  },

  save() {
    if (this.state.value_obj) {
      console.log('save: ' + JSON.stringify(this.state.value_obj));
      this.props.module.collection.update(this.props.id, {"$set": this.state.value_obj})
    }
    if (this.state.key_obj) {
      console.log('save: ' + JSON.stringify(this.state.key_obj));
      this.props.module.collection.update(this.props.id, {"$set": this.state.key_obj})
    }
  },


  render() {
    return (
      <div>
        <div id={'openModal' + this.props.name} className="modalDialog">
          <div><a href="#close" title="Close" className="close" onClick={this.save}>X</a>
            <input type="text"
                   name={'itemkey' + this.props.name}
                   defaultValue={this.props.itemKey}
                   onChange={this.onEditItemKey}
            />
            <textarea rows='5' cols='50' name={this.props.name}
                      defaultValue={this.props.value}
                      onChange={this.onEditItemValue}
            />
          </div>
        </div>
      </div>
    );
  }
});




