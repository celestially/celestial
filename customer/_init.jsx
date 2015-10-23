Customers = new Mongo.Collection('customers');

CustomerLayout = React.createClass({
  render() {
    return (
      <div>
        <TopNav/>
        {this.props.content}
      </div>
    );
  }
});

CustomerModule = {
  singularName: 'customer',
  pluralName: 'customers',
  collection: Customers,
  layout: CustomerLayout
}

