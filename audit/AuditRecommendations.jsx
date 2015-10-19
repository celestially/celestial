AuditRecommendations = React.createClass({

  getInitialState() {
    return { section: 'attic' }
  },

  changeSection(name) {
    console.log('go to name: ' + name);
    this.setState({ section: name })
  },

  render() {
    const sectionKeys = Object.keys(ReportSections);
    let section = this.state.section;

    console.log('sectionKeys: ' + JSON.stringify(sectionKeys));
    console.log('state: ' + JSON.stringify(this.state));

      return (

      <div className='row'>
        <div className='col-xs-3'>
          <div className='reportSections orange'>
            { sectionKeys.map( (it, i) => {
              return <div key={i}>
                <input type='checkbox'></input>
                <a href='#' onClick={this.changeSection.bind(this,it)}>{it}</a>
              </div>
            })}
          </div>
        </div>
        <div className='col-xs-9'>
          { ReportSections[section].recs.map( (it, i) => {
            return <div key={i}>
              <input type='checkbox'>{it}</input>
            </div>
          })}

          section: {section}
        </div>

      </div>
    );
  }
});

