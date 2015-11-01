TextInput = React.createClass({
  onKeyDown: function(e){
    if(e.keyCode == 13){
      this.save();
      //this.setState({editing: false})
    }
  },
  save: function(e){
      celestial.updateItem(this.props, 'value', e.target.value);
  },
  edit(e) {
    console.log('TextInput: ' );
    this.setState({value: e.target.value})
  },
  render() {
    console.log('TextInput: ' + this.props.item.value);
    return <input type='text'
                  onChange={this.edit}
                  onBlur={this.save}
                  defaultValue={this.props.item.value} />
  }
})
