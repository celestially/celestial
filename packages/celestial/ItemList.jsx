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
    //if (confirm("Are you sure?")) {
      console.log('delete: ' + e.target.value);
      this.props.module.collection.remove(e.target.value);
    //}
  },

  render() {
    var items = this.data.items.map(i => {
      return <li className="list-group-item">
          <div>
        <a href={'/'+this.props.module.name+'/' + i._id + '/main'}
      className="tooltip"
        >
            {i.name}
        </a>
            <div className="right grayed">{i._id}</div>
            <button value={i._id} onClick={this.deleteItem}>Delete</button>
            <a href="#" onClick={this.deleteItem}>[X]</a>
          </div>
      </li>
    })

    return <div>
      <h3>{this.data.items.length} Items found</h3>
      <input type='button'
             onClick={this.newItem}
             value='Create New Item'/>
      <hr />
      <ul className="list">
        {items}
      </ul>
      {this.props.children}
    </div>
  }
});


