celestial.ItemWrapper = function (Component, section, module, docKey, route) {

  const collection = module.context? module.context : module.collection;

  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      let item = collection.findOne({_id: this.props.params.id});
      //item.updateItem = function(op, key, value) {
      //  let obj = {}
      //  //const dotKey = `${dotKey}.${key}`;
      //  console.log(`ItemWrapper.updateItem: ${key},${value},${this.props._id}`);
      //  obj[key] = value
      //  collection.update(this.data.item._id, {op: obj})
      //}
      return {
        item: item
      };
    },

    //this doesn't work, why?
    updateItem(op, key, value) {
      let obj = {}
      //const dotKey = `${dotKey}.${key}`;
      console.log(`ItemWrapper.updateItem: ${key},${value},${this.props._id}`);
      obj[key] = value
      collection.update(this.data.item._id, {op: obj})
    },

  render() {
      if (!this.data.item) {
        return <div>404: Not found</div>;
      }

      let item =
        //module.context? this.data.item[module.name] :
          docKey? this.data.item[docKey] : this.data.item;
      let dotKey =
        //module.context? module.name :
        docKey? docKey : '';

      //let item = this.data.item;
      //let dotKey = docKey? docKey : '';

      if (!item) {
        if (docKey) {
          //create path for this key
          console.log(`ItemWrapper create path for item key: ${dotKey},${this.data.item._id}`);
          let obj = {};
          obj[dotKey] = {};
          module.collection.update(this.data.item._id, {"$set": obj})
        }
        //else {
          return <div>Key not found</div>;
        //}
      }

      //console.log('ItemWrapper item: ' + Object.keys(item));
      //console.log('ItemWrapper dotKey: ' + dotKey);
      return <div>
        {!route.hideNav && celestial.getNavItems(section, module, this.data.item._id, this.data.item)}

        <Component item={item}
                   collection={collection}
                   _id={this.data.item._id}
                   module={module}
                   updateItem={this.updateItem}
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
