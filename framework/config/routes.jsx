//Schemas = new Mongo.Collection('configs');

reportConfigEditor = function (Component, section) {
  return React.createClass({

    afterUpdateValue() {
      //convert to array
      //const prefix = selKey.split(':')[0]
      const prefix = selKey.split(':')[0]
      let converted = this.state.selectedValue.split("\n");
      result = [];
      converted.map((line, i) => {
        line = replaceAll(line, '\\.', '')
        line = replaceAll(line, '\t', '')
        line = replaceAll(line, '•', '')
        line = line.replace(/^\s+|\s+$/g, '')
        if (line.length > 0) {
          result.push([prefix + '-' + (i + 1), line])
        }
      })
      //console.log('converted: ' + converted);
      this.setState({converted: result})
      //save converted value
      let obj = {}
      obj['_result.' + selKey] = result
      Schemas.update(this.props.item._id, {"$set": obj})
    },

    render() {
      console.log('renderList: ');
      return <ConfigEditor module="config" afterUpdateValue={this.afterUpdateValue} {...this.props} />
    }
  })
};

moduleConfigEditor = function (Component, section) {
  return React.createClass({

    afterUpdateValue() {
      console.log('afterUpdateValue: ');
      const routes = this.props.item['routes']
      template = `moduleRoutes = ${routes}`
      Schemas.update(this.props.item._id,
        {"$set": {_generated: template}})
    },

    render() {
      console.log('render moduleConfigEditor: ');
      return <ConfigEditor module="config" afterUpdateValue={this.afterUpdateValue} {...this.props} />
    }
  })
};


const codeGenRoutes = [
  ['path', 'name', 'content', 'label'],
  ['/:id/main', 'main', ConfigEditor],
  ['/:id/module', 'module', moduleConfigEditor()],
  ['/:id/report', 'report', reportConfigEditor()],
];

const configModule = {
  name: 'config',
  collection: Schemas,
  layout: Layout,
  routes: convertToArrayOfObjects(codeGenRoutes)
};

Reaktor.init(
  <Router>

    {celestial.createRoutes(configModule)}

    <Route path="/config/list"
           layout={Layout}
           content={ConfigList} />
  </Router>);