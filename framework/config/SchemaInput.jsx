
SchemaInput = React.createClass({

  getInitialState() {
    return {
      section: 'attic',
      modalIsOpen: false}
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

  renderKeys(checkedData) {
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
    return (
        <div>
          <span><b>XX</b>
          <input
            name='xx'
            type='checkbox'
            onChange={this.handleSectionChange}
             />
            show in report </span>
          <hr/>

          Input here

        </div>
    );
  }
});

