CheckboxInput = React.createClass({
  setChecked(e) {
    celestial.updateItem(this.props, 'value', e.target.checked);
  },
  render() {
    return <input
      type='checkbox'
      onChange={this.setChecked}
      checked={this.props.item.value}/>
  }
})