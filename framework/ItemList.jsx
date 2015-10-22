ItemList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: this.props.Collection.find().fetch()
    };
  },

  newItem() {
    this.props.Collection.insert({name: "New Item"});
  },

  render() {
    var items = this.data.items.map(i => {
      return <li className="list-group-item">
        <a href={'/'+this.props.module+'/' + i._id + '/main'}
           className="tooltip"
        >
          <div>
          {i.name}
          <div className="right grayed">{i._id}</div>
            </div>
        </a>
      </li>
    })

    console.log('this.props.params: ' + JSON.stringify(this.props.params));

    return <div>
      <h3>{this.data.items.length} Items found</h3>
      <input type='button'
             onClick={this.newItem}
             value='Create New Item'/>
      <hr />
      <ul className="list">
        {items}
      </ul>
    </div>
  }
});


