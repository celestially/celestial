FieldEditor = React.createClass({

  getInitialState: function () {
    //console.log('FieldEditorWrapper initialState: ' );
    //return {editing: false};
    return {editing: true};
  },

  startEdit(e) {
    //console.log('startEdit: ');
    this.setState({editing: true})
  },

  save: function (e) {
    if (e.keyCode == 13) {
      celestial.updateItem(this.props, 'name', e.target.value);
      //this.setState({editing: false})
    }
  },

  save2: function (e) {
    celestial.updateItem(this.props, 'name', e.target.value);
  },

  edit(e) {
    //console.log('editFieldName2: ');
    this.setState({value: e.target.value})
  },

  render() {
    return this.props.editMode ?
      <input type='text'
             onKeyDown={this.save}
             onChange={this.edit}
             onBlur={this.save2}
             ref="fieldName"
             defaultValue={this.props.item.name}/>
      :
      <span>{this.props.item.name}</span>
  }
});

FieldEditorWrapper = function (Component) {
  return React.createClass({

    render() {
      //console.log('editFieldName render: ');
      return <tr>
        <td style={{verticalAlign: 'top', background: 'orange'}}>
          <FieldEditor {...this.props} />
        </td>
        <td>
          <Component {...this.props} />
        </td>
      </tr>
    },

  })
};





