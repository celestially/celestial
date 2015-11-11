Celestial.ConfigItemWrapper = function (Component, configName) {
  return React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      return {
        item: Prototypes.findOne({name: configName})
      };
    },

    render() {
      if (!this.data.item) {
        return <div>404: Not found</div>;
      }
      return <div>
        <Component configItem={this.data.item} {...this.props} />
      </div>
    }
  })
};
