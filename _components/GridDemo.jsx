GridDemo = React.createClass({
  render() {
    return (
      <div className="container orange">
        <div>
          <div className="row">
            <div className="col-xs-6">
              <div className="box yellow">auto</div>
              <div className="box yellow">bicicle</div>
              <div className="box yellow">foo</div>
            </div>
            <div className="col-xs-6">
              <div className="box yellow">auto</div>
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-xs-8">
              <div className="box yellow">auto</div>
            </div>
          </div>
        </div>

        <ul>
          <li><Checkbox /><a href="#">Zurich</a></li>
          <li><Checkbox /><a href="#">Geneva</a></li>
          <li><Checkbox /><a href="#">Winterthur</a></li>
          <li><a href="#">Lausanne</a></li>
          <li><a href="#">Lucerne</a></li>
        </ul>

      </div>

    );
  }
});

