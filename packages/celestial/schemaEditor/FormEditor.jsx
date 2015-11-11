FormEditor = React.createClass({

  getInitialState: function () {
    return {};
  },

  addField(blockType) {
    //!this.props.item.blocks && this.createBlocksKey();
    let obj = {}
    const dotKey = this.props.dotKey ? `${this.props.dotKey}.value` : 'value'
    console.log(`addField: ${dotKey},${this.props._id}`);
    obj[dotKey] = {}
    obj[dotKey].type = blockType;
    obj[dotKey].name = 'New field';
    console.log(`addField obj2: ${JSON.stringify(obj)}`);
    this.props.collection.update(this.props._id, {"$push": obj})
  },

  addText() {
    this.addField('string')
  },
  addCheckbox() {
    this.addField('boolean')
  },
  addForm() {
    this.addField('array')
  },
  addCollection() {
    this.addField('collection')
  },
  clear() {
    let obj = {}
    const dotKey = `${this.props.dotKey}.value`;
    console.log(`clear: ${dotKey},${this.props._id}`);
    obj[dotKey] = ''
    this.props.collection.update(this.props._id, {"$unset": obj})
  },

  renderField(field, i, Component) {
    const Comp = FieldEditorWrapper(Component);
    return <Comp {...this.props} item={field} dotKey={this.props.dotKey + '.value.' + i}/>
  },

  renderForm(field, i, asObject) {
    //console.log('FormEditor renderArrayField: ' + JSON.stringify(field));
    const Comp = FieldEditorWrapper(FormEditor);
    return <Comp {...this.props} item={field}
                                 dotKey={this.props.dotKey + '.value.' + i}
                                 asObject={asObject}
    />
  },

  renderCollection(field, i, asObject) {
    //console.log('FormEditor renderArrayField: ' + JSON.stringify(field));
    const Comp = FieldEditorWrapper(CollectionEditor);
    return <Comp {...this.props} item={field}
                                 dotKey={this.props.dotKey + '.value.' + i}
    />
  },

  renderKeys(keys) {
    console.log('FormEditor renderArray: ' + JSON.stringify(keys));
    return keys.map((name, i) => {
        const field = this.props.item.value[i];
        console.log('FormEditor field: ' + JSON.stringify(field));
        {
          return field.type == 'string' ? this.renderField(field, i, TextInput) :
            field.type == 'boolean' ? this.renderField(field, i, CheckboxInput) :
              field.type == 'array' ? this.renderForm(field, i, false) :
                field.type == 'collection' ? this.renderCollection(field, i, false) :
                  <span>Unknown type</span>
        }
      }
    )
  },

  renderValue() {
    let keys = this.props.item &&
      this.props.item.value &&
      Object.keys(this.props.item.value)
    if (!keys) {
      return <div>No keys found</div>
    }
    return <table border="1">
      <tbody>
      {this.renderKeys(keys)}
      </tbody>
    </table>
  },

  render() {
    console.log('FormEditor render: ' + JSON.stringify(this.props.item));
    return <div>
      {this.renderValue()}
      { !this.props.schemaLocked && <div>
        <button onClick={this.addText}>Add Text</button>
        <button onClick={this.addCheckbox}>Add Checkbox</button>
        <button onClick={this.addForm}>Add Form</button>
        <button onClick={this.addCollection}>Add Collection</button>
        <button onClick={this.clear}>Clear</button>

        <SimpleModal name='JSON' label='JSON View'
                     value={JSON.stringify(this.props.item, null, 4)}/>
      </div>}
    </div>
  }
});





