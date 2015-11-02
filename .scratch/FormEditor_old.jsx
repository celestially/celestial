FormEditor = React.createClass({

  getInitialState: function () {
    return {};
  },

  addField(blockType) {
    //!this.props.item.blocks && this.createBlocksKey();
    let obj = {}
    const dotKey = `${this.props.dotKey}.value`;
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
  clear() {
    let obj = {}
    const dotKey = `${this.props.dotKey}.value`;
    console.log(`clear: ${dotKey},${this.props._id}`);
    obj[dotKey] = ''
    this.props.collection.update(this.props._id, {"$unset": obj})
  },

  renderField(field, i, Component) {
    const Comp = FieldEditorWrapper(Component);
    return <Comp {...this.props} item={field} dotKey={this.props.dotKey + '.value.' + i} />
  },

  renderCollectionField(field, i, asObject) {
    //console.log('FormEditor renderArrayField: ' + JSON.stringify(field));
    const Comp = FieldEditorWrapper(FormEditor);
    return <Comp {...this.props} item={field}
                                 dotKey={this.props.dotKey + '.value.' + i}
                                 asObject={asObject}
    />
  },

  renderArray() {
    return keys.map( (name, i) => {
        const field = this.props.item.value[i];
        console.log('FormEditor render field: ' + JSON.stringify(field));
        {return field.type == 'string' ? this.renderField(field, i, TextInput) :
          field.type == 'boolean' ? this.renderCheck(field, i, CheckboxInput) :
            field.type == 'array' ? this.renderCollectionField(field, i, false) :
              //field.type == 'object' ? this.renderObjectField(field, i) :
              <span>Unknown type</span>
        }
      }
    )
  },

  renderValue() {
    keys = this.props.item && this.props.item.value && Object.keys( this.props.item.value)
    if (!keys) {
      return <div>No keys found</div>
    }
    return <table border="1"><tbody>
    {this.renderArray()}
    </tbody></table>
  },

  render() {
    console.log('FormEditor render item: ' + JSON.stringify(this.props.item));
    return <div className='green'>
      <h3>Form Editor</h3>
      {this.renderValue()}
      <button onClick={this.addText}>Add Text</button>
      <button onClick={this.addCheckbox}>Add Checkbox</button>
      <button onClick={this.addForm}>Add Form</button>
      <button onClick={this.clear}>Clear</button>

      <SimpleModal name='JSON' label='JSON View'
                   value={JSON.stringify(this.props.item, null, 4)}/>
    </div>
  }
});





