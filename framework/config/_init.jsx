//TODO: this module doesn't work yet

Schemas = new Mongo.Collection('schema');

//<NavLink href="/schema/:id/ConfigEditor"
//         label='New Key' {...this.props} />

SchemaLayout = React.createClass({
  render() {
    return (
      <div>
        <TopNav/>
        {this.props.content}
      </div>
    );
  }
});

SchemaSchema = {
  name: 'Schema',
  pluralName: 'Schemas',
  collection: Schemas,
  layout: SchemaLayout
}

