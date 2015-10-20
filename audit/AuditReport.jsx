AuditReport = React.createClass({
  render() {
    return <AuditRecommendationsImpl sections={ReportSchema} {...this.props} />
  }
});

AuditRecommendationsImpl = React.createClass({

  getInitialState() {
    return {section: 'attic'}
  },

  changeSection(name) {
    console.log('go to name: ' + name);
    this.setState({section: name})
  },

  handleSectionChange(e) {
    //console.log('e: ' + JSON.stringify(e));
    //console.log('change: ' + e.target.name + ", " + e.target.value, ', ' + e.target.checked + ', ' + section);
    let obj = {}
    obj['report.' + this.state.section + '.display'] = e.target.checked
    Audits.update(this.props.item._id, {"$set" : obj})
  },

  handleRecChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value, ', ' + e.target.checked);
    let obj = {}
    let key = replaceAll(e.target.name, '\\.', '')
    obj['report.' + this.state.section + '.recs.' + key + '.display'] = e.target.checked
    Audits.update(this.props.item._id, {"$set" : obj})
  },

  renderSections(checkedData) {
    const sectionKeys = Object.keys(this.props.sections);
    //console.log('sectionKeys: ' + JSON.stringify(sectionKeys));
    //console.log('state: ' + JSON.stringify(this.state));

    return <div className='reportSections orange'>
      { sectionKeys.map((it, i) => {
        return <div key={i}>
          <input
            name={it}
            type='checkbox'
            disabled='true'
            checked={checkedData[it] && checkedData[it].display} />
          <a href='#' onClick={this.changeSection.bind(this,it)}>{it}</a>
        </div>
      })}
    </div>
  },

  render() {
    let section = this.state.section;
    let recs = this.props.sections[section].recs;
    let recsData;
    try {
      recsData= this.props.item.report[section].recs || {};
    } catch(e) {
      recsData = {}
    }
    let checkedData;
    try {
      checkedData= this.props.item.report || {};
    } catch(e) {
      checkedData = {}
    }

    Object.keys(recsData).map( it => {
      console.log(it + ': ' + recsData[it].display);
    })
    //console.log('test item: ' + recs[0]);

    return (
      <div className='row'>
        <div className='col-xs-3'>
          <div className='reportSections orange'>
            {this.renderSections(checkedData)}
          </div>
        </div>
        <div className='col-xs-9'>
          <span><b>{section}</b>
          <input
            name={section}
            type='checkbox'
            onChange={this.handleSectionChange}
            checked={checkedData[section] && checkedData[section].display} />
            show in report </span>

          {recs.map((it, i) => {
            return <div key={i}>
              <input
                name={it}
                type='checkbox'
                onChange={this.handleRecChange}
                checked={recsData[it] && recsData[it].display} />
              {it}
            </div>
          })}
        </div>
      </div>
    );
  }
});

