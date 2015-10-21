var LinkedStateMixin = React.addons.LinkedStateMixin;

NewSchemaKey = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      //key: 'Hello',
      //adding: true,
    };
  },

  changeKey(name) {
    console.log('go to name: ' + name);
    this.setState({selectedKey: name})
  },

  insertKey() {
    console.log('newKey: ' + this.state.newKey);
    let obj = {}
    obj[this.state.newKey] = 'test'
    Schemas.update(this.props.item._id, {"$set": obj})
  },

  updateValue() {
    console.log('selectedKey: ' + this.state.selectedKey);
    let obj = {}
    obj[this.state.selectedKey] = this.state.selectedValue
    Schemas.update(this.props.item._id, {"$set": obj})
  },

  convert() {

    const converted = this.state.selectedValue.split("\n");
    console.log('converted: ' + converted);
    this.setState({converted: converted})
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
    if (this.state.selectedKey) {
      return <div>
        <div className='row'>
        <input type="text" valueLink={this.linkState('selectedKey')}/>
        <button onClick={this.insertKey}>Update Key</button>
            </div>
        <div className='row'>
          <textarea valueLink={this.linkState('selectedValue')} />
          <button onClick={this.updateValue}>Update Value</button>
          </div>
        <div>
          <button onClick={this.convert}>Convert</button>
          <textarea valueLink={this.linkState('converted')} />
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
    console.log('this.state: ' + JSON.stringify(this.state));
    return (
      <div>
        <div className='row'>
          <div className='col-xs-3'>
            <div className='reportSections orange'>
              {this.renderKeys()}
              <button onClick={this.addMode}>Add Key</button>

              <a href="#openModal">Structure View</a>
              <div id="openModal" className="modalDialog">
                <div><a href="#close" title="Close" className="close">X</a>
                  <pre>{JSON.stringify(this.props.item, null, 4)}</pre>
                </div>
              </div>

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