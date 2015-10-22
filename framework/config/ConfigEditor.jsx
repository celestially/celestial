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
      newKey: name,
      oldKey: name,
    })
  },

  insertKey() {
    console.log('insertKey: ' + this.state.newKey);
    let obj = {}
    obj[this.state.newKey] = ''
    Schemas.update(this.props.item._id, {"$set": obj})
    changeKey(this.state.newKey)
  },

  updateKey() {
    console.log('updateKey: ' + this.state.selectedKey);
    let obj = {}
    obj[this.state.selectedKey] = this.state.newKey
    Schemas.update(this.props.item._id, {"$rename": obj})
    changeKey(this.state.newKey)
  },

  updateExp() {
    console.log('updateExp: ' + this.state.updateExp);
    Schemas.update(this.props.item._id, eval(this.state.updateExp))
  },

  deleteKey() {
    console.log('deleteKey: ' + this.state.selectedKey);
    let obj = {}
    obj[this.state.selectedKey] = ''
    Schemas.update(this.props.item._id, {"$unset": obj})
  },

  addMode() {
    this.setState({selectedKey: null})
  },

  renderKeys() {
    const keys = Object.keys(this.props.item);
    return keys.map((it, i) => {
      return <div key={i}>
        <a href='#' onClick={this.changeKey.bind(this,it)}>{it}</a>
      </div>
    });
  },

  renderMain() {
    if (this.props.selectedKey) {
      return <div>
        <div className='row'>
          <input type="text" valueLink={this.linkState('newKey')}/>
          <button onClick={this.updateKey}>Update Key</button>
          <button onClick={this.deleteKey}>Delete Key</button>
        </div>
      </div>
    }
    else {
      return <div>
        <div>
          <input type="text" valueLink={this.linkState('newKey')}/>
          <button onClick={this.insertKey}>Insert Key</button>
        </div>
      </div>
    }
  },

  //<div>
  //  <input type="text" valueLink={this.linkState('updateExp')}/>
  //  <button onClick={this.updateExp}>Update Expression</button>
  //</div>


  render() {
    //console.log('this.state: ' + JSON.stringify(this.state));
    const itemKeys = Object.keys(this.props.item)
    console.log('this.props.item: ' + itemKeys);
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='pad-cell orange'>
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
            <ReportConfigEditor selectedKey={this.state.selectedKey} {...this.props} />
          </div>
        </div>
      </div>
    );
  }

})