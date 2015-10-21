var rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
}

AuditTable = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      items: Audits.find().fetch()
    };
  },

  newAudit() {
    Audits.insert({name: "New Audit"});
  },

  editAudit() {
  },

  renderTable() {
    console.log('rows.length: ' + rows.length);
    return <Table
      rowHeight={50}
      rowGetter={rowGetter}
      rowsCount={rows.length}
      width={5000}
      height={5000}
      headerHeight={50}>
      <Column
        label="Col 1"
        width={300}
        dataKey={0}
      />
      <Column
        label="Col 2"
        width={200}
        dataKey={1}
      />
    </Table>
  },

  render() {

    return <div>
      {this.renderTable()}
    </div>
  }
});


