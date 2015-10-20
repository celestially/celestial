ReportSection = React.createClass({
  render() {
    return (
      <div>
        <h2>Report Preview</h2>
        {this.props.content}
      </div>
    );
  }
});

ReportComponent = React.createClass({

  renderHeading() {
    //console.log('this.props.item: ' + JSON.stringify(this.props.item));
    let custInfo = this.props.item['Customer Info']
    console.log('this.props.item: ' + JSON.stringify(this.props.item['Customer Info']));
    return (
      <div>
        <h2>Report Preview</h2>
        For: {custInfo.Name}
        For: {custInfo.address}
        For: {custInfo.phone}
        {this.props.content}
      </div>
    );
  },

  renderSections() {
    //console.log(': ' + );
    return ReportSchemaArray.map((section) => {
      console.log('section: ' + JSON.stringify(section));
      return(
        <div>
          <h3>{section.name}</h3>
          section body
        </div>
      )
    })
  },

  render() {
    return (
      <div>
        {this.renderHeading()}
        {this.renderSections()}
      </div>
    );
  }
});

