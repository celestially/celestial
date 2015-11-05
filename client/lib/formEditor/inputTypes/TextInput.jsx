TextInput = React.createClass({
  onKeyDown: function(e){
    if(e.keyCode == 13){
      this.save();
      //this.setState({editing: false})
    }
  },
  //componentDidMount: function(){
  //  React.findDOMNode(this.refs.fieldName).select();
  //},
  save: function(e){
      celestial.updateItem(this.props,
        this.props.field ? this.props.field : 'value',
        e.target.value);
  },
  edit(e) {
    console.log('TextInput: ' );
    this.setState({value: e.target.value})
  },
  render() {
    console.log('TextInput: ' + this.props.item.value);
    return !this.props.allowLink ?
      <input type='text'
                  onChange={this.edit}
                  onBlur={this.save}
                  defaultValue={this.props.value ? this.props.value : this.props.item.value} />
      : <div>
      <input type='text'
             onChange={this.edit}
             onBlur={this.save}
             defaultValue={this.props.value ? this.props.value : this.props.item.value} />
      <input type="checkbox"
             onChange={this.unlink} />
      custom
      </div>
  }
})
