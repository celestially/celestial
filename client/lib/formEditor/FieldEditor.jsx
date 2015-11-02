FieldEditorWrapper = function (Component) {
  return React.createClass({

    getInitialState: function () {
      //console.log('FieldEditorWrapper initialState: ' );
      //return {editing: false};
      return {editing: true};
    },

    //componentDidMount: function(){
    //  if (this.state.editing = true) {
    //    //this.refs.nameInput.getDOMNode().focus();
    //    React.findDOMNode(this.refs.fieldName).select();
    //  }
    //},

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
      //console.log('editFieldName render: ');
      return <tr>
        <td style={{verticalAlign: 'top', background: 'orange'}}>
          { this.state.editing ?
          <input type='text'
                 onKeyDown={this.save}
                 onChange={this.edit}
                 onBlur={this.save2}
                 ref="fieldName"
                 defaultValue={this.props.item.name}/>
          :
          <span onClick={this.startEdit} >
            {this.props.item.name}
          </span>}

        </td>
        <td>
          <Component {...this.props} />
        </td>
      </tr>
    },

    //renderV() {
    //  console.log('TODO: editFieldName render vertical: ');
    //  return <tr>
    //    <td>
    //      { this.state.editing ?
    //      <input type='text' onKeyDown={this.add} onChange={this.edit}/> :
    //      <span onClick={this.startEdit}>
    //        {this.props.item.name}
    //      </span>}
    //    </td>
    //    <td>
    //      <Component {...this.props} />
    //    </td>
    //  </tr>
    //},
    //
    //render() {
    //  return this.props.renderVertical ? this.renderV() : this.renderH();
    //}

  })
};





