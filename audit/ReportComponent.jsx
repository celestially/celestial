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
    return (
      <div>
        <h2>Report Preview</h2>
        For: {this.props.item.name}
        For: {this.props.item.address}
        For: {this.props.item.phone}
        {this.props.content}
      </div>
    );
  },

  renderSections() {
    return ReportSchema.map((section) => {
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
        {renderHeading()}
        {renderSections()}
      </div>
    );
  }
});

