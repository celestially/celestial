TopLevelKeyEditor = React.createClass({

  afterUpdateValue() {
    console.log('afterUpdateValue: ');
    const routes = this.props.item['routes']
    template = `moduleRoutes = ${routes}`
    Configs.update(this.props.item._id,
      {"$set": {_generated: template}})
  },

  render() {
    console.log('render moduleConfigEditor: ');
    return <ConfigEditor editConfigMode={true} module="config"
                         afterUpdateValue={this.afterUpdateValue} {...this.props} />
  }
});
