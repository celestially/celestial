celestial.ItemWrapper = function (Component, section, module, docKey) {

  let collection = module.context? module.context : module.collection;

  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      return {
        item: collection.findOne({_id: this.props.params.id})
      };
    },

    render() {
      if (!this.data.item) {
        return <div>404: Not found</div>;
      }

      let item = module.context? this.data.item[module.name]
        : docKey? this.data.item[docKey] : this.data.item;
      let dotKey = module.context? module.name
        : docKey? docKey : '';
      if (!item) {
        return <div>Key not found</div>;
      }

      console.log('ItemWrapper item: ' + Object.keys(item));
      console.log('ItemWrapper dotKey: ' + dotKey);
      return <div>
        {celestial.getNavItems(section, module, this.data.item._id, this.data.item)}

        <Component item={item}
                   collection={collection}
                   _id={this.data.item._id}
                   module={module}
                   dotKey={dotKey} {...this.props} />
      </div>
    }
  })
};

celestial.getListComponent = function(module) {
  return React.createClass({
    render() {
      //console.log('getListComponent: ' + JSON.stringify(module.collection));
      //console.log('Customers: ' + Customers);
      return <ItemList module={module} itemFactory={module.itemFactory} />
    }
  })
}
