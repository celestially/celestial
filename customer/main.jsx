Customers = new Mongo.Collection('customers');

const customerModule = {
  name: 'customer',
  collection: Customers,
  layout: Layout,
  routes: [
  {
    path: '/:id/main',
    name: 'main',
    content: CustomerMain
  }
]
};

Reaktor.init(
  <Router>

    {celestial.createRoutes(customerModule)}

    <Route path="/customer"
           layout={Layout}
           content={celestial.getListComponent(customerModule)} />
  </Router>);

