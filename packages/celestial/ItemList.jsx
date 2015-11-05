ItemList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: this.props.module.collection.find().fetch()
    };
  },

  newItem() {
    if (this.props.module.itemFactory) {
      this.props.module.itemFactory();
    } else {
      this.props.module.collection.insert({name: "New Item"});
    }
  },

  deleteItem(e) {
    if (confirm("Are you sure?")) {
      console.log('delete: ' + e.target.value);
      this.props.module.collection.remove(e.target.value);
    }
  },

  renderAddCustom() {
    const AddCustom = React.createClass({
      newCustomItem() {
        console.log('AddCustom newCustomItem: ');
        this.props.module.collection.insert(JSON.parse(this.state.value));
      },
      edit(e) {
        console.log('AddCustom edit: ');
        this.setState({value: e.target.value})
      },
      render() {
        console.log('AddCustom render: ');
        return <div>
          New Doc:
          <textarea
                 onChange={this.edit}
          />
          <button onClick={this.newCustomItem}>Create</button>
        </div>
      }
    })
    const MyModal = ModalWrapper(AddCustom);
    return <MyModal {...this.props} name='AddCustom' label='AddCustom'/>
  },

  render() {
    var items = this.data.items.map(i => {
      console.log('ItemList render: ' + Object.keys(i));
      return <li className="list-group-item">
        <div>
          <a href={'/'+this.props.module.name+'/' + i._id + '/main'}
             className="tooltip"
          >
            {i.name}
          </a>
          <div className="right grayedSmall">{i._id}
            <button value={i._id} onClick={this.deleteItem}>Delete</button>
          </div>
        </div>
      </li>
    })

    return <div>
      <h3>{this.data.items.length} {this.props.module.name}s found
      </h3>
      <input type='button' onClick={this.newItem}
             value={'Create new ' + this.props.module.name}/>
      {this.renderAddCustom()}
      <ul className="list">
        {items}
      </ul>
      {this.props.children}
    </div>
  }
});


