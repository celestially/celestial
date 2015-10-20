
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

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render() {
    //let section = this.state.section;
    //let recs = this.props.sections[section].recs;
    //let recsData;
    //try {
    //  recsData= this.props.item.report[section].recs || {};
    //} catch(e) {
    //  recsData = {}
    //}
    //let checkedData;
    //try {
    //  checkedData= this.props.item.report || {};
    //} catch(e) {
    //  checkedData = {}
    //}
    //
    //Object.keys(recsData).map( it => {
    //  console.log(it + ': ' + recsData[it].display);
    //})
    //console.log('test item: ' + recs[0]);

    return (
      <div className='row'>
        <div className='col-xs-3'>
          <div className='reportSections orange'>
            keys
            <input type='button'
                   onClick={this.newAudit}
                   value='New Key' />

          </div>
        </div>
        <div className='col-xs-9'>
          <span><b>XX</b>
          <input
            name='xx'
            type='checkbox'
            onChange={this.handleSectionChange}
             />
            show in report </span>
          <hr/>

          Input here

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <h2>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>

        </div>
      </div>
    );
  }
});

