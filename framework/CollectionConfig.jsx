MetaColl = new Mongo.Collection('metaColl');

CollectionConfig = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      item: MetaColl.findOne()
    };
  },

  handleChange(e) {
    console.log('change: ' + e.target.name + ", " + e.target.value);
    var obj = {}
    obj[this.props.section + "." + e.target.name] = e.target.value
    Audits.update(this.data.item._id, {"$set" : obj})
  },

  addClass() {
    this.data.item.dataClasses.push({ name: 'new class'})
    console.log('dc: ' + JSON.stringify(this.data.item.dataClasses))
    MetaColl.update(this.data.item._id, {"$set" : {dataClasses: this.data.item.dataClasses}})
  },

  render() {
    if (! this.data.item) { return <div>404: Not found</div>; }

    this.data.item.dataClasses = this.data.item.dataClasses || [];
    dc = this.data.item.dataClasses

    var sects = dc.map( i => {
      return <div>
        class: <textarea value={i.name}/>
      </div>
    })


    return <div>
      Coll: {this.data.item.name}

      {sects}

      <button onClick={this.addClass}> new section </button>

      <AceEditor
        mode="java"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        />

    </div>;
  }
})