ItemList = React.createClass({
  mixins: [ReactMeteorData, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
    };
  },

  getMeteorData() {
    return {
      items: this.props.module.collection.find({}, {sort: {createdAt: -1}}).fetch()
    };
  },

  newItem() {
    if (this.props.module.itemFactory) {
      this.props.module.itemFactory();
    } else if (this.props.module.schemas) {
      Meteor.call('newItemFromSchema', this.props.module.name, function (error) {
        if (error) {
          throw(error);
        }
      })
    }
    else {
      this.props.module.collection.insert({name: "New Item"});
    }
  },

  addItem(e) {
    if (this.props.module.schemas) {
      Meteor.call('newItemFromSchema', this.props.module.name, this.state.newItemName, function (error) {
        if (error) {
          throw(error.reason);
        }
      })
    }
    else {
      let obj = {
        name: this.state.newItemName,
        createdAt: new Date(),
      }
      if (this.props.module.newItemTemplate) {
        _.extend(obj, this.props.module.newItemTemplate)
        console.log('obj extended: ' + obj);
      }
      this.props.module.collection.insert(obj);
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
                 defaultValue='{"name": "Untitled"}'
          />
          <button onClick={this.newCustomItem}>Create</button>
        </div>
      }
    })
    const MyModal = ModalWrapper(AddCustom);
    return <MyModal {...this.props} name='AddCustom' label='AddCustom'/>
  },

  renderListItem(item) {
    //console.log('ListItemComp: ' + ListItemComp);
    if (this.props.module.schemas) {
      const s = this.props.module.schemas[0]
      const title = item[s][0].value
      return title ? title : "No title"
    } else {
        return item.name
    }
  },

  render() {
    //render add box
    const addItem = <li className="list-group-item">
      <div>
        <input type='text'
               valueLink={this.linkState('newItemName')}
        />
        </div>
      <button onClick={this.addItem}>Add</button>
      </li>
    //render items
    const items = this.data.items.map(i => {
      console.log('ItemList render: ' + Object.keys(i));
      return <li className="list-group-item">
        <div>
          <a href={'/'+this.props.module.name+'/' + i._id + '/main'}
             className="tooltip"
          >
            {this.renderListItem(i)}
          </a>
          <div className="right grayedSmall">{i._id}
            <button value={i._id} onClick={this.deleteItem}>Delete</button>
          </div>
        </div>
      </li>
    })

    return <div>
      {this.props.renderNav && Celestial.getNavItems(this.props.module.listRoute, this.props.module, null, null)}
      <h3>{this.data.items.length} {this.props.module.pluralName} found
      </h3>
      <ul className="list">
        {addItem}
        {items}
      </ul>
    </div>
  }
});

//<input type='button' onClick={this.newItem}
//       value={'Create new ' + this.props.module.singularName}/>
//{this.renderAddCustom()}


