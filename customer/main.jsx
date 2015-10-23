withCustomer = function (Component, section) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      return {
        item: Customers.findOne({_id: this.props.params.id})
      };
    },

    render() {
      if (!this.data.item) {
        return <div>404: Not found</div>;
      }
      return <div>
        {getNavItems('', section, CustomerModule, objs, this.data.item)}

        <Component item={this.data.item} collection={Customers} {...this.props} />
      </div>
    }
  })
};

custList = function() {
  return React.createClass({
    render() {
      console.log('renderList: ');
      console.log('Customers: ' + Customers);
      return <ItemList Collection={Customers} module="customer" />
    }
  })
}

const customerItemRoutes = [
  ['path', 'name', 'content', 'label'],
  ['/:id/main', 'main', CustomerMain],
];

//const findOneCustomerWrapper = createFindOneItemWrapper(CustomerModule);
//const routes = createRoutes(customerItemRoutes, CustomerModule, findOneCustomerWrapper);

const objs = convertToArrayOfObjects(customerItemRoutes);

const routes = objs.map(route => {
  console.log('customer route: ' + JSON.stringify(route));
  return <Route path={'/customer' + route.path}
                layout={CustomerLayout}
                content={withCustomer(route.content, route.name)}
  />
})

Reaktor.init(
  <Router>
    {routes}
    <Route path="/customer" layout={CustomerLayout} content={custList()} />
  </Router>);

