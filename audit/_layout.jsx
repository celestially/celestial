Audits = new Mongo.Collection('audit');

Layout2 = React.createClass({
  render() {
    return (
      <div>
        <TopNav/>
        {this.props.content}
      </div>
    );
  }
});

AuditSchema = {
  singularName: 'Audit',
  pluralName: 'Audits',
  collection: Audits,
  layout: Layout2
}

