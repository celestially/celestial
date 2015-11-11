CheckboxInput = React.createClass({
  setChecked(e) {
    Celestial.updateItem(this.props, this.props.field ? this.props.field : 'value',
      e.target.checked);
  },
  render() {
    const defaultValue = this.props.value ? this.props.value :
      this.props.field ? this.props.item[this.props.field] : this.props.item.value;
    return <input
      type='checkbox'
      onChange={this.setChecked}
      checked={defaultValue}/>
  }
})