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
    return <input type='text'
                  onKeyDown={this.save}
                  onChange={this.edit}
                  defaultValue={this.props.item.value} />
  }
})
