JSONViewWrapper = function (Component) {
  return React.createClass({

    render() {
      return (
      <div className="row">
        <div className="col-xs-6"><Component {...this.props} /></div>
        <div className="col-xs-6"><pre>{JSON.stringify(this.props.item, null, 4)}</pre></div>
      </div>
      );
    }
  })
};

