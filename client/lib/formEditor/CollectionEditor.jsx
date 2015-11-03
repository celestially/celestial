//CollectionEditor = function (Component) {
CollectionEditor = React.createClass({

  renderEditFields() {
    const MyModal = ModalWrapper(FormEditor);
    return <MyModal {...this.props} name={'EF' + this.props.dotKey}
                                    label='Edit Fields'
                                    item={this.props.item.fields}
                                    dotKey={this.props.dotKey + '.fields'}
    />
  },

  addItem() {
    //!this.props.item.blocks && this.createBlocksKey();
    let obj = {}
    const dotKey = this.props.dotKey ? `${this.props.dotKey}.items` : 'items'
    console.log(`addItem: ${dotKey},${this.props._id}`);
    obj[dotKey] = {}
    //obj[dotKey].value = 'new';
    console.log(`addItem obj2: ${JSON.stringify(obj)}`);
    this.props.collection.update(this.props._id, {"$push": obj})
  },

  renderField(field, item, i, Component) {
    return <td>
      <Component {...this.props} item={item} field={field} dotKey={this.props.dotKey + '.items.' + i}/>
    </td>
  },

  render() {
    //console.log('editFieldName render: ');
    const fields = this.props.item.fields && this.props.item.fields.value;
    return <div>
      { !fields ? <div>No fields</div>
        : <table>
          <tbody>
          <th>
            {this.props.item.fields && this.props.item.fields.value.map( field => {
              return <td>Field: {field.name}</td>}
              )}
          </th>
          {this.props.item.items && this.props.item.items.map( (item, i) => {
            return <tr key={i}>
              {fields.map( (field) => {
                return field.type == 'string' ? this.renderField(field.name, item, i, TextInput) :
                  field.type == 'boolean' ? this.renderField(field.name, item, i, CheckboxInput) :
                  <td>Unknown type</td>
                })}
            </tr>}
            )}
          </tbody>
        </table>}
        <button onClick={this.addItem}>Add row</button>
        <td>{this.renderEditFields()}</td>
    </div>
  },

})
//};





