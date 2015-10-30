//Configs = new Mongo.Collection('configs');

reportConfigEditor = function (Component, section) {
  return React.createClass({

    afterUpdateValue(selKey, selValue) {
      //convert to array
      //const prefix = selKey.split(':')[0]
      const parr = selKey.split('::')
      const prefix = parr[parr.length - 2]
      let converted = selValue.split("\n");
      let result = [];
      converted.map((line, i) => {
        line = replaceAll(line, '\\.', '')
        line = replaceAll(line, '\t', '')
        line = replaceAll(line, '•', '')
        line = line.replace(/^\s+|\s+$/g, '')
        if (line.indexOf("::") > -1) {
          let split = line.split('::')
          result.push([split[0], split[1]])
        }
        else if (line.length > 0) {
          result.push([prefix + '-' + (i + 1), line])
          //result.push(prefix + '-' + (i + 1) + '::' + line)
        }
      })
      //console.log('converted: ' + converted);
      this.setState({converted: result})
      //save converted value
      let obj = {}
      obj['_result.' + selKey] = result
      Configs.update(this.props.item._id, {"$set": obj})
    },

    render() {
      console.log('renderList: ');
      return <ConfigEditor module="config" afterUpdateValue={this.afterUpdateValue} {...this.props} />
    }
  })
};



reportTypeEditor = function () {
  return React.createClass({
    render() {
      console.log('render reportTypeEditor: ');
      return <ReportConfigEditor editConfigMode={true} {...this.props} />
    }
  })
}

//const element = React.createElement(ReportTypeEditor, {
//  editConfigMode: true
//});

const codeGenRoutes = [
  ['path', 'name', 'content', 'label'],
  //['/:id/main', 'main', ConfigEditor],
  //['/:id/topLevel', 'topLevel', TopLevelKeyEditor],
  //['/:id/report', 'report', reportConfigEditor()],
  ['/:id/report', 'report', reportTypeEditor()],
];

function newReport() {
  Meteor.call('newReportConfig', function (error, commentId) {
    if (error) {
      throwError(error.reason);
    }
  });
}

const configModule = {
  name: 'config',
  collection: Configs,
  itemFactory: newReport,
  layout: Layout,
  routes: convertToArrayOfObjects(codeGenRoutes)
};

Meteor.methods({
  newReportConfig: function () {
    _id = Configs.insert({
      name: "New Report Config",
      report: {}
    })
    let obj = {}
    obj['report._id'] = _id
    Configs.update(_id, {"$set": obj})
    return _id;
  }
});


ConfigList = React.createClass({
  //newModule() {
  //  Configs.insert({
  //    _meta: {
  //      class: 'module',
  //      schema: ['name', 'routes_input']
  //    },
  //    name: 'New Module',
  //    routes: ''
  //
  //  });
  //},
  //
  //newReport() {
  //  Meteor.call('newReportConfig', function(error, commentId) {
  //    if (error){
  //      throwError(error.reason);
  //    }
  //  });
  //},

  //<input type='button'
  //       onClick={this.newReport()}
  //       value='Create New Report'/>

  render() {
    console.log('confList: ');
    return <ItemList module={configModule}>
    </ItemList>
  }
})

Reaktor.init(
  <Router>

    {celestial.createRoutes(configModule)}

    <Route path="/config/list"
           layout={Layout}
           content={ConfigList}/>
  </Router>);



