var LinkedStateMixin = React.addons.LinkedStateMixin;

ReportConfigEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      //key: 'Hello',
      //adding: true,
    };
  },

  changeKey(name) {
    console.log('go to name: ' + name);
    this.setState({
      selectedKey: name,
      selectedValue: this.props.item[name],
      oldKey: name
    })
    this.props.onSelectKey(name);
  },

  insertKey() {
    const newKey = `${this.props.docPath}.${this.state.newKey}`;
    console.log('insertKey: ' + newKey);
    let obj = {}
    obj[newKey] = {}
    this.props.module.collection.update(this.props.item._id, {"$set": obj})
    this.changeKey(this.state.newKey)
  },

  updateKey() {
    console.log('updateKey: ' + this.state.selectedKey);
    let obj = {}
    obj[this.state.oldKey] = this.state.selectedKey
    this.props.module.collection.update(this.props.item._id, {"$rename": obj})
  },

  deleteKey() {
    const key = `${this.props.docPath}.${this.state.selectedKey}`;
    console.log('deleteKey: ' + key);
    let obj = {}
    obj[key] = ''
    this.props.module.collection.update(this.props.item._id, {"$unset": obj})
  },

  updateValue() {
    if (this.props.handleUpdateValue) {
      this.props.handleUpdateValue(this.state.selectedKey, this.state.selectedValue);
      return;
    }
    const selKey = this.state.selectedKey
    console.log('updateValue: ' + this.state.selectedKey);
    let obj = {}
    obj[selKey] = this.state.selectedValue
    this.props.module.collection.update(this.props.item._id, {"$set": obj})

    console.log('call super : ' + this.props.afterUpdateValue)
    this.props.afterUpdateValue(this.state.selectedKey, this.state.selectedValue);
  },

  addMode() {
    this.setState({selectedKey: null})
  },

  renderKeys() {
    let hideSectionMap = {}
    try {
      this.props.item['1_report_sections'].items.map( item => {
        console.log('item.key,hide: ' + item.key + ',' + !item.show);
        hideSectionMap[item.key] = !item.show;
      })
    } catch(e) {
      console.log('e.stack: ' + e.stack);
    }
    const keys = Object.keys(this.props.item);
    console.log('renderKeys keys: ' + keys);
    return keys.sort().map((it, i) => {
      console.log('it.sectionKey: ' + it.sectionKey);
      if (!hideSectionMap[this.props.item[it].sectionKey]) {
        return <div key={i}>
          <a href='#' onClick={this.changeKey.bind(this,it)}>{it}</a>
        </div>
      }
    });
  },

  renderKeyEditor() {
    if (this.props.editConfigMode) {
      if (this.state.selectedKey) {
        return <div>
          <input type="text" valueLink={this.linkState('selectedKey')}/>
          <button onClick={this.updateKey}>Update Key</button>
          <button onClick={this.deleteKey}>Delete Key</button>
        </div>
      }
      else {
        return <div>
          <input type="text" valueLink={this.linkState('newKey')}/>
          <button onClick={this.insertKey}>Insert Key</button>
        </div>
      }
    }
  },

  renderValueEditor() {
    if (this.state.selectedKey) {
      let defaultValueEditor;
      if (!this.props.children) {
        defaultValueEditor = <div>
          <textarea rows='25' cols='100'
                valueLink={this.linkState('selectedValue')}/>
          <button onClick={this.updateValue}>Update Value</button>
        </div>
      }

      return <div className='row'>
        {this.props.children}
        {defaultValueEditor}
      </div>
    }
  },

  render() {

    let addKeyUtils
    if (this.props.editConfigMode) {
      addKeyUtils = <div>
        <button onClick={this.addMode}>Add Key</button>
      </div>
    }

      //console.log('this.state: ' + JSON.stringify(this.state));
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='reportSections orange'>
              {this.renderKeys()}
              {addKeyUtils}
            </div>
          </div>
          <div className='col-xs-9'>
            {this.renderKeyEditor()}
            {this.renderValueEditor()}
          </div>
        </div>
      </div>
    );
  }

})