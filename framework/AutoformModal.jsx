AutoformModal = React.createClass({
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

  onEditItemParams(e) {
    let obj = {};
    console.log('onEditItemParams e.target.name: ' + e.target.name);
    const arrKey = e.target.name.split('_')[1];
    const dotKey = `report.${this.props.selKey}.items.${arrKey}.params`;
    console.log('onEditItemParams dotKey: ' + dotKey + ', ' + this.props.id);
    obj[dotKey] = e.target.value;
    this.setState({
      param_obj: obj,
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
    if (this.state.param_obj) {
      console.log('save: ' + JSON.stringify(this.state.param_obj));
      this.props.module.collection.update(this.props.id, {"$set": this.state.param_obj})
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
            <input type="text"
                   name={'params' + this.props.name}
                   defaultValue={this.props.params}
                   onChange={this.onEditItemParams}
            />
          </div>
        </div>
      </div>
    );
  }
})