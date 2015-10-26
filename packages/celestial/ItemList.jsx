ItemList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: this.props.module.collection.find().fetch()
    };
  },

  newItem() {
    this.props.module.collection.insert({name: "New Item"});
  },

  render() {
    var items = this.data.items.map(i => {
      return <li className="list-group-item">
        <a href={'/'+this.props.module.name+'/' + i._id + '/main'}
           className="tooltip"
        >
          <div>
          {i.name}
          <div className="right grayed">{i._id}</div>
            </div>
        </a>
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


