withSchema = function (Component, section) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      //console.log('id: ' + this.props.params.id)
      return {
        item: Schemas.findOne({_id: this.props.params.id})
        //item: Schemas.findOne()
      };
    },

    render() {
      if (!this.data.item) {
        return <div>404: Not found</div>;
      }
      return <div>
        <Component item={this.data.item} collection={Schemas} {...this.props} />
      </div>
    }
  })
};

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

const objs = convertToArrayOfObjects(codeGenRoutes);

const routes = objs.map(route => {
  console.log('config route: ' + JSON.stringify(route));
  //console.log('route.c: ' + route.content);
  //console.log('route.n: ' + route.name);
  return <Route path={'/config' + route.path}
                layout={SchemaLayout}
                content={withSchema(route.content,route.name)}
  />
})

Reaktor.init(
  <Router>
    {routes}
    <Route path="/config" layout={SchemaLayout} content={ConfigList}/>
    <Route path="/config/xx" layout={SchemaLayout} content={withSchema(ConfigEditor)}/>
  </Router>);

