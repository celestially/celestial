celestial.ItemWrapper = function (Component, section, module) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      return {
        item: module.collection.findOne({_id: this.props.params.id})
      };
    },

    render() {
      if (!this.data.item) {
        return <div>404: Not found</div>;
      }
      return <div>
        {celestial.getNavItems('', section, module, module.routes, this.data.item)}

        <Component item={this.data.item} collection={module.collection} module={module} {...this.props} />
      </div>
    }
  })
};

celestial.getListComponent = function(module) {
  return React.createClass({
    render() {
      //console.log('getListComponent: ' + JSON.stringify(module.collection));
      //console.log('Customers: ' + Customers);
      return <ItemList module={module} />
    }
  })
}
