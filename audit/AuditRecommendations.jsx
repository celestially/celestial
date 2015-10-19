AuditRecommendations = React.createClass({
  render() {
    return <AuditRecommendationsImpl sections={ReportSections} {...this.props} />
  }
});

AuditRecommendationsImpl = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {section: 'attic'}
  },

  getMeteorData() {
    console.log('id: ' + this.props.params.slug)
    return {
      //item: Audits.findOne({ _id: this.props.params.slug })
      item: Audits.findOne()
    };
  },

  handleRecChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value, ', ' + e.target.checked);
    let obj = {}
    let key = replaceAll(e.target.name, '\\.', '')
    obj['report.' + this.state.section + '.recs.' + key + '.display'] = e.target.checked
    Audits.update(this.data.item._id, {"$set" : obj})
  },

  changeSection(name) {
    console.log('go to name: ' + name);
    this.setState({section: name})
  },

  render() {
    const sectionKeys = Object.keys(this.props.sections);
    let section = this.state.section;
    let recs = this.props.sections[section].recs;
    let recsData;
    try {
      recsData= this.data.item.report[section].recs || {};
    } catch(e) {
      recsData = {}
    }
    Object.keys(recsData).map( it => {
      console.log(it + ': ' + recsData[it].display);
    })

    //console.log('sectionKeys: ' + JSON.stringify(sectionKeys));
    //console.log('state: ' + JSON.stringify(this.state));
    //console.log('test item: ' + recs[0]);

    return (
      <div className='row'>
        <div className='col-xs-3'>
          <div className='reportSections orange'>
            { sectionKeys.map((it, i) => {
              return <div key={i}>
                <input type='checkbox'></input>
                <a href='#' onClick={this.changeSection.bind(this,it)}>{it}</a>
              </div>
            })}
          </div>
        </div>
        <div className='col-xs-9'>
          <h3>{section}</h3>

          {recs.map((it, i) => {
            return <div key={i}>
              <input name={it} type='checkbox' onChange={this.handleRecChange} checked={recsData[it] && recsData[it].display}></input> {it}
            </div>
          })}
        </div>
      </div>
    );
  }
});

