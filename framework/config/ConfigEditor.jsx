var LinkedStateMixin = React.addons.LinkedStateMixin;

ConfigEditor = React.createClass({
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
  },

  insertKey() {
    console.log('insertKey: ' + this.state.newKey);
    let obj = {}
    obj[this.state.newKey] = ''
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
    console.log('deleteKey: ' + this.state.selectedKey);
    let obj = {}
    obj[this.state.selectedKey] = ''
    this.props.module.collection.update(this.props.item._id, {"$unset": obj})
  },

  updateValue() {
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
    const keys = Object.keys(this.props.item);
    return keys.sort().map((it, i) => {
      return <div key={i}>
        <a href='#' onClick={this.changeKey.bind(this,it)}>{it}</a>
      </div>
    });
  },

  renderMain() {
    if (this.state.selectedKey) {
      return <div>
        <div className='row'>
          <input type="text" valueLink={this.linkState('selectedKey')}/>
          <button onClick={this.updateKey}>Update Key</button>
          <button onClick={this.deleteKey}>Delete Key</button>
        </div>
        <div className='row'>
          <textarea rows='25' cols='100'
                    valueLink={this.linkState('selectedValue')}/>
          <button onClick={this.updateValue}>Update Value</button>
        </div>
      </div>
    }
    else {
      return <div>
        <input type="text" valueLink={this.linkState('newKey')}/>
        <button onClick={this.insertKey}>Insert Key</button>
      </div>
    }
  },

  render() {
    //console.log('this.state: ' + JSON.stringify(this.state));
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='reportSections orange'>
              {this.renderKeys()}
              <button onClick={this.addMode}>Add Key</button>

              <SimpleModal name='Structure' label='Structure'
                           value={JSON.stringify(this.props.item, null, 4)} />
              <SimpleModal name='Result' label='Result'
                           value={JSON.stringify(this.props.item._result, null, 4)} />

            </div>
          </div>
          <div className='col-xs-9'>
            {this.renderMain()}
          </div>
        </div>
      </div>
    );
  }

})